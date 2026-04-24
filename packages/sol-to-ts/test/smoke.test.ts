import { describe, expect, it } from 'vitest'
import { convert } from '../src/index.ts'
import { createInMemoryResolver } from '../src/resolver.ts'
import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'

function withTempFile(
  name: string,
  source: string,
  fn: (p: string) => Promise<void> | void,
) {
  return (async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sol-to-ts-'))
    const p = path.join(dir, name)
    fs.writeFileSync(p, source)
    try {
      await fn(p)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })()
}

describe('sol-to-ts smoke', () => {
  it('converts a library with uint constants to a TS enum', async () => {
    const source = `
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.28;
      library Ids {
        uint256 internal constant A = 0;
        uint256 internal constant B = 0x20;
      }
    `
    await withTempFile('Ids.sol', source, async (entry) => {
      const res = await convert({
        entry,
        runtime: { imports: [] },
        format: false,
      })
      expect(res.output).toContain('export enum Ids')
      expect(res.output).toContain('A = 0')
      expect(res.output).toContain('B = 0x20')
    })
  })

  it('emits encodePacked with correct type tags', async () => {
    const source = `
      pragma solidity ^0.8.28;
      library L {
        function foo(uint8 a, address b, uint128 c) internal pure returns (bytes memory) {
          return abi.encodePacked(a, b, c);
        }
      }
    `
    await withTempFile('L.sol', source, async (entry) => {
      const res = await convert({
        entry,
        runtime: {
          imports: [
            { from: 'viem', typeOnly: true, named: ['Hex', 'Address'] },
            { from: 'runtime', named: ['encodePacked', 'uint8', 'uint128'] },
          ],
        },
        format: false,
      })
      expect(res.output).toContain(
        `encodePacked(["uint8", "address", "uint128"]`,
      )
    })
  })

  it('resolves type(uintN).max / min', async () => {
    const source = `
      pragma solidity ^0.8.28;
      library L {
        uint128 internal constant FLUID_MAX_AMOUNT = type(uint112).max;
        int128 internal constant FLUID_ALL = type(int128).min;
      }
    `
    await withTempFile('L.sol', source, async (entry) => {
      const res = await convert({
        entry,
        runtime: { imports: [] },
        format: false,
      })
      expect(res.output).toContain(
        'FLUID_MAX_AMOUNT: bigint = ((1n << 112n) - 1n)',
      )
      expect(res.output).toContain('FLUID_ALL: bigint = (-(1n << 127n))')
    })
  })

  it('follows imports to pull enums from a sibling file', async () => {
    const enums = `
      pragma solidity ^0.8.28;
      library Ids {
        uint256 internal constant TRANSFER_FROM = 0;
        uint256 internal constant SWEEP = 1;
      }
    `
    const main = `
      pragma solidity ^0.8.28;
      import "./Ids.sol";
      library L {
        function foo(address a) internal pure returns (bytes memory) {
          return abi.encodePacked(uint8(Ids.SWEEP), a);
        }
      }
    `
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sol-to-ts-'))
    try {
      const idsPath = path.join(dir, 'Ids.sol')
      const mainPath = path.join(dir, 'L.sol')
      fs.writeFileSync(idsPath, enums)
      fs.writeFileSync(mainPath, main)
      const res = await convert({
        entry: mainPath,
        runtime: {
          imports: [
            { from: 'viem', typeOnly: true, named: ['Address'] },
            { from: 'runtime', named: ['encodePacked', 'uint8'] },
          ],
        },
        format: false,
      })
      expect(res.output).toContain('export enum Ids')
      expect(res.output).toContain('uint8(Ids.SWEEP)')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
