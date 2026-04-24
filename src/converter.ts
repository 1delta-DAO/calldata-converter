import * as fs from 'fs'
import * as fsp from 'fs/promises'
import path from 'path'
import { convert, purifyIfStatements, runValidation } from '@1delta/sol-to-ts'
import { removeIfConditions } from './purifier'
import { format } from 'prettier'
import { glob } from 'glob'
import { CALLDATA_LIB_PATH, HARDCODED_FUNCTIONS, OUTPUT_DIR } from './consts'

export interface ConverterConfig {
  calldataLibPath: string
  outputDir: string
  runTests?: boolean
  testCount?: number
  verbose?: boolean
}

/**
 * Thin driver around `@1delta/sol-to-ts`. Owns CalldataLib-specific choices:
 *
 *   - which symbols come from the published runtime helpers package,
 *   - which helpers (HARDCODED_FUNCTIONS and `_`-prefixed internal helpers) to
 *     skip entirely,
 *   - whether to materialize a purified `_pure.sol` for forge to use.
 *
 * Everything else - import resolution, IR, emission, and validation -
 * lives in the reusable module.
 */
export async function converter(config: ConverterConfig): Promise<void> {
  const { calldataLibPath, outputDir, runTests, verbose } = config
  fs.mkdirSync(outputDir, { recursive: true })

  const baseFileName = path.basename(calldataLibPath, '.sol')
  const tsFileName = `${baseFileName}.ts`
  const tsOutputPath = path.join(outputDir, tsFileName)

  // Materialize a purified `_pure.sol` so the forge script can call each
  // function unconditionally (the AST purify plugin strips the TS side in
  // lock-step below).
  await removeIfConditions([calldataLibPath])
  const purifiedSolidityPath = calldataLibPath.replace(/\.sol$/, '_pure.sol')

  console.log('Generating TypeScript code...\n')
  const result = await convert({
    entry: calldataLibPath,
    runtime: {
      imports: [
        { from: 'viem', named: ['Hex', 'Address'], typeOnly: true },
        { from: 'viem', named: ['zeroAddress'] },
        {
          from: '../../packages/calldatalib/src/runtime.ts',
          named: [
            'encodePacked',
            'uint8',
            'uint16',
            'uint32',
            'uint112',
            'uint128',
            'uint256',
            'int8',
            'int16',
            'int32',
            'int64',
            'int128',
            'int256',
            '_SHARES_MASK',
            '_UNSAFE_AMOUNT',
            'generateAmountBitmap',
            'newbytes',
            'bytes',
            'getMorphoCollateral',
            'getMorphoLoanAsset',
            'rightPadZero',
            'encodeCompoundV2SelectorId',
            'encodeSiloV2CollateralMode',
            'encodeAaveV4PmsBatchPermit',
          ],
        },
      ],
    },
    // HARDCODED_FUNCTIONS are the ones that live in the published runtime
    // helpers package. They're supplied via the runtime import above and
    // must not be re-emitted by the converter. `_`-prefixed helpers ARE
    // emitted because non-underscore functions call them.
    skipFunctions: [...HARDCODED_FUNCTIONS],
    plugins: [purifyIfStatements({ stopAtFunction: 'getMorphoCollateral' })],
    format: true,
  })

  fs.writeFileSync(tsOutputPath, result.output)

  // The old pipeline renames `CalldataLib.ts` -> `CalldataLib_pure.ts` for the
  // generated test file to import. We emit `result.output` already purified
  // (via the plugin above), so we just copy it under the expected name.
  const purifiedTsPath = tsOutputPath.replace(/\.ts$/, '_pure.ts')
  fs.writeFileSync(purifiedTsPath, result.output)

  if (result.warnings.length > 0 && verbose) {
    console.warn('sol-to-ts warnings:')
    for (const w of result.warnings) console.warn(`  - ${w}`)
  }

  if (!runTests) {
    console.log('Tests generated. To run them, use:\n')
    console.log(`pnpm vitest run ${tsOutputPath.replace(/\.ts$/, '.test.ts')}\n`)
    return
  }

  console.log('Running validation (forge + vitest)...\n')
  const validation = await runValidation({
    ir: result.ir,
    functions: result.emittedFunctions,
    config: {
      inputDir: path.dirname(calldataLibPath),
      outputDir,
      tsFilePath: tsOutputPath,
      tsImportSpecifier: `./${baseFileName}_pure.ts`,
      runVitest: true,
      libraryName: baseFileName,
      purifiedSolidityPath,
      skipInTests: [/^_/, ...HARDCODED_FUNCTIONS],
    },
  })
  if (validation.vitestPassed) {
    console.log('\n✅ Tests completed successfully\n')
    await formatAll()
  } else {
    throw new Error('Vitest failed; see output above.')
  }
}

export async function tsFormatter(p: string): Promise<void> {
  const content = await fsp.readFile(p, 'utf8')
  const formatted = await format(content, {
    parser: 'typescript',
    singleQuote: false,
    semi: true,
    printWidth: 120,
    tabWidth: 2,
    useTabs: true,
    trailingComma: 'all',
    bracketSpacing: true,
  })
  await fsp.writeFile(p, formatted)
}

export async function formatAll(): Promise<void> {
  const tsFiles = await glob('**/*.ts', { cwd: OUTPUT_DIR, absolute: true })
  for (const file of tsFiles) {
    await tsFormatter(path.resolve(file))
  }
}
