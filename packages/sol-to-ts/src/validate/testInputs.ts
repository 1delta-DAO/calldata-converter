import { getAddress, isAddress, type Hex } from 'viem'
import { getRandomValues } from 'node:crypto'
import type { FunctionIr, ParamIr, ProjectIr } from '../types.ts'
import type { TestInputs } from './types.ts'

/**
 * Generate a `(solidityValue, typescriptValue)` pair for every parameter of
 * every `FunctionIr` so the forge script and the vitest test agree on inputs.
 *
 * This is a straight port of the original `testInputGenerator.ts` with one
 * important change: instead of consulting a `SolidityEnum[]` list, it uses
 * the project IR so enums, library-enums, and plain enums are all recognized
 * uniformly. Array handling, scalar randomization, and preamble semantics
 * match the old behavior exactly to preserve forge compatibility.
 */
const DYNAMIC_ARRAY_LENGTH = 2

export function generateTestInputs(fn: FunctionIr, ir: ProjectIr): TestInputs {
  const solidity: string[] = []
  const typescript: string[] = []
  const preambleLines: string[] = []
  fn.params.forEach((p, i) => {
    const varName = `_a_${fn.name}_${i}`
    const type = paramTypeForTesting(p)
    const { solValue, tsValue } = generateValuePairFull(type, ir, varName, preambleLines)
    solidity.push(solValue)
    typescript.push(tsValue)
  })
  return {
    functionName: fn.name,
    solidityValues: solidity,
    typescriptValues: typescript,
    solidityPreamble:
      preambleLines.length > 0 ? preambleLines.join('\n        ') : undefined,
  }
}

function paramTypeForTesting(p: ParamIr): string {
  // Reconstruct with memory for bytes/arrays so the preamble declarations are
  // valid Solidity even though our canonical IR stripped storage locations.
  let t = p.type
  if (t === 'bytes' || t.endsWith('[]') || /\[\d+\]$/.test(t)) {
    // Memory is implicit for generateValuePair's internal preamble emission,
    // which re-adds the `memory` keyword where needed.
  }
  return t
}

function parseOutermostDimension(
  type: string,
): { elementType: string; outerDim: number | null } | null {
  if (type.endsWith('[]')) return { elementType: type.slice(0, -2), outerDim: null }
  const m = type.match(/\[(\d+)\]$/)
  if (m) {
    return { elementType: type.slice(0, -m[0].length), outerDim: parseInt(m[1]!, 10) }
  }
  return null
}

function generateValuePairFull(
  type: string,
  ir: ProjectIr,
  varName: string,
  preambleLines: string[],
): { solValue: string; tsValue: string } {
  const clean = type.replace(/ memory| calldata| storage/g, '').trim()
  const outer = parseOutermostDimension(clean)
  if (!outer) return generateScalarValuePair(clean, ir)

  const count = outer.outerDim ?? DYNAMIC_ARRAY_LENGTH
  const elementSolValues: string[] = []
  const elementTsValues: string[] = []
  for (let i = 0; i < count; i++) {
    const { solValue, tsValue } = generateValuePairFull(
      outer.elementType,
      ir,
      `${varName}_${i}`,
      preambleLines,
    )
    elementSolValues.push(solValue)
    elementTsValues.push(tsValue)
  }
  if (outer.outerDim !== null) {
    preambleLines.push(`${outer.elementType}[${outer.outerDim}] memory ${varName};`)
  } else {
    preambleLines.push(
      `${outer.elementType}[] memory ${varName} = new ${outer.elementType}[](${count});`,
    )
  }
  for (let i = 0; i < count; i++) {
    preambleLines.push(`${varName}[${i}] = ${elementSolValues[i]!};`)
  }
  return { solValue: varName, tsValue: `[${elementTsValues.join(', ')}]` }
}

function generateScalarValuePair(
  type: string,
  ir: ProjectIr,
): { solValue: string; tsValue: string } {
  const clean = type.replace(/ memory| calldata| storage/g, '').trim()

  const enumIr = ir.enums[clean]
  if (enumIr) {
    return {
      solValue: `${enumIr.name}.${enumIr.members[0]}`,
      tsValue: '0',
    }
  }
  // Library-as-enums are referenced by `Lib.MEMBER`, not `Lib.name`. Tests
  // don't need a specific value—any first constant works.
  const libEnum = ir.libraryEnums[clean]
  if (libEnum && libEnum.members.length > 0) {
    return {
      solValue: `${libEnum.name}.${libEnum.members[0]!.name}`,
      tsValue: '0',
    }
  }

  if (clean === 'bool') {
    const v = Math.random() < 0.5
    return { solValue: v ? 'true' : 'false', tsValue: v ? 'true' : 'false' }
  }

  if (clean === 'bytes') {
    let length = Math.floor(Math.random() * 35) + 40
    if (length % 2 === 0) length++
    const randomVal = generateRandomBytes(length)
    return { solValue: `hex"${randomVal.slice(2)}"`, tsValue: `"${randomVal}"` }
  }
  const bytesN = /^bytes(\d+)$/.exec(clean)
  if (bytesN) {
    const n = parseInt(bytesN[1]!, 10)
    if (n >= 1 && n <= 32) {
      const randomVal = generateRandomBytes(n)
      return { solValue: randomVal, tsValue: `"${randomVal}"` }
    }
  }

  const uMatch = /^uint(\d+)?$/.exec(clean)
  if (uMatch) {
    const bits = uMatch[1] ? parseInt(uMatch[1], 10) : 256
    const num = Math.min(1e20, Math.pow(2, Math.min(bits, 53)) - 1)
    return { solValue: num.toString(), tsValue: `${num}${bits <= 32 ? '' : 'n'}` }
  }

  const iMatch = /^int(\d+)?$/.exec(clean)
  if (iMatch) {
    const bits = iMatch[1] ? parseInt(iMatch[1], 10) : 256
    if (bits <= 32) {
      const maxAbs = Math.min(1e9, Math.pow(2, Math.min(bits - 1, 30)) - 1)
      const num = Math.max(1, Math.floor(maxAbs / 3))
      const signed = Math.random() < 0.5 ? num : -num
      return { solValue: signed.toString(), tsValue: `${signed}` }
    }
    const maxAbs = (1n << BigInt(Math.min(bits - 1, 62))) - 1n
    const num = (maxAbs / 3n) * (Math.random() < 0.5 ? 1n : -1n)
    return { solValue: num.toString(), tsValue: `${num.toString()}n` }
  }

  if (clean === 'address' || clean === 'address payable') {
    const addr = generateRandomAddress()
    return { solValue: addr, tsValue: `"${addr}" as Address` }
  }

  throw new Error(`Unsupported type for test generation: ${type}`)
}

function generateRandomBytes(len: number): Hex {
  const bytes = new Uint8Array(len)
  getRandomValues(bytes)
  return ('0x' +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')) as Hex
}

function generateRandomAddress(): string {
  while (true) {
    const addr = getAddress(generateRandomBytes(20))
    if (isAddress(addr, { strict: false })) return addr
  }
}
