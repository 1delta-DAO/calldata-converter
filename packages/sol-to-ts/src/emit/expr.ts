import type {
  BinaryOperation,
  Conditional,
  Expression,
  FunctionCall,
  HexLiteral,
  Identifier,
  IndexAccess,
  MemberAccess,
  NewExpression,
  NumberLiteral,
  StringLiteral,
  TupleExpression,
  UnaryOperation,
} from '@solidity-parser/parser/dist/src/ast-types'
import type { EmitCtx } from '../types.ts'
import { intSize, isHexType, uintSize } from '../solTypes.ts'
import { Scope } from './scope.ts'
import { inferSolType } from './typeInfer.ts'
import { inferTsKind } from './tsKind.ts'
import type { TsKind } from './tsKind.ts'

export interface EmitExprCtx extends EmitCtx {
  scope: Scope
}

export interface TypeHint {
  /** If true, NumberLiteral leaves emit with the `n` bigint suffix. */
  bigint?: boolean
  /** Solidity type expected by the caller; used for disambiguation. */
  expect?: string
}

/**
 * Emit a Solidity expression as a TypeScript expression string.
 *
 * The emitter propagates a single bit of context (`bigint`) downward so number
 * literals suffix with `n` inside bigint arithmetic and stay as plain numbers
 * inside JS-number arithmetic (e.g. TS-enum members, `.length`-derived values).
 */
export function emitExpression(
  expr: Expression,
  ctx: EmitExprCtx,
  hint: TypeHint = {},
): string {
  switch (expr.type) {
    case 'BooleanLiteral':
      return (expr as any).value ? 'true' : 'false'
    case 'NumberLiteral':
      return emitNumberLiteral(expr as NumberLiteral, hint)
    case 'HexLiteral':
      return emitHexLiteral(expr as HexLiteral)
    case 'StringLiteral':
      return JSON.stringify((expr as StringLiteral).value)
    case 'Identifier':
      return emitIdentifier(expr as Identifier)
    case 'MemberAccess':
      return emitMemberAccess(expr as MemberAccess, ctx)
    case 'FunctionCall':
      return emitFunctionCall(expr as FunctionCall, ctx)
    case 'NewExpression':
      return emitNewExpression(expr as NewExpression, ctx)
    case 'BinaryOperation':
      return emitBinary(expr as BinaryOperation, ctx, hint)
    case 'UnaryOperation':
      return emitUnary(expr as UnaryOperation, ctx, hint)
    case 'Conditional':
      return emitConditional(expr as Conditional, ctx, hint)
    case 'IndexAccess':
      return emitIndex(expr as IndexAccess, ctx)
    case 'TupleExpression':
      return emitTuple(expr as TupleExpression, ctx, hint)
    default:
      ctx.warnings.push(`Unhandled expression type: ${(expr as any).type}`)
      return `/* ${(expr as any).type} */`
  }
}

function emitNumberLiteral(n: NumberLiteral, hint: TypeHint): string {
  const raw = n.number
  if (hint.bigint) return `${raw}n`
  return raw
}

function emitHexLiteral(h: HexLiteral): string {
  const value = h.value.replace(/^0x/i, '')
  return `'0x${value}' as Hex`
}

function emitIdentifier(id: Identifier): string {
  if (id.name === 'this') return 'this'
  return id.name
}

