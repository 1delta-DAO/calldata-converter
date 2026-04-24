import { describe, expect, it } from 'vitest'
import { convertSolidityConstValueToTs } from './conv'

describe('convertSolidityConstValueToTs', () => {
  it('converts type(uintN).max', () => {
    expect(convertSolidityConstValueToTs('uint128', 'type(uint112).max')).toBe(
      '((1n << 112n) - 1n)',
    )
  })

  it('converts decimal uint shifts to bigint', () => {
    expect(convertSolidityConstValueToTs('uint192', '1 << 0')).toBe(
      '(1n << 0n)',
    )
    expect(convertSolidityConstValueToTs('uint192', '1 << 6')).toBe(
      '(1n << 6n)',
    )
  })

  it('rejects unhandled type() expressions', () => {
    expect(() =>
      convertSolidityConstValueToTs('uint8', 'type(unknown(1)).x'),
    ).toThrow(/Unsupported constant initializer/)
  })
})
