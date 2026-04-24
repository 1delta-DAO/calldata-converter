import type { RuntimeConfig } from '../types.ts'

/**
 * Render the TS import header from a declarative `RuntimeConfig`. Import
 * groups are emitted in the order they appear in the config, with type-only
 * imports using the `import type` form.
 */
export function emitRuntimeImports(cfg: RuntimeConfig): string {
  const lines: string[] = []
  for (const imp of cfg.imports) {
    if (imp.named.length === 0) continue
    const prefix = imp.typeOnly ? 'import type' : 'import'
    const names = imp.named.join(', ')
    lines.push(`${prefix} { ${names} } from '${imp.from}'`)
  }
  return lines.join('\n')
}
