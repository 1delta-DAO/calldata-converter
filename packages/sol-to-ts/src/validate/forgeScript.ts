import * as path from 'node:path'
import type { FunctionIr, ProjectIr } from '../types.ts'
import type { TestInputs } from './types.ts'
import { generateTestInputs } from './testInputs.ts'

/**
 * Builds the forge script source + the parallel test-inputs manifest. The
 * script imports every relevant solidity file from the project IR (so enums,
 * library-enums, and free contracts resolve) and calls each emittable
 * function with random inputs, logging its return value as hex.
 */
export function buildForgeScript(opts: {
  ir: ProjectIr
  /** Functions to emit into the forge script (same filter the TS emitter uses). */
  functions: FunctionIr[]
  /** Absolute path of the purified solidity file used as the forge import source. */
  purifiedEntryPath: string
  /** Directory in which the forge script will be written (used to compute relative imports). */
  scriptDir: string
  /** Library name for the entry `contract`—used to call `LibName.fn(...)`. */
  libraryName: string
}): { script: string; inputs: TestInputs[] } {
  const { ir, functions, purifiedEntryPath, scriptDir, libraryName } = opts

  // Build imports: for each file reachable from the entry, import its named
  // symbols (enums/libraryEnums/structs/contracts). The entry file itself is
  // swapped for the purified `_pure` version so `if`-guarded reverts don't
  // blow up forge.
  const entry = ir.entry
  const importLines: string[] = []
  for (const filePath of Object.keys(ir.files)) {
    const isEntry = filePath === entry
    const target = isEntry ? purifiedEntryPath : filePath
    const names = new Set<string>()
    // Enums + library-enums + structs + contracts from this file
    for (const e of Object.values(ir.enums)) {
      if (e.sourceFile === filePath) names.add(e.name)
    }
    for (const le of Object.values(ir.libraryEnums)) {
      if (le.sourceFile === filePath) names.add(le.name)
    }
    for (const s of Object.values(ir.structs)) {
      if (s.sourceFile === filePath) names.add(s.name)
    }
    const byContract = ir.contracts[filePath]
    if (byContract) {
      for (const cname of Object.keys(byContract)) names.add(cname)
    }
    const rel = toImportPath(scriptDir, target)
    if (names.size > 0) {
      importLines.push(`import {${[...names].join(',')}} from "${rel}";`)
    } else {
      importLines.push(`import "${rel}";`)
    }
  }

  const inputs: TestInputs[] = []
  let testCalls = ''
  for (const fn of functions) {
    const t = generateTestInputs(fn, ir)
    inputs.push(t)
    testCalls += renderTestCall(fn, t, libraryName)
  }

  const script = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "forge-std/console.sol";
${importLines.join('\n')}

contract GenerateCalldata is Script {
    function setUp() public {}

    function run() public pure {
${testCalls}    }
}
`
  return { script, inputs }
}

function renderTestCall(fn: FunctionIr, t: TestInputs, libraryName: string): string {
  const preamble = t.solidityPreamble ? `\n        ${t.solidityPreamble}\n` : ''
  return `
        // Test ${fn.name}${preamble}
        bytes memory ${fn.name}Result = ${libraryName}.${fn.name}(
            ${t.solidityValues.join(',\n            ')}
        );
        console.log("${fn.name},");
        console.logBytes(${fn.name}Result);
`
}

function toImportPath(fromDir: string, targetFile: string): string {
  let rel = path.relative(fromDir, targetFile)
  if (!rel.startsWith('.')) rel = `./${rel}`
  return rel.replace(/\\/g, '/')
}
