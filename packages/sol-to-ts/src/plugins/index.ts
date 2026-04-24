import type {
  ConstantIr,
  EmitCtx,
  FunctionIr,
  ProjectIr,
  SolToTsPlugin,
} from '../types.ts'
import {
  emitConstant,
  emitFunction,
} from '../emit/topLevel.ts'

/**
 * Drops `IfStatement` nodes from function bodies so the emitted helpers never
 * throw during validation. Used by the CalldataLib CLI to generate the
 * `_pure` vitest input without falling back to source-level regex surgery.
 *
 * `stopAtFunction` matches the semantics of the current purifier: purify
 * every function defined strictly *before* the named function. Functions from
 * `stopAtFunction` onward pass through unchanged.
 */
export function purifyIfStatements(options: {
  stopAtFunction?: string
} = {}): SolToTsPlugin {
  const stopAt = options.stopAtFunction
  let stopReached = false
  return {
    name: 'purifyIfStatements',
    preEmit(ir: ProjectIr, ctx: EmitCtx) {
      stopReached = false
      for (const name of Object.keys(ir.functions)) {
        const fn = ir.functions[name]!
        if (stopAt && fn.name === stopAt) stopReached = true
        if (stopAt && stopReached) continue
        if (!fn.body) continue
        fn.body = { ...fn.body, statements: stripIfs(fn.body.statements) }
      }
    },
  }
}

function stripIfs(stmts: any[]): any[] {
  const out: any[] = []
  for (const s of stmts) {
    if (!s) continue
    if (s.type === 'IfStatement') continue
    if (s.type === 'Block') {
      out.push({ ...s, statements: stripIfs(s.statements) })
      continue
    }
    if (s.type === 'ForStatement' && s.body && s.body.type === 'Block') {
      out.push({ ...s, body: { ...s.body, statements: stripIfs(s.body.statements) } })
      continue
    }
    out.push(s)
  }
  return out
}

/**
 * No-op plugin that documents the intent; library-as-enum detection is done
 * in the parser itself (a library with only uint/int constants is lifted to
 * an enum). This plugin can be passed to opt into that behavior but it's on
 * by default. Provided for future-proofing when an opt-out is needed.
 */
export function libraryAsEnum(): SolToTsPlugin {
  return { name: 'libraryAsEnum' }
}

/**
 * Apply a user-defined function-name filter; equivalent to `skipFunctions`
 * but exposed as a plugin so consumers can compose regex/string lists
 * alongside other plugin logic.
 */
export function skipFunctionsPlugin(names: (string | RegExp)[]): SolToTsPlugin {
  return {
    name: 'skipFunctions',
    preEmit(_ir, ctx) {
      ctx.skipFunctions = [...ctx.skipFunctions, ...names]
    },
  }
}
