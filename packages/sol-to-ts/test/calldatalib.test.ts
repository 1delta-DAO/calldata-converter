import { describe, it, expect } from 'vitest'
import * as path from 'path'
import { convert } from '../src/index.ts'
import { purifyIfStatements } from '../src/plugins/index.ts'

const CALLDATALIB_SOL = path.resolve(
  new URL('.', import.meta.url).pathname,
  '../../../data/input/CalldataLib.sol',
)

describe('CalldataLib conversion', () => {
  it('parses and emits without throwing', async () => {
    const res = await convert({
      entry: CALLDATALIB_SOL,
      runtime: {
        imports: [
          { from: 'viem', typeOnly: true, named: ['Hex', 'Address'] },
          { from: 'viem', named: ['zeroAddress'] },
          {
            from: 'runtime',
            named: [
              'encodePacked',
              'uint8',
              'uint16',
              'uint32',
              'uint128',
              'uint256',
              'int8',
              'int16',
              'int32',
              'int128',
              'int256',
              'newbytes',
              'generateAmountBitmap',
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
      skipFunctions: [/^_/],
      plugins: [purifyIfStatements({ stopAtFunction: 'getMorphoCollateral' })],
      format: false,
    })
    expect(res.output.length).toBeGreaterThan(1000)
    expect(res.output).toContain('export function encode')
    // Spot-check a tricky construct: type(uint112).max should be lowered.
    expect(res.output).toContain('((1n << 112n) - 1n)')
    // uint8(condition ? 1 : 0) pattern is preserved
    expect(res.output).toMatch(/uint8\([^)]*\?/)
    if (res.warnings.length) {
      // Surface warnings in console for triage; do not fail.
      console.log('warnings:', res.warnings.slice(0, 20))
    }
  })
})
