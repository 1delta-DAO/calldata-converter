import * as fs from 'fs'
import type { ConvertOptions, ConvertResult, EmitCtx } from './types.ts'
import { buildProjectIr, loadProject } from './parser.ts'
import { createFsResolver } from './resolver.ts'
import { emitRuntimeImports } from './emit/runtime.ts'
import {
  emitConstant,
  emitEnum,
  emitFunction,
  emitLibraryAsEnum,
} from './emit/topLevel.ts'
import type { FunctionIr } from './types.ts'

function shouldSkipFunction(name: string, skip: (string | RegExp)[]): boolean {
  for (const s of skip) {
    if (typeof s === 'string' && s === name) return true
    if (s instanceof RegExp && s.test(name)) return true
  }
  return false
}

async function formatTs(source: string): Promise<string> {
  try {
    const prettier = await import('prettier')
    return await prettier.format(source, { parser: 'typescript' })
  } catch {
    return source
  }
}

/**
 * Convert a Solidity file (and its imports) to a TypeScript source string.
 *
 * The conversion is fully AST-driven: no regex patch-ups on the emitted
 * output. Runtime helpers and extra behaviors (library-as-enum, purify
 * if-statements, extra skip lists) are supplied via `runtime` and `plugins`.
 *
 * When `validate` is provided, the caller can feed the output plus the IR
 * into `@1delta/sol-to-ts/validate` to run forge + vitest; this function
 * does not invoke forge/vitest itself.
 */
export async function convert(opts: ConvertOptions): Promise<ConvertResult> {
  const resolve = opts.resolve ?? createFsResolver()
  const entrySource = fs.readFileSync(opts.entry, 'utf8')
  const { files, units, imports } = await loadProject(
    opts.entry,
    entrySource,
    resolve,
  )
  let ir = buildProjectIr(opts.entry, files, units, imports)

  for (const p of opts.plugins ?? []) {
    if (p.onParse) {
      const next = p.onParse(ir)
      if (next) ir = next
    }
  }

  const ctx: EmitCtx = {
    ir,
    runtime: opts.runtime,
    skipFunctions: opts.skipFunctions ?? [],
    typeOverrides: opts.typeOverrides ?? {},
    helperFunctions: new Set<string>(
      opts.runtime.imports.flatMap((i) => i.named),
    ),
    warnings: [],
  }

  for (const p of opts.plugins ?? []) {
    p.preEmit?.(ir, ctx)
  }

  const parts: string[] = []
  parts.push(emitRuntimeImports(opts.runtime))

  const emittedFunctions: FunctionIr[] = []

  // Library-as-enum candidates first (they're referenced inside enum numeric values otherwise).
  for (const name of Object.keys(ir.libraryEnums)) {
    parts.push(emitLibraryAsEnum(ir.libraryEnums[name]!))
  }
  // Plain enums
  for (const name of Object.keys(ir.enums)) {
    parts.push(emitEnum(ir.enums[name]!))
  }
  // Constants (excluding those that live inside library-as-enum)
  for (const name of Object.keys(ir.constants)) {
    const c = ir.constants[name]!
    if (c.container && ir.libraryEnums[c.container]) continue
    let emitted: string | undefined
    for (const p of opts.plugins ?? []) {
      const r = p.onEmitConstant?.(c, ctx)
      if (typeof r === 'string') {
        emitted = r
        break
      }
    }
    parts.push(emitted ?? emitConstant(c, ctx))
  }

  // Functions: only those whose container is the entry contract, or free functions.
  const entryContainer = ir.entryContract?.name
  for (const name of Object.keys(ir.functions)) {
    const fn: FunctionIr = ir.functions[name]!
    // Private helpers are still needed at runtime (e.g. CalldataLib's
    // `_fluidSmartHeader` is called from public helpers). Only restrict
    // emission to the entry contract; callers can use `skipFunctions` to
    // drop specific names.
    if (fn.container && entryContainer && fn.container !== entryContainer)
      continue
    if (shouldSkipFunction(fn.name, ctx.skipFunctions)) continue
    // Functions supplied by the runtime config take precedence over anything
    // parsed from sources - don't emit a duplicate that would clash with the
    // named import at the top of the file.
    if (ctx.helperFunctions.has(fn.name)) continue
    let emitted: string | undefined
    for (const p of opts.plugins ?? []) {
      const r = p.onEmitFunction?.(fn, ctx)
      if (typeof r === 'string') {
        emitted = r
        break
      }
    }
    parts.push(emitted ?? emitFunction(fn, ctx))
    emittedFunctions.push(fn)
  }

  let output = parts.join('\n\n') + '\n'
  for (const p of opts.plugins ?? []) {
    if (p.postEmit) output = p.postEmit(output, ir, ctx)
  }
  if (opts.format !== false) {
    output = await formatTs(output)
  }

  return { output, ir, warnings: ctx.warnings, emittedFunctions }
}
