import type { FunctionIr, ProjectIr } from '../types.ts'

/**
 * A stack of name->Solidity-type bindings for expression type inference and
 * emitter behavior. Scope frames correspond to a function body plus nested
 * blocks (for-loop init var, etc.).
 */
export class Scope {
  private frames: Array<Record<string, string>> = [{}]

  constructor(public readonly fn: FunctionIr, public readonly ir: ProjectIr) {
    for (const p of fn.params) {
      this.frames[0]![p.name] = p.type
    }
  }

  push(): void {
    this.frames.push({})
  }
  pop(): void {
    this.frames.pop()
  }
  define(name: string, solType: string): void {
    this.frames[this.frames.length - 1]![name] = solType
  }
  lookup(name: string): string | undefined {
    for (let i = this.frames.length - 1; i >= 0; i--) {
      const t = this.frames[i]![name]
      if (t != null) return t
    }
    // Fallback: global constants
    const c = this.ir.constants[name]
    if (c) return c.solidityType
    return undefined
  }

  /** True when `name` refers to a function known to return `bytes`. */
  returnsBytes(name: string): boolean {
    const f = this.ir.functions[name]
    if (!f) return false
    return f.returnType === 'bytes' || f.returnType === 'bytes memory'
  }
}
