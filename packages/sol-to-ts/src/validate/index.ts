import * as fs from 'node:fs'
import * as path from 'node:path'
import { execSync, spawnSync } from 'node:child_process'
import type {
  FunctionIr,
  ProjectIr,
  ValidateConfig,
  ValidationReport,
} from '../types.ts'
import { buildForgeScript } from './forgeScript.ts'
import { generateVitestSuite } from './vitestGen.ts'
import type { ExpectedOutput } from './types.ts'

/**
 * Runs the opt-in validation pipeline:
 *
 *   1. Serialize test inputs and the forge script derived from the IR.
 *   2. Execute `forge script` (if available) to collect expected return hex.
 *   3. Write a vitest suite that exercises the generated TS against those
 *      expected values.
 *   4. Optionally run vitest.
 *
 * The consumer is responsible for:
 *   - Placing the solidity sources (purified if needed) on disk before calling.
 *   - Writing the generated TS file at `config.tsFilePath`.
 *   - Providing a working `forge` binary in `PATH` (or the `forgeBin` option).
 */
export async function runValidation(opts: {
  ir: ProjectIr
  /** Functions that actually made it into the TS output (filtered by skip / runtime). */
  functions: FunctionIr[]
  config: ValidateConfig
}): Promise<ValidationReport> {
  const { ir, functions, config } = opts
  const outputDir = path.resolve(config.outputDir)
  fs.mkdirSync(outputDir, { recursive: true })

  const shouldSkip = (name: string): boolean => {
    for (const s of config.skipInTests ?? []) {
      if (typeof s === 'string' && s === name) return true
      if (s instanceof RegExp && s.test(name)) return true
    }
    return false
  }
  const testableFunctions = functions.filter(
    (f) => f.visibility !== 'private' && !shouldSkip(f.name),
  )

  const purifiedEntryPath = config.purifiedSolidityPath
    ? path.resolve(config.purifiedSolidityPath)
    : ir.entry
  const { script, inputs } = buildForgeScript({
    ir,
    functions: testableFunctions,
    purifiedEntryPath,
    scriptDir: outputDir,
    libraryName: config.libraryName,
  })

  const forgeScriptPath = path.join(outputDir, 'GenerateCalldata.s.sol')
  const testInputsPath = path.join(outputDir, 'test-inputs.json')
  fs.writeFileSync(forgeScriptPath, script)
  fs.writeFileSync(testInputsPath, JSON.stringify(inputs, null, 2))

  const forgeBin = config.forgeBin ?? 'forge'
  let expected: ExpectedOutput[] = []
  try {
    const out = execSync(`${forgeBin} script --via-ir ${forgeScriptPath}`, {
      encoding: 'utf8',
    })
    expected = parseForgeOutput(out)
    fs.writeFileSync(
      path.join(outputDir, 'expected-outputs.json'),
      JSON.stringify(expected, null, 2),
    )
  } catch (err) {
    // Forge failures are non-fatal; we still write the generated files so the
    // caller can inspect / run forge manually.
    // eslint-disable-next-line no-console
    console.warn(
      `sol-to-ts: forge execution failed - continuing without expected outputs (${(err as Error).message})`,
    )
  }

  const testSuite = generateVitestSuite({
    functions: testableFunctions,
    testInputs: inputs,
    expected,
    tsImportSpecifier: config.tsImportSpecifier,
  })
  const testFilePath = path.join(outputDir, `${config.libraryName}.test.ts`)
  fs.writeFileSync(testFilePath, testSuite)

  let vitestPassed: boolean | undefined
  if (config.runVitest) {
    const result = spawnSync('pnpm', ['vitest', 'run', testFilePath], {
      stdio: 'inherit',
    })
    vitestPassed = result.status === 0
  }

  return {
    forgeExpected: expected,
    testFilePath,
    testInputsPath,
    forgeScriptPath,
    vitestPassed,
  }
}

function parseForgeOutput(output: string): ExpectedOutput[] {
  const lines = output.split('\n')
  const i = lines.findIndex((l) => l === '== Logs ==')
  if (i < 0) return []
  const after = lines.slice(i + 1).filter((l) => l)
  const result: ExpectedOutput[] = []
  for (let k = 0; k < after.length; k += 2) {
    const name = after[k]!.trim().replace(/,$/, '')
    const hex = after[k + 1]?.trim() ?? ''
    result.push({ name, hex })
  }
  return result
}
