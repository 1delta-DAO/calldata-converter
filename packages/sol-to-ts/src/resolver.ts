import * as fs from 'fs'
import * as path from 'path'
import type { ImportResolver, ResolvedFile } from './types.ts'

/**
 * Filesystem resolver: treats `importPath` as relative to `fromFile`'s directory.
 * Handles the `./` / `../` / bare-filename cases CalldataLib uses.
 */
export function createFsResolver(): ImportResolver {
  return async (importPath: string, fromFile: string): Promise<ResolvedFile> => {
    const fromDir = path.dirname(fromFile)
    // Strip any leading `./` so `./X.sol` and `X.sol` behave the same.
    const normalized = importPath.replace(/^\.\//, '')
    const candidate = path.isAbsolute(normalized)
      ? normalized
      : path.resolve(fromDir, normalized)
    if (!fs.existsSync(candidate)) {
      throw new Error(
        `sol-to-ts: cannot resolve import '${importPath}' from '${fromFile}' (tried ${candidate})`,
      )
    }
    return {
      path: candidate,
      source: fs.readFileSync(candidate, 'utf8'),
    }
  }
}

/** In-memory resolver for unit tests: looks up files from a `{ filename: source }` map. */
export function createInMemoryResolver(
  sources: Record<string, string>,
): ImportResolver {
  return async (importPath: string, fromFile: string): Promise<ResolvedFile> => {
    const normalized = importPath.replace(/^\.\//, '')
    const keys = [normalized, path.basename(normalized)]
    for (const k of keys) {
      if (Object.prototype.hasOwnProperty.call(sources, k)) {
        return { path: k, source: sources[k]! }
      }
    }
    throw new Error(
      `sol-to-ts: in-memory resolver could not find '${importPath}' (from '${fromFile}')`,
    )
  }
}
