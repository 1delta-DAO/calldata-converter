import fs from 'fs/promises'
import path from 'path'

// Matches a full `if (...)` statement: either an `if (...) { ... }` block
// (up to three levels of nested braces) or a single `if (...) stmt;`. The `\b`
// avoids matching `if(` inside identifiers (e.g. `notify(`).
const IF_REGEX =
  /\bif\s*\([^)]*\)\s*({(?:[^{}]*|{(?:[^{}]*|{[^{}]*})*})*}|[^;\n]*;)/g

/**
 * Strips `if` statements up to a boundary marker, then re-appends the rest of
 * the file verbatim. The boundary keeps the shared utility helpers (and their
 * essential `if`s, e.g. inside `generateAmountBitmap`) untouched.
 */
function stripIfsBefore(content: string, splitText: string): string {
  const parts = content.split(splitText)
  if (parts.length < 2) return content.replaceAll(IF_REGEX, '')
  return (
    parts[0]!.replaceAll(IF_REGEX, '') +
    splitText +
    parts.slice(1).join(splitText)
  )
}

export async function removeIfConditions(files: string[]) {
  for (const filePath of files) {
    let content = await fs.readFile(filePath, 'utf-8')
    const name = path.basename(filePath)
    const pureName = name.replace('.', '_pure.')

    if (name.endsWith('sol')) {
      // The Solidity helpers begin at `function getMorphoCollateral`.
      content = stripIfsBefore(content, 'function getMorphoCollateral')
    } else if (name.endsWith('ts')) {
      // In the TS output the helpers are imported (not defined), so the
      // equivalent boundary is the first function that follows them in source
      // order: `encodeAaveV4Deposit`.
      content = stripIfsBefore(content, 'function encodeAaveV4Deposit')
    } else throw new Error('Unsupported file type')
    const newPath = filePath.replace(name, pureName)
    await fs.writeFile(newPath, content)
  }
}
