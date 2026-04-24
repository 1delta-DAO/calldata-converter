import {
  arrayElementType,
  bytesNSize,
  intSize,
  isArrayType,
  isHexType,
  uintSize,
} from './solTypes.ts'
import type { ProjectIr } from './types.ts'

/**
 * Map a Solidity type string (as produced by `solTypeFromAst`) to a TypeScript
 * type string. The mapping is config-driven via `typeOverrides` but the
 * defaults cover every type CalldataLib uses.
 */
export function solTypeToTs(
  solType: string,
  ir: ProjectIr,
  overrides: Record<string, string> = {},
): string {
  if (overrides[solType]) return overrides[solType]!

  if (solType === 'bool') return 'boolean'
  if (solType === 'address' || solType === 'address payable') return 'Address'
  if (solType === 'string') return 'string'
  if (solType === 'bytes') return 'Hex'
  if (bytesNSize(solType) != null) return 'Hex'

  const u = uintSize(solType)
  if (u != null) {
    // TS `number` is safe up to uint32; use `bigint` above.
    return u <= 32 ? 'number' : 'bigint'
  }
  const i = intSize(solType)
  if (i != null) {
    return i <= 32 ? 'number' : 'bigint'
  }

  if (isArrayType(solType)) {
    const element = arrayElementType(solType)
    return `${solTypeToTs(element, ir, overrides)}[]`
  }

  // User-defined: enum -> its name, struct -> struct name, library-enum -> its name
  if (ir.enums[solType]) return solType
  if (ir.libraryEnums[solType]) return solType
  if (ir.structs[solType]) return solType

  // Unknown / custom type - fall back to string literal.
  return solType
}

/** True when a TS param of type `t` accepts a `bigint`-typed value. */
export function tsIsBigint(tsType: string): boolean {
  return tsType === 'bigint'
}

/** True when the solidity type produces a runtime Hex string in TS. */
export function isHexSolType(t: string): boolean {
  return isHexType(t)
}