function emitMemberAccess(ma: MemberAccess, ctx: EmitExprCtx): string {
  if (ma.memberName === 'length') {
    const baseType = inferSolType(ma.expression, ctx.scope)
    if (isHexType(baseType)) {
      const base = emitExpression(ma.expression, ctx)
      return `(${base}.length / 2 - 1)`
    }
    const base = emitExpression(ma.expression, ctx)
    return `${base}.length`
  }
  if (
    ma.expression.type === 'FunctionCall' &&
    (ma.expression as FunctionCall).expression.type === 'Identifier' &&
    ((ma.expression as FunctionCall).expression as Identifier).name === 'type'
  ) {
    const fc = ma.expression as FunctionCall
    const inner = fc.arguments[0] as any
    if (inner && inner.type === 'ElementaryTypeName') {
      const solType: string =
        inner.name === 'uint'
          ? 'uint256'
          : inner.name === 'int'
            ? 'int256'
            : inner.name
      const bits = uintSize(solType) ?? intSize(solType)
      const isSigned = intSize(solType) != null
      if (bits == null) {
        ctx.warnings.push(`Unhandled type(${solType}).${ma.memberName}`)
        return `/* type(${solType}).${ma.memberName} */`
      }
      if (ma.memberName === 'max') {
        if (isSigned) return `((1n << ${bits - 1}n) - 1n)`
        return `((1n << ${bits}n) - 1n)`
      }
      if (ma.memberName === 'min') {
        if (isSigned) return `(-(1n << ${bits - 1}n))`
        return `0n`
      }
    }
  }
  if (ma.expression.type === 'Identifier') {
    const libName = (ma.expression as Identifier).name
    if (ctx.ir.libraryEnums[libName] || ctx.ir.enums[libName]) {
      return `${libName}.${ma.memberName}`
    }
  }
  const base = emitExpression(ma.expression, ctx)
  return `${base}.${ma.memberName}`
}

function emitFunctionCall(fc: FunctionCall, ctx: EmitExprCtx): string {
  if (fc.expression.type === 'MemberAccess') {
    const ma = fc.expression as MemberAccess
    if (
      ma.expression.type === 'Identifier' &&
      (ma.expression as Identifier).name === 'abi' &&
      ma.memberName === 'encodePacked'
    ) {
      return emitAbiEncodePacked(fc, ctx)
    }
    // Library-scoped call: Lib.fn(args)
    const f = ctx.ir.functions[ma.memberName]
    const argHints = inferArgHints(f, fc.arguments.length)
    const baseExpr = emitExpression(ma.expression, ctx)
    const args = fc.arguments
      .map((a, i) => emitExpression(a, ctx, argHints[i] ?? {}))
      .join(', ')
    return `${baseExpr}.${ma.memberName}(${args})`
  }
  if (fc.expression.type === 'NewExpression') {
    const ne = fc.expression as NewExpression
    if (
      ne.typeName.type === 'ElementaryTypeName' &&
      (ne.typeName as any).name === 'bytes'
    ) {
      const arg = fc.arguments[0]
      const n = arg ? emitExpression(arg, ctx) : '0'
      return `newbytes(${n})`
    }
  }
  if (fc.expression.type === 'Identifier') {
    const name = (fc.expression as Identifier).name
    // Solidity `revert("msg")` and `require(cond, "msg")` have no direct TS
    // equivalents; lower them to plain `throw` / guarded throw.
    if (name === 'revert') {
      const arg = fc.arguments[0]
      const msg = arg ? emitExpression(arg, ctx) : `"revert"`
      return `(() => { throw new Error(${msg}) })()`
    }
    if (name === 'require') {
      const cond = fc.arguments[0]
      const msg = fc.arguments[1]
      const condStr = cond ? emitExpression(cond, ctx) : 'true'
      const msgStr = msg ? emitExpression(msg, ctx) : `"require"`
      return `(() => { if (!(${condStr})) throw new Error(${msgStr}) })()`
    }
    return emitIdentifierCall(name, fc, ctx)
  }
  if (fc.expression.type === 'ElementaryTypeName') {
    const name = (fc.expression as any).name
    return emitIdentifierCall(name, fc, ctx)
  }
  const callee = emitExpression(fc.expression, ctx)
  const args = fc.arguments.map((a) => emitExpression(a, ctx)).join(', ')
  return `${callee}(${args})`
}

