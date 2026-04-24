import type {
  BinaryOperation,
  Conditional,
  Expression,
  FunctionCall,
  Identifier,
  MemberAccess,
  NumberLiteral,
  UnaryOperation,
} from '@solidity-parser/parser/dist/src/ast-types'
import { intSize, isHexType, uintSize } from '../solTypes.ts'
import { Scope } from './scope.ts'
import { inferSolType } from './typeInfer.ts'

export type TsKind = 'bigint' | 'number' | 'hex' | 'bool' | 'other'

/**
 * Classify an expression by the runtime TypeScript value kind it produces.
 * This is emit-time information used to decide literal suffixing (`0` vs
 * `0n`) in arithmetic/comparisons, and it deliberately differs from the
 * Solidity type in two places:
 *
 *   1. Library-as-enum / plain-enum member access is JS `number` (TS enum
 *      backing), even though its declared Solidity type is `uint256`.
 *   2. `.length` on a hex-typed value is lowered to `(x.length/2 - 1)` which
 *      is a JS `number`, even though `bytes.length` is `uint256` in Solidity.
 */
export function inferTsKind(expr: Expression, scope: Scope): TsKind {
  switch (expr.type) {
    case 'BooleanLiteral':
      return 'bool'
    case 'StringLiteral':
    case 'HexLiteral':
      return 'hex'
    case 'NumberLiteral':
      return 'other'
    case 'Identifier': {
      const id = expr as Identifier
      if (scope.ir.enums[id.name] || scope.ir.libraryEnums[id.name] || scope.ir.structs[id.name]) {
        return 'other'
      }
      const solType = scope.lookup(id.name)
      if (!solType) return 'other'
      return solKindToTs(solType)
    }
    case 'MemberAccess': {
      const ma = expr as MemberAccess
      if (ma.expression.type === 'Identifier') {
        const libName = (ma.expression as Identifier).name
        if (scope.ir.libraryEnums[libName] || scope.ir.enums[libName]) {
          return 'number' // TS enums back as JS numbers
        }
      }
      if (ma.memberName === 'length') {
        // Either array length (number) or hex length lowered to number.
        return 'number'
      }
      // type(uintN).max/.min is emitted as a bigint expression.
      if (
        ma.expression.type === 'FunctionCall' &&
        (ma.expression as FunctionCall).expression.type === 'Identifier' &&
        ((ma.expression as FunctionCall).expression as Identifier).name === 'type'
      ) {
        if (ma.memberName === 'max' || ma.memberName === 'min') return 'bigint'
      }
      const solType = inferSolType(expr, scope)
      return solKindToTs(solType)
    }
    case 'FunctionCall': {
      const fc = expr as FunctionCall
      if (fc.expression.type === 'MemberAccess') {
        const ma = fc.expression as MemberAccess
        if (
          ma.expression.type === 'Identifier' &&
          (ma.expression as Identifier).name === 'abi' &&
          ma.memberName === 'encodePacked'
        ) {
          return 'hex'
        }
        // library.fn / project helper call; fall through to identifier path below
        const f = scope.ir.functions[ma.memberName]
        if (f && f.returnType) return solKindToTs(f.returnType)
      }
      if (fc.expression.type === 'ElementaryTypeName') {
        return elementaryNameToKind((fc.expression as any).name)
      }
      if (fc.expression.type === 'Identifier') {
        const name = (fc.expression as Identifier).name
        const elementary = elementaryNameToKind(name)
        if (elementary !== 'other') return elementary
        if (name === 'newbytes') return 'hex'
        const f = scope.ir.functions[name]
        if (f && f.returnType) return solKindToTs(f.returnType)
        return 'other'
      }
      return 'other'
    }
    case 'BinaryOperation': {
      const bo = expr as BinaryOperation
      const op = bo.operator
      if (['==', '!=', '<', '>', '<=', '>=', '&&', '||'].includes(op)) return 'bool'
      const l = inferTsKind(bo.left, scope)
      const r = inferTsKind(bo.right, scope)
      return mergeKinds(l, r)
    }
    case 'UnaryOperation': {
      const uo = expr as UnaryOperation
      if (uo.operator === '!') return 'bool'
      return inferTsKind(uo.subExpression, scope)
    }
    case 'Conditional': {
      const c = expr as Conditional
      const t = inferTsKind(c.trueExpression, scope)
      if (t !== 'other') return t
      return inferTsKind(c.falseExpression, scope)
    }
    case 'IndexAccess':
      return 'other'
    case 'TupleExpression': {
      const te = expr as any
      if (te.components.length === 1 && te.components[0]) {
        return inferTsKind(te.components[0], scope)
      }
      return 'other'
    }
    default:
      return 'other'
  }
}

function elementaryNameToKind(name: string): TsKind {
  if (name === 'address' || name === 'address payable') return 'other'
  if (name === 'bool') return 'bool'
  if (name === 'string') return 'other'
  if (/^bytes\d*$/.test(name)) return 'hex'
  const u = /^uint(\d+)?$/.exec(name)
  if (u) {
    const bits = u[1] ? Number(u[1]) : 256
    return bits > 32 ? 'bigint' : 'number'
  }
  const i = /^int(\d+)?$/.exec(name)
  if (i) {
    const bits = i[1] ? Number(i[1]) : 256
    return bits > 32 ? 'bigint' : 'number'
  }
  return 'other'
}

function solKindToTs(solType: string): TsKind {
  if (!solType) return 'other'
  if (isHexType(solType)) return 'hex'
  if (solType === 'bool') return 'bool'
  const u = uintSize(solType)
  if (u != null) return u > 32 ? 'bigint' : 'number'
  const i = intSize(solType)
  if (i != null) return i > 32 ? 'bigint' : 'number'
  return 'other'
}

function mergeKinds(a: TsKind, b: TsKind): TsKind {
  if (a === b) return a
  if (a === 'other') return b
  if (b === 'other') return a
  // Numeric precedence: bigint wins if either side is bigint (it's not safe to downcast).
  if (a === 'bigint' || b === 'bigint') {
    // Unless the other side is explicitly number (e.g. hex-length), prefer bigint.
    if (a === 'number' || b === 'number') return 'number'
    return 'bigint'
  }
  return a
}
