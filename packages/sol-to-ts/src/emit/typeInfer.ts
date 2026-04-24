import type {
  BinaryOperation,
  Conditional,
  Expression,
  FunctionCall,
  Identifier,
  IndexAccess,
  MemberAccess,
  NumberLiteral,
  TupleExpression,
  UnaryOperation,
} from '@solidity-parser/parser/dist/src/ast-types'
import type { ProjectIr } from '../types.ts'
import { arrayElementType, isArrayType, isHexType, uintSize } from '../solTypes.ts'
import { Scope } from './scope.ts'

/** Match elementary Solidity type cast identifiers (uint8/int128/bytes32/…). */
const ELEMENTARY_CAST_RE =
  /^(u?int(?:\d+)?|bytes\d*|address|bool|string)$/

function isElementaryCastName(name: string): boolean {
  return ELEMENTARY_CAST_RE.test(name)
}

/** Best-effort type inference for an expression. Returns '' if unknown. */
export function inferSolType(expr: Expression, scope: Scope): string {
  const ir = scope.ir
  switch (expr.type) {
    case 'BooleanLiteral':
      return 'bool'
    case 'NumberLiteral':
      return inferNumberLiteralType(expr as NumberLiteral)
    case 'HexLiteral':
      return 'bytes'
    case 'StringLiteral':
      return 'string'
    case 'Identifier': {
      const id = expr as Identifier
      if (id.name === 'this') return 'address'
      const t = scope.lookup(id.name)
      if (t) return t
      if (ir.libraryEnums[id.name] || ir.enums[id.name]) return id.name
      if (ir.structs[id.name]) return id.name
      return ''
    }
    case 'MemberAccess': {
      const ma = expr as MemberAccess
      // library-constant: ComposerCommands.LENDING
      if (ma.expression.type === 'Identifier') {
        const libName = (ma.expression as Identifier).name
        const lib = ir.libraryEnums[libName]
        if (lib) {
          // Library-as-enum members have the declared solidity type `uint256`
          // (they are typed at the Solidity level as `uint256 internal constant`).
          return 'uint256'
        }
        if (ir.enums[libName]) {
          // Plain enum member: typed as the enum in Solidity.
          return libName
        }
        // type(uintN).max / .min
        if (libName === 'type') return 'uint256'
      }
      // .length on bytes / arrays: always uint256
      if (ma.memberName === 'length') return 'uint256'
      // type(X).max / .min via MemberAccess
      if (
        ma.expression.type === 'FunctionCall' &&
        (ma.expression as FunctionCall).expression.type === 'Identifier' &&
        ((ma.expression as FunctionCall).expression as Identifier).name === 'type'
      ) {
        const inner = (ma.expression as FunctionCall).arguments[0]
        if (inner && inner.type === 'ElementaryTypeName') {
          return (inner as any).name
        }
      }
      return ''
    }
    case 'FunctionCall': {
      const fc = expr as FunctionCall
      // Type-cast call (uint8(x), bytes32(0), address(0), ...)
      if (fc.expression.type === 'ElementaryTypeName') {
        return (fc.expression as any).name === 'uint'
          ? 'uint256'
          : (fc.expression as any).name === 'int'
          ? 'int256'
          : (fc.expression as any).name
      }
      if (fc.expression.type === 'Identifier') {
        const name = (fc.expression as Identifier).name
        if (isElementaryCastName(name)) {
          if (name === 'uint') return 'uint256'
          if (name === 'int') return 'int256'
          return name
        }
        // Known project function
        const f = ir.functions[name]
        if (f && f.returnType) return f.returnType
        if (name === 'type') {
          // `type(X)` itself is not a value - the member access handles it.
          return ''
        }
        return ''
      }
      // abi.encodePacked(...) -> bytes
      if (fc.expression.type === 'MemberAccess') {
        const ma = fc.expression as MemberAccess
        if (
          ma.expression.type === 'Identifier' &&
          (ma.expression as Identifier).name === 'abi'
        ) {
          return 'bytes'
        }
        // library.fn(...) - look up function on library if we have it
        if (ma.expression.type === 'Identifier') {
          const f = ir.functions[ma.memberName]
          if (f && f.returnType) return f.returnType
        }
      }
      return ''
    }
    case 'NewExpression': {
      const ne = expr as any
      return ne.typeName ? inferElementaryName(ne.typeName) : ''
    }
    case 'BinaryOperation': {
      const bo = expr as BinaryOperation
      const op = bo.operator
      if (
        op === '==' || op === '!=' || op === '<' || op === '>' ||
        op === '<=' || op === '>=' || op === '&&' || op === '||'
      ) {
        return 'bool'
      }
      const l = inferSolType(bo.left, scope)
      const r = inferSolType(bo.right, scope)
      // Pick the wider of the two; otherwise take whichever is non-empty.
      return pickWider(l, r)
    }
    case 'UnaryOperation': {
      const uo = expr as UnaryOperation
      if (uo.operator === '!') return 'bool'
      const inner = inferSolType(uo.subExpression, scope)
      if (uo.operator === '-') {
        const u = uintSize(inner)
        if (u != null) return `int${u}`
      }
      return inner
    }
    case 'Conditional': {
      const c = expr as Conditional
      const t = inferSolType(c.trueExpression, scope)
      if (t) return t
      return inferSolType(c.falseExpression, scope)
    }
    case 'IndexAccess': {
      const ia = expr as IndexAccess
      const base = inferSolType(ia.base, scope)
      if (isArrayType(base)) return arrayElementType(base)
      if (base === 'bytes' || base === 'string') return 'bytes1'
      return ''
    }
    case 'TupleExpression': {
      const te = expr as TupleExpression
      const first = te.components[0] as Expression | null
      if (te.components.length === 1 && first) return inferSolType(first, scope)
      return ''
    }
    default:
      return ''
  }
}

function inferElementaryName(tn: any): string {
  if (tn.type === 'ElementaryTypeName') {
    return tn.name === 'uint' ? 'uint256' : tn.name === 'int' ? 'int256' : tn.name
  }
  if (tn.type === 'UserDefinedTypeName') return tn.namePath
  if (tn.type === 'ArrayTypeName') {
    const base = inferElementaryName(tn.baseTypeName)
    return `${base}[]`
  }
  return ''
}

function inferNumberLiteralType(n: NumberLiteral): string {
  // Default for bare integer literal in Solidity is `uint256` (or `int256` if signed via unary -).
  // We don't try to narrow; encodePacked tags a literal as uint256 unless explicitly cast.
  return 'uint256'
}

function pickWider(a: string, b: string): string {
  if (!a) return b
  if (!b) return a
  const au = uintSize(a), bu = uintSize(b)
  if (au != null && bu != null) return au >= bu ? a : b
  return a
}

export { isElementaryCastName, isHexType }