function emitIdentifierCall(
  name: string,
  fc: FunctionCall,
  ctx: EmitExprCtx,
): string {
  if (name === 'address') {
    const arg = fc.arguments[0]
    if (
      arg &&
      arg.type === 'NumberLiteral' &&
      (arg as NumberLiteral).number === '0'
    ) {
      return 'zeroAddress'
    }
    return arg ? emitExpression(arg, ctx) : 'zeroAddress'
  }
  if (/^bytes\d+$/.test(name)) {
    const size = Number(name.replace('bytes', ''))
    const arg = fc.arguments[0]
    if (
      arg &&
      arg.type === 'NumberLiteral' &&
      (arg as NumberLiteral).number === '0'
    ) {
      return `('0x${'0'.repeat(size * 2)}' as Hex)`
    }
    if (arg) return emitExpression(arg, ctx)
  }
  const uMatch = /^uint(\d+)$/.exec(name)
  if (uMatch) {
    const bits = Number(uMatch[1])
    const arg = fc.arguments[0]
    if (!arg) return `${name}(0)`
    return `${name}(${emitExpression(arg, ctx, { bigint: bits > 32, expect: name })})`
  }
  const iMatch = /^int(\d+)$/.exec(name)
  if (iMatch) {
    const bits = Number(iMatch[1])
    const arg = fc.arguments[0]
    if (!arg) return `${name}(0)`
    return `${name}(${emitExpression(arg, ctx, { bigint: bits > 32, expect: name })})`
  }
  if (name === 'uint') {
    const arg = fc.arguments[0]
    return `uint256(${arg ? emitExpression(arg, ctx, { bigint: true }) : '0'})`
  }
  if (name === 'int') {
    const arg = fc.arguments[0]
    return `int256(${arg ? emitExpression(arg, ctx, { bigint: true }) : '0'})`
  }
  if (name === 'bool' || name === 'string') {
    const arg = fc.arguments[0]
    return arg ? emitExpression(arg, ctx) : '""'
  }

  const f = ctx.ir.functions[name]
  const argHints = inferArgHints(f, fc.arguments.length)
  const args = fc.arguments
    .map((a, i) => emitExpression(a, ctx, argHints[i] ?? {}))
    .join(', ')
  return `${name}(${args})`
}

/** Build per-arg hints from a known project function's parameter types. */
function inferArgHints(
  f: { params: Array<{ type: string }> } | undefined,
  count: number,
): TypeHint[] {
  const hints: TypeHint[] = []
  for (let i = 0; i < count; i++) {
    const p = f?.params[i]
    if (!p) {
      hints.push({})
      continue
    }
    hints.push({ bigint: isBigintSolType(p.type), expect: p.type })
  }
  return hints
}

function emitNewExpression(ne: NewExpression, ctx: EmitExprCtx): string {
  if (
    ne.typeName.type === 'ElementaryTypeName' &&
    (ne.typeName as any).name === 'bytes'
  ) {
    return 'newbytes'
  }
  ctx.warnings.push(`Unhandled NewExpression`)
  return '/* new */'
}

function kindToHint(kind: TsKind): TypeHint {
  return { bigint: kind === 'bigint' }
}

function emitBinary(
  bo: BinaryOperation,
  ctx: EmitExprCtx,
  outerHint: TypeHint,
): string {
  const leftKind = inferTsKind(bo.left, ctx.scope)
  const rightKind = inferTsKind(bo.right, ctx.scope)
  let chosen: TsKind
  if (leftKind === 'bigint' || rightKind === 'bigint') {
    chosen =
      leftKind === 'number' || rightKind === 'number' ? 'number' : 'bigint'
  } else if (leftKind === 'number' || rightKind === 'number') {
    chosen = 'number'
  } else {
    // Both operands are literals / undetermined; fall back to the caller's hint.
    chosen = outerHint.bigint ? 'bigint' : 'other'
  }
  const hint = chosen === 'other' ? outerHint : kindToHint(chosen)
  const left = emitExpression(bo.left, ctx, hint)
  const right = emitExpression(bo.right, ctx, hint)
  const op = bo.operator
  const tsOp = op === '==' ? '===' : op === '!=' ? '!==' : op
  return `${left} ${tsOp} ${right}`
}

