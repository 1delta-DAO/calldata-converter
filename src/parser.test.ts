import { describe, expect, it } from 'vitest'
import { parseConstants, parseSolidity } from './parser'

const SAMPLE = `
  uint128 internal constant FOO = type(uint112).max;
  uint192 internal constant BAR = 1 << 0;
`

describe('parseConstants', () => {
  it('matches type [visibility] constant and captures value', () => {
    const c = parseConstants(SAMPLE)
    const byName = Object.fromEntries(c.map((k) => [k.name, k]))
    expect(byName.FOO).toEqual({
      type: 'uint128',
      name: 'FOO',
      value: 'type(uint112).max',
    })
    expect(byName.BAR).toEqual({
      type: 'uint192',
      name: 'BAR',
      value: '1 << 0',
    })
  })

  it('keeps the first of duplicate names', () => {
    const dup = `
    uint8 constant X = 1;
    uint8 internal constant X = 2;
    `
    const c = parseConstants(dup)
    const x = c.filter((k) => k.name === 'X')
    expect(x).toHaveLength(1)
    expect(x[0]!.value).toBe('1')
  })

  it('includes constants from parseSolidity', () => {
    const { constants } = parseSolidity(SAMPLE)
    expect(
      constants.some((c) => c.name === 'FOO' && c.type === 'uint128'),
    ).toBe(true)
  })
})
