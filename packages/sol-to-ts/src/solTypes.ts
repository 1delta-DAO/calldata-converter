import type {
  ArrayTypeName,
  ElementaryTypeName,
  TypeName,
  UserDefinedTypeName,
} from '@solidity-parser/parser/dist/src/ast-types'

/**
 * Render a Solidity `TypeName` as its canonical string form (no `memory`
 * / `calldata`). Used as the key for type inference + TS mapping.
 */
export function solTypeFromAst(t: TypeName): string {
  switch (t.type) {
    case 'ElementaryTypeName': {
      const e = t as ElementaryTypeName
      if (e.name === 'uint') return 'uint256'
      if (e.name === 'int') return 'int256'
      return e.name
    }
    case 'UserDefinedTypeName':
      return (t as UserDefinedTypeName).namePath
    case 'ArrayTypeName': {
      const a = t as ArrayTypeName
      const base = solTypeFromAst(a.baseTypeName)
      if (a.length && a.length.type === 'NumberLiteral') {
        return `${base}[${(a.length as any).number}]`
      }
      return `${base}[]`
    }
    case 'Mapping':
      return 'mapping'
    case 'FunctionTypeName':
      return 'function'
  }
}

/** Returns `uintN` → N (number) or null if not a uint. */
export function uintSize(solType: string): number | null {
  const m = /^uint(\d+)$/.exec(solType)
  if (!m) return null
  return Number(m[1])
}

export function intSize(solType: string): number | null {
  const m = /^int(\d+)$/.exec(solType)
  if (!m) return null
  return Number(m[1])
}

/** Returns the byte size of `bytesN` or null. */
export function bytesNSize(solType: string): number | null {
  const m = /^bytes(\d+)$/.exec(solType)
  if (!m) return null
  return Number(m[1])
}

export function isArrayType(solType: string): boolean {
  return /\[.*\]$/.test(solType)
}

export function arrayElementType(solType: string): string {
  return solType.replace(/\[.*\]$/, '')
}

/** True when the type encodes to a runtime `Hex` string on the TS side. */
export function isHexType(solType: string): boolean {
  if (solType === 'bytes' || solType === 'string') return true
  if (bytesNSize(solType) != null) return true
  return false
}
