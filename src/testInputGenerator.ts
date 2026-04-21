import { getAddress, isAddress, type Hex } from 'viem'
import type { FunctionDef, SolidityEnum, TestInputs } from './types'
import { getRandomValues } from 'crypto'
import path from 'path'
import { promises as fs } from 'fs'
import { CALLDATA_LIB_PATH, OUTPUT_DIR, TEST_INPUTS_FILE } from './consts'

const DYNAMIC_ARRAY_LENGTH = 2

/**
 * Strips the outermost array dimension from a Solidity type string.
 * Returns null if the type is not an array.
 *
 * In Solidity, the rightmost bracket is the outermost dimension:
 *   address[3][]  →  outerDim=null (dynamic), elementType='address[3]'
 *   address[]     →  outerDim=null (dynamic), elementType='address'
 *   address[3]    →  outerDim=3   (fixed),   elementType='address'
 */
function parseOutermostDimension(
  type: string,
): { elementType: string; outerDim: number | null } | null {
  if (type.endsWith('[]')) {
    return { elementType: type.slice(0, -2), outerDim: null }
  }
  const fixedMatch = type.match(/\[(\d+)\]$/)
  if (fixedMatch) {
    return {
      elementType: type.slice(0, -fixedMatch[0].length),
      outerDim: parseInt(fixedMatch[1]!),
    }
  }
  return null
}

/**
 * Recursively generates a Solidity/TypeScript value pair for any type including arrays.
 * For array types, Solidity local variable declarations are pushed into preambleLines
 * and the returned solValue is the variable name (not an inline literal).
 */
function generateValuePairFull(
  type: string,
  enums: SolidityEnum[],
  varName: string,
  preambleLines: string[],
): { solValue: string; tsValue: string } {
  const cleanType = type.replace(/ memory| calldata| storage/g, '').trim()
  const outerParsed = parseOutermostDimension(cleanType)

  if (!outerParsed) {
    return generateScalarValuePair(cleanType, enums)
  }

  const { elementType, outerDim } = outerParsed
  const count = outerDim ?? DYNAMIC_ARRAY_LENGTH

  const elementSolValues: string[] = []
  const elementTsValues: string[] = []

  for (let i = 0; i < count; i++) {
    const elemVarName = `${varName}_${i}`
    const { solValue, tsValue } = generateValuePairFull(
      elementType,
      enums,
      elemVarName,
      preambleLines,
    )
    elementSolValues.push(solValue)
    elementTsValues.push(tsValue)
  }

  // Emit the declaration for this array level after its elements (correct dependency order)
  if (outerDim !== null) {
    preambleLines.push(`${elementType}[${outerDim}] memory ${varName};`)
  } else {
    preambleLines.push(
      `${elementType}[] memory ${varName} = new ${elementType}[](${count});`,
    )
  }
  for (let i = 0; i < count; i++) {
    preambleLines.push(`${varName}[${i}] = ${elementSolValues[i]!};`)
  }

  return { solValue: varName, tsValue: `[${elementTsValues.join(', ')}]` }
}

/**
 * Generates a value pair for scalar (non-array) Solidity types.
 */
function generateScalarValuePair(
  type: string,
  enums: SolidityEnum[],
): { solValue: string; tsValue: string } {
  const cleanType = type.replace(/ memory| calldata| storage/g, '').trim()

  if (enums) {
    const isEnum = enums.find((e) => e.name === cleanType)
    if (isEnum) {
      const enumValue = isEnum.values[0]!
      return {
        solValue: `${isEnum.name}.${enumValue.name}`,
        tsValue: '0',
      }
    }
  }

  if (cleanType.startsWith('bytes')) {
    if (cleanType === 'bytes') {
      let length = Math.floor(Math.random() * 35) + 40
      if (length % 2 == 0) length++
      const randomVal = generateRandomBytes(length)
      return {
        solValue: `hex"${randomVal.slice(2)}"`,
        tsValue: `"${randomVal}"`,
      }
    } else {
      const byteLength = parseInt(cleanType.replace('bytes', ''))
      if (byteLength >= 1 && byteLength <= 32) {
        const randomVal = generateRandomBytes(byteLength)
        return {
          solValue: `${randomVal}`,
          tsValue: `"${randomVal}"`,
        }
      }
    }
  }

  if (cleanType === 'bool') {
    const randomBool = Math.random() < 0.5
    return {
      solValue: randomBool ? 'true' : 'false',
      tsValue: randomBool ? 'true' : 'false',
    }
  }

  if (cleanType.startsWith('uint')) {
    const bits = parseInt(cleanType.replace('uint', '')) || 256
    const num = Math.min(1e20, Math.pow(2, Math.min(bits, 53)) - 1)
    return {
      solValue: num.toString(),
      tsValue: `${num}${bits <= 32 ? '' : 'n'}`,
    }
  }

  if (cleanType === 'address') {
    const address = generateRandomAddress()
    return {
      solValue: `${address}`,
      tsValue: `"${address}" as Address`,
    }
  }

  throw new Error(`Unsupported type: ${type}`)
}

/**
 * Generates test inputs for a given function definition.
 */
export function generateTestInputs(
  func: FunctionDef,
  enums: SolidityEnum[],
): TestInputs {
  const solidity: string[] = []
  const typescript: string[] = []
  const preambleLines: string[] = []

  func.params.forEach((param, paramIndex) => {
    const normalizedType = param.type.replace(/\/\/\s*/, '').trim()
    const varName = `_a_${func.name}_${paramIndex}`
    const { solValue, tsValue } = generateValuePairFull(
      normalizedType,
      enums,
      varName,
      preambleLines,
    )
    solidity.push(solValue)
    typescript.push(tsValue)
  })

  return {
    functionName: func.name,
    solidityValues: solidity,
    typescriptValues: typescript,
    solidityPreamble:
      preambleLines.length > 0 ? preambleLines.join('\n        ') : undefined,
  }
}

function generateTest(
  func: FunctionDef,
  expectedOutputs: {
    name: string
    hex: string
  }[],
  enums: SolidityEnum[],
  params: string[],
): string {
  const eo = expectedOutputs.find((o) => o.name === func.name)?.hex

  return `
  test('${func.name} should match Solidity output', () => {

      const result = CalldataLib.${func.name}(
        ${params.join(',\n        ')}
      );
      expect(result).toBe("${eo}");
  });`
}

export async function generateTestSuite(
  functions: FunctionDef[],
  expectedOutputs: {
    name: string
    hex: string
  }[],
  enums: SolidityEnum[],
) {
  const imports = `
import { describe, expect, test } from 'vitest';
import * as CalldataLib from "./${path.basename(CALLDATA_LIB_PATH).replace('.sol', '_pure.ts')}";
import type { Address, Hex } from 'viem';
`
  const testInputs = await fs.readFile(
    path.join(OUTPUT_DIR, TEST_INPUTS_FILE),
    'utf8',
  )
  const testInputsJson: TestInputs[] = JSON.parse(testInputs)

  const tests = functions
    .map((func) =>
      generateTest(
        func,
        expectedOutputs,
        enums,
        testInputsJson.find((t) => t.functionName === func.name)!
          .typescriptValues,
      ),
    )
    .join('\n')

  return `${imports}

describe('CalldataLib', () => {
${tests}
});
`
}

function generateRandomBytes(length: number): Hex {
  const bytes = new Uint8Array(length)
  getRandomValues(bytes)

  return ('0x' +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')) as Hex
}

function generateRandomAddress() {
  while (true) {
    const address = getAddress(generateRandomBytes(20))
    if (isAddress(address, { strict: false })) {
      return address
    }
  }
}
