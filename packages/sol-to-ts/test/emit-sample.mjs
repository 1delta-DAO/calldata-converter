#!/usr/bin/env node
import { convert } from '../src/index.ts'
import { purifyIfStatements } from '../src/plugins/index.ts'
import * as fs from 'fs'

const entry = '/home/max/1delta/calldata-converter/data/input/CalldataLib.sol'
const res = await convert({
  entry,
  runtime: {
    imports: [
      { from: 'viem', typeOnly: true, named: ['Hex', 'Address'] },
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
  skipFunctions: [/^_/],
  plugins: [],
  format: false,
})
fs.writeFileSync('/tmp/out.ts', res.output)
console.log('warnings:', res.warnings.length)
for (const w of res.warnings.slice(0, 25)) console.log(' -', w)
console.log('bytes:', res.output.length)
