import type { Expression } from '@solidity-parser/parser/dist/src/ast-types'
import type {
  ConstantIr,
  EmitCtx,
  EnumIr,
  FunctionIr,
  LibraryAsEnumCandidate,
} from '../types.ts'
import { solTypeToTs } from '../tsTypes.ts'
import { uintSize } from '../solTypes.ts'
import { emitExpression, isBigintSolType } from './expr.ts'
import type { EmitExprCtx } from './expr.ts'
import { Scope } from './scope.ts'
import { emitStatement } from './stmt.ts'

export function emitEnum(e: EnumIr): string {
  const lines = [`export enum ${e.name} {`]
  e.members.forEach((m, i) => {
    lines.push(`\t${m} = ${i},`)
  })
  lines.push(`}`)
  return lines.join('\n')
}

export function emitLibraryAsEnum(l: LibraryAsEnumCandidate): string {
  const lines = [`export enum ${l.name} {`]
  for (const m of l.members) {
    lines.push(`\t${m.name} = ${m.value},`)
  }
  lines.push(`}`)
  return lines.join('\n')
}

export function emitConstant(c: ConstantIr, ctx: EmitCtx): string {
  const tsType = solTypeToTs(c.solidityType, ctx.ir, ctx.typeOverrides)
  if (!c.valueAst) {
    return `export const ${c.name}: ${tsType};`
  }
  // Build a tiny scope with no function context for expression emission.
  const emitCtx: EmitExprCtx = {
    ...ctx,
    scope: new Scope(
      {
        name: '__const__',
        params: [],
        returnType: null,
        returnParams: [],
        body: null,
      } as FunctionIr,
      ctx.ir,
    ),
  }
  const hint = {
    bigint: isBigintSolType(c.solidityType),
    expect: c.solidityType,
  }
  const value = emitExpression(c.valueAst as Expression, emitCtx, hint)
  return `export const ${c.name}: ${tsType} = ${value};`
}

export function emitFunction(fn: FunctionIr, ctx: EmitCtx): string {
  const scope = new Scope(fn, ctx.ir)
  const emitCtx: EmitExprCtx = { ...ctx, scope }
  // Named return params must be in-scope for the body (they're assigned to
  // like local variables and then implicitly returned). Function params are
  // already registered by the Scope constructor.
  const namedReturns = fn.returnParams.filter((p) => p.name)
  for (const rp of namedReturns) scope.define(rp.name, rp.type)

  const params = fn.params
    .map((p) => `${p.name}: ${solTypeToTs(p.type, ctx.ir, ctx.typeOverrides)}`)
    .join(', ')
  const retType = fn.returnType
    ? `: ${solTypeToTs(fn.returnType, ctx.ir, ctx.typeOverrides)}`
    : ''

  let body = ''
  // Pre-declare named return variables with sensible defaults so assignments
  // inside the body type-check and we have something to return at the end.
  for (const rp of namedReturns) {
    const tsType = solTypeToTs(rp.type, ctx.ir, ctx.typeOverrides)
    body += `\tlet ${rp.name}: ${tsType} = ${defaultForSolType(rp.type)};\n`
  }

  const statements = fn.body ? fn.body.statements : []
  const hasExplicitReturn = statements.some(
    (s: any) => s && s.type === 'ReturnStatement',
  )
  for (const s of statements) {
    body += emitStatement(s as any, emitCtx, '\t')
  }
  // Solidity allows omitting `return` when return params are named; emit an
  // explicit return for the TS side.
  if (!hasExplicitReturn && namedReturns.length === 1) {
    body += `\treturn ${namedReturns[0]!.name};\n`
  }
  return `export function ${fn.name}(${params})${retType} {\n${body}}\n`
}

function defaultForSolType(solType: string): string {
  if (!solType) return 'undefined as any'
  if (solType === 'bool') return 'false'
  if (
    solType === 'bytes' ||
    /^bytes\d+$/.test(solType) ||
    solType === 'string'
  ) {
    return `('0x' as Hex)`
  }
  const u = uintSize(solType)
  if (u != null) return u > 32 ? '0n' : '0'
  if (/^int\d*$/.test(solType)) {
    const bits = parseInt(solType.replace(/^int/, ''), 10) || 256
    return bits > 32 ? '0n' : '0'
  }
  if (solType === 'address' || solType === 'address payable')
    return 'zeroAddress'
  return 'undefined as any'
}
