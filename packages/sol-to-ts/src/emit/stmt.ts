import type {
  Block,
  BreakStatement,
  Expression,
  ExpressionStatement,
  ForStatement,
  IfStatement,
  RevertStatement,
  ReturnStatement,
  Statement,
  UncheckedStatement,
  VariableDeclarationStatement,
  WhileStatement,
} from '@solidity-parser/parser/dist/src/ast-types'
import { emitExpression, isBigintSolType } from './expr.ts'
import type { EmitExprCtx } from './expr.ts'
import { solTypeFromAst } from '../solTypes.ts'
import { solTypeToTs } from '../tsTypes.ts'
import { inferTsKind } from './tsKind.ts'

/**
 * Emit a single statement as a full TypeScript line (or multiple lines for
 * blocks). Newlines are included in the returned string.
 */
export function emitStatement(
  stmt: Statement,
  ctx: EmitExprCtx,
  indent: string,
): string {
  switch (stmt.type) {
    case 'Block':
      return emitBlock(stmt as Block, ctx, indent)
    case 'ReturnStatement': {
      const rs = stmt as ReturnStatement
      if (!rs.expression) return `${indent}return;\n`
      const retSol = ctx.scope.fn.returnType ?? ''
      const hint = { bigint: isBigintSolType(retSol), expect: retSol }
      return `${indent}return ${emitExpression(rs.expression, ctx, hint)};\n`
    }
    case 'VariableDeclarationStatement':
      return emitVarDecl(stmt as VariableDeclarationStatement, ctx, indent)
    case 'ExpressionStatement': {
      const es = stmt as ExpressionStatement
      if (!es.expression) return `${indent};\n`
      return `${indent}${emitExpression(es.expression, ctx)};\n`
    }
    case 'IfStatement':
      return emitIf(stmt as IfStatement, ctx, indent)
    case 'ForStatement':
      return emitFor(stmt as ForStatement, ctx, indent)
    case 'WhileStatement':
      return emitWhile(stmt as WhileStatement, ctx, indent)
    case 'UncheckedStatement': {
      const us = stmt as UncheckedStatement
      return emitBlock(us.block, ctx, indent)
    }
    case 'RevertStatement': {
      const rs = stmt as RevertStatement
      const call = rs.revertCall
      const msg =
        call.arguments.length === 1 &&
        call.arguments[0]!.type === 'StringLiteral'
          ? (call.arguments[0] as any).value
          : 'revert'
      return `${indent}throw new Error(${JSON.stringify(msg)});\n`
    }
    case 'BreakStatement':
    case 'Break':
      return `${indent}break;\n`
    case 'Continue':
    case 'ContinueStatement':
      return `${indent}continue;\n`
    case 'EmitStatement':
      return `${indent}/* emit stripped */\n`
    case 'InlineAssemblyStatement':
      ctx.warnings.push('Inline assembly is not supported; stub emitted.')
      return `${indent}/* inline assembly stripped */\n`
    default:
      ctx.warnings.push(`Unhandled statement type: ${(stmt as any).type}`)
      return `${indent}/* ${(stmt as any).type} */\n`
  }
}

function emitBlock(block: Block, ctx: EmitExprCtx, indent: string): string {
  ctx.scope.push()
  const inner = indent
  let out = ''
  for (const s of block.statements) {
    out += emitStatement(s as Statement, ctx, inner)
  }
  ctx.scope.pop()
  return out
}

function emitVarDecl(
  vd: VariableDeclarationStatement,
  ctx: EmitExprCtx,
  indent: string,
): string {
  if (vd.variables.length !== 1) {
    ctx.warnings.push(
      'Tuple variable decls are not supported; using untyped let.',
    )
    const init = vd.initialValue
      ? emitExpression(vd.initialValue as Expression, ctx)
      : 'undefined'
    return `${indent}let _tuple = ${init};\n`
  }
  const v = vd.variables[0] as any
  if (!v || v.type !== 'VariableDeclaration') {
    ctx.warnings.push('Unknown variable decl shape')
    return `${indent}/* var decl */\n`
  }
  const name: string = v.name ?? '_'
  const typeName = v.typeName
  const solType = typeName ? solTypeFromAst(typeName) : ''
  if (solType) ctx.scope.define(name, solType)
  const tsType = typeName ? solTypeToTs(solType, ctx.ir, ctx.typeOverrides) : ''
  const hint = { bigint: isBigintSolType(solType), expect: solType }
  const init = vd.initialValue
    ? emitExpression(vd.initialValue as Expression, ctx, hint)
    : defaultInitValue(solType)
  const typeAnn = tsType ? `: ${tsType}` : ''
  return `${indent}let ${name}${typeAnn} = ${init};\n`
}

function defaultInitValue(solType: string): string {
  if (!solType) return 'undefined'
  if (solType === 'bool') return 'false'
  if (
    solType === 'bytes' ||
    /^bytes\d+$/.test(solType) ||
    solType === 'string'
  ) {
    return `'0x' as Hex`
  }
  if (/^u?int\d*$/.test(solType)) {
    const bits = parseInt(solType.replace(/^u?int/, ''), 10) || 256
    return bits > 32 ? '0n' : '0'
  }
  return 'undefined'
}