function emitUnary(
  uo: UnaryOperation,
  ctx: EmitExprCtx,
  outerHint: TypeHint,
): string {
  const innerKind = inferTsKind(uo.subExpression, ctx.scope)
  const hint = innerKind === 'other' ? outerHint : kindToHint(innerKind)
  const inner = emitExpression(uo.subExpression, ctx, hint)
  if (uo.operator === '!') return `!${inner}`
  if (uo.operator === '~') return `~${inner}`
  if (uo.operator === '-') return `-${inner}`
  if (uo.operator === '+') return `+${inner}`
  if (uo.operator === '++' || uo.operator === '--') {
    return uo.isPrefix ? `${uo.operator}${inner}` : `${inner}${uo.operator}`
  }
  return `${uo.operator}${inner}`
}

function emitConditional(
  c: Conditional,
  ctx: EmitExprCtx,
  hint: TypeHint,
): string {
  // The two branches must agree on ts kind; take the caller's hint if provided,
  // otherwise infer from the branches directly.
  let branchHint = hint
  if (branchHint.bigint == null) {
    const tKind = inferTsKind(c.trueExpression, ctx.scope)
    const fKind = inferTsKind(c.falseExpression, ctx.scope)
    const chosen = tKind !== 'other' ? tKind : fKind
    branchHint = kindToHint(chosen)
  }
  const cond = emitExpression(c.condition, ctx)
  const t = emitExpression(c.trueExpression, ctx, branchHint)
  const f = emitExpression(c.falseExpression, ctx, branchHint)
  return `${cond} ? ${t} : ${f}`
}

function emitIndex(ia: IndexAccess, ctx: EmitExprCtx): string {
  const base = emitExpression(ia.base, ctx)
  const idx = emitExpression(ia.index, ctx)
  return `${base}[${idx}]`
}

function emitTuple(
  te: TupleExpression,
  ctx: EmitExprCtx,
  hint: TypeHint,
): string {
  if (te.components.length === 1) {
    const c = te.components[0] as Expression | null
    return c ? `(${emitExpression(c, ctx, hint)})` : '()'
  }
  const parts = te.components.map((c) =>
    c ? emitExpression(c as Expression, ctx) : '',
  )
  return `[${parts.join(', ')}]`
}

/** Returns true if the given Solidity type maps to TS `bigint`. */
export function isBigintSolType(solType: string): boolean {
  const u = uintSize(solType)
  if (u != null) return u > 32
  const i = intSize(solType)
  if (i != null) return i > 32
  return false
}

export function emitAbiEncodePacked(
  fc: FunctionCall,
  ctx: EmitExprCtx,
): string {
  const args = fc.arguments
  const types: string[] = []
  const values: string[] = []
  for (const arg of args) {
    const solType = abiEncodePackedTypeFor(arg, ctx.scope)
    types.push(solType)
    const bigint = isBigintSolType(solType)
    values.push(emitExpression(arg, ctx, { bigint, expect: solType }))
  }
  const typeList = types.map((t) => JSON.stringify(t)).join(', ')
  const valueList = values.join(', ')
  return `encodePacked([${typeList}], [${valueList}])`
}

function abiEncodePackedTypeFor(arg: Expression, scope: Scope): string {
  const inferred = inferSolType(arg, scope)
  if (!inferred) return 'bytes'
  if (scope.ir.enums[inferred]) return 'uint8'
  return normalizeAbiType(inferred)
}

function normalizeAbiType(t: string): string {
  if (t === 'uint') return 'uint256'
  if (t === 'int') return 'int256'
  return t
}