function emitIf(is: IfStatement, ctx: EmitExprCtx, indent: string): string {
  const cond = emitExpression(is.condition, ctx)
  const trueBody = wrapInBraces(is.trueBody as Statement, ctx, indent)
  if (!is.falseBody) {
    return `${indent}if (${cond}) ${trueBody}`
  }
  const falseBody = wrapInBraces(is.falseBody as Statement, ctx, indent)
  return `${indent}if (${cond}) ${trueBody.replace(/\n$/, '')} else ${falseBody}`
}

function wrapInBraces(
  stmt: Statement,
  ctx: EmitExprCtx,
  indent: string,
): string {
  const childIndent = indent + '\t'
  if (stmt.type === 'Block') {
    const inner = emitBlock(stmt as Block, ctx, childIndent)
    return `{\n${inner}${indent}}\n`
  }
  // Single statement branch - wrap in braces to make TS happy.
  return `{\n${emitStatement(stmt, ctx, childIndent)}${indent}}\n`
}

function emitFor(fs: ForStatement, ctx: EmitExprCtx, indent: string): string {
  ctx.scope.push()
  // A common Solidity pattern is `for (uint256 i = 0; i < arr.length; i++)`.
  // Declaring `i` as bigint (per the uint256 sol type) would blow up at
  // runtime when compared against `arr.length` which is a JS number. Detect
  // the pattern up-front and downcast the counter so both sides of the
  // comparison live in the number domain.
  const counterDowncast = detectCounterDowncast(fs, ctx)
  let initStr = ''
  if (fs.initExpression) {
    if (fs.initExpression.type === 'VariableDeclarationStatement') {
      if (counterDowncast) {
        const vd = fs.initExpression as VariableDeclarationStatement
        const v = vd.variables[0] as any
        const name: string = v?.name ?? 'i'
        // Override the scope binding so the body/condition infer as `number`.
        ctx.scope.define(name, 'uint32')
        const init = vd.initialValue
          ? emitExpression(vd.initialValue as Expression, ctx, {
              bigint: false,
            })
          : '0'
        initStr = `let ${name}: number = ${init}`
      } else {
        initStr = emitVarDecl(
          fs.initExpression as VariableDeclarationStatement,
          ctx,
          '',
        ).trim()
        if (initStr.endsWith(';')) initStr = initStr.slice(0, -1)
      }
    } else if (fs.initExpression.type === 'ExpressionStatement') {
      const es = fs.initExpression as ExpressionStatement
      initStr = es.expression ? emitExpression(es.expression, ctx) : ''
    }
  }
  const condStr = fs.conditionExpression
    ? emitExpression(fs.conditionExpression, ctx)
    : ''
  const loopStr = fs.loopExpression.expression
    ? emitExpression(fs.loopExpression.expression, ctx)
    : ''
  const body = wrapInBraces(fs.body as Statement, ctx, indent)
  ctx.scope.pop()
  return `${indent}for (${initStr}; ${condStr}; ${loopStr}) ${body}`
}

/**
 * If the for-loop looks like `for (uintN i = 0; i <op> rhs; ++i)` and `rhs` is
 * a TS `number` (array length or hex length), we need to emit `i` as `number`
 * to avoid a `bigint`/`number` mix at runtime.
 */
function detectCounterDowncast(fs: ForStatement, ctx: EmitExprCtx): boolean {
  if (
    !fs.initExpression ||
    fs.initExpression.type !== 'VariableDeclarationStatement'
  )
    return false
  const vd = fs.initExpression as VariableDeclarationStatement
  if (vd.variables.length !== 1) return false
  const v = vd.variables[0] as any
  if (!v || v.type !== 'VariableDeclaration') return false
  const solType = v.typeName ? solTypeFromAst(v.typeName) : ''
  if (!isBigintSolType(solType)) return false
  const cond = fs.conditionExpression
  if (!cond || cond.type !== 'BinaryOperation') return false
  const bo = cond as any
  if (!['<', '<=', '>', '>=', '!=', '=='].includes(bo.operator)) return false
  // Probe both sides against a throw-away scope push so identifier lookup of
  // `i` doesn't pollute `ctx.scope` before we decide.
  ctx.scope.push()
  try {
    ctx.scope.define(v.name, solType)
    const lKind = inferTsKind(bo.left, ctx.scope)
    const rKind = inferTsKind(bo.right, ctx.scope)
    return lKind === 'number' || rKind === 'number'
  } finally {
    ctx.scope.pop()
  }
}

function emitWhile(
  ws: WhileStatement,
  ctx: EmitExprCtx,
  indent: string,
): string {
  const cond = emitExpression(ws.condition, ctx)
  const body = wrapInBraces(ws.body as Statement, ctx, indent)
  return `${indent}while (${cond}) ${body}`
}
