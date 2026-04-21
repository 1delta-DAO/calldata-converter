import { describe, expect, test } from 'vitest'
import { generateTestInputs } from './testInputGenerator'
import type { FunctionDef, SolidityEnum } from './types'

const noEnums: SolidityEnum[] = []

function makeFunc(name: string, ...paramTypes: string[]): FunctionDef {
  return {
    name,
    params: paramTypes.map((type, i) => ({ type, name: `p${i}` })),
    returnType: 'bytes',
    body: "return hex'';",
  }
}

describe('generateTestInputs — scalar types', () => {
  test('address produces valid Solidity address and TS Address string', () => {
    const inputs = generateTestInputs(makeFunc('f', 'address'), noEnums)
    expect(inputs.solidityValues[0]).toMatch(/^0x[0-9a-fA-F]{40}$/)
    expect(inputs.typescriptValues[0]).toMatch(
      /^"0x[0-9a-fA-F]{40}" as Address$/,
    )
    expect(inputs.solidityPreamble).toBeUndefined()
  })

  test('uint256 produces bigint TS value', () => {
    const inputs = generateTestInputs(makeFunc('f', 'uint256'), noEnums)
    expect(inputs.typescriptValues[0]).toMatch(/n$/)
    expect(inputs.solidityPreamble).toBeUndefined()
  })

  test('uint32 produces plain number TS value', () => {
    const inputs = generateTestInputs(makeFunc('f', 'uint32'), noEnums)
    expect(inputs.typescriptValues[0]).not.toMatch(/n$/)
    expect(inputs.solidityPreamble).toBeUndefined()
  })

  test('bool produces true or false', () => {
    const inputs = generateTestInputs(makeFunc('f', 'bool'), noEnums)
    expect(['true', 'false']).toContain(inputs.solidityValues[0])
    expect(inputs.solidityPreamble).toBeUndefined()
  })

  test('bytes32 produces hex value', () => {
    const inputs = generateTestInputs(makeFunc('f', 'bytes32'), noEnums)
    expect(inputs.solidityValues[0]).toMatch(/^0x[0-9a-fA-F]{64}$/)
    expect(inputs.solidityPreamble).toBeUndefined()
  })

  test('enum produces first enum value in Solidity and 0 in TS', () => {
    const enums: SolidityEnum[] = [
      { name: 'MyEnum', values: [{ name: 'A' }, { name: 'B' }] },
    ]
    const inputs = generateTestInputs(makeFunc('f', 'MyEnum'), enums)
    expect(inputs.solidityValues[0]).toBe('MyEnum.A')
    expect(inputs.typescriptValues[0]).toBe('0')
    expect(inputs.solidityPreamble).toBeUndefined()
  })
})

describe('generateTestInputs — 1D dynamic array (T[])', () => {
  test('address[] produces preamble with new address[](2) and varName as solValue', () => {
    const inputs = generateTestInputs(makeFunc('f', 'address[]'), noEnums)
    expect(inputs.solidityValues[0]).toBe('_a_f_0')
    expect(inputs.solidityPreamble).toContain(
      'address[] memory _a_f_0 = new address[](2);',
    )
    expect(inputs.solidityPreamble).toContain('_a_f_0[0] =')
    expect(inputs.solidityPreamble).toContain('_a_f_0[1] =')
  })

  test('address[] produces TS array literal with 2 Address elements', () => {
    const inputs = generateTestInputs(makeFunc('f', 'address[]'), noEnums)
    expect(inputs.typescriptValues[0]).toMatch(
      /^\[.*as Address.*as Address.*\]$/,
    )
  })

  test('uint256[] produces preamble and bigint TS values', () => {
    const inputs = generateTestInputs(makeFunc('f', 'uint256[]'), noEnums)
    expect(inputs.solidityPreamble).toContain(
      'uint256[] memory _a_f_0 = new uint256[](2);',
    )
    expect(inputs.typescriptValues[0]).toMatch(/^\[.+n, .+n\]$/)
  })

  test('bytes32[] produces preamble with hex elements', () => {
    const inputs = generateTestInputs(makeFunc('f', 'bytes32[]'), noEnums)
    expect(inputs.solidityPreamble).toContain(
      'bytes32[] memory _a_f_0 = new bytes32[](2);',
    )
  })

  test('enum[] produces preamble with enum.value assignments', () => {
    const enums: SolidityEnum[] = [
      { name: 'MyEnum', values: [{ name: 'First' }] },
    ]
    const inputs = generateTestInputs(makeFunc('f', 'MyEnum[]'), enums)
    expect(inputs.solidityPreamble).toContain(
      'MyEnum[] memory _a_f_0 = new MyEnum[](2);',
    )
    expect(inputs.solidityPreamble).toContain('_a_f_0[0] = MyEnum.First;')
    expect(inputs.typescriptValues[0]).toBe('[0, 0]')
  })

  test('memory modifier is stripped before array detection', () => {
    const inputs = generateTestInputs(
      makeFunc('f', 'address[] memory'),
      noEnums,
    )
    expect(inputs.solidityPreamble).toContain(
      'address[] memory _a_f_0 = new address[](2);',
    )
  })
})

describe('generateTestInputs — 1D fixed array (T[N])', () => {
  test('uint256[2] produces fixed-size Solidity declaration', () => {
    const inputs = generateTestInputs(makeFunc('f', 'uint256[2]'), noEnums)
    expect(inputs.solidityValues[0]).toBe('_a_f_0')
    expect(inputs.solidityPreamble).toContain('uint256[2] memory _a_f_0;')
    expect(inputs.solidityPreamble).toContain('_a_f_0[0] =')
    expect(inputs.solidityPreamble).toContain('_a_f_0[1] =')
  })

  test('address[3] generates exactly 3 element assignments', () => {
    const inputs = generateTestInputs(makeFunc('f', 'address[3]'), noEnums)
    expect(inputs.solidityPreamble).toContain('address[3] memory _a_f_0;')
    const assignments = (inputs.solidityPreamble ?? '').match(
      /_a_f_0\[\d+\] =/g,
    )
    expect(assignments).toHaveLength(3)
  })
})

describe('generateTestInputs — nested arrays', () => {
  test('address[][] produces nested preamble declarations in correct dependency order', () => {
    const inputs = generateTestInputs(makeFunc('f', 'address[][]'), noEnums)
    const preamble = inputs.solidityPreamble ?? ''
    // Inner arrays must be declared before the outer one
    const innerIdx0 = preamble.indexOf('address[] memory _a_f_0_0')
    const innerIdx1 = preamble.indexOf('address[] memory _a_f_0_1')
    const outerIdx = preamble.indexOf('address[][] memory _a_f_0')
    expect(innerIdx0).toBeLessThan(outerIdx)
    expect(innerIdx1).toBeLessThan(outerIdx)
  })

  test('bytes32[][] has correct outer type declaration', () => {
    const inputs = generateTestInputs(makeFunc('f', 'bytes32[][]'), noEnums)
    expect(inputs.solidityPreamble).toContain(
      'bytes32[][] memory _a_f_0 = new bytes32[][](2);',
    )
  })
})

describe('generateTestInputs — multiple parameters', () => {
  test('mixed scalar and array params: preamble only for array', () => {
    const inputs = generateTestInputs(
      makeFunc('f', 'address', 'uint256[]'),
      noEnums,
    )
    expect(inputs.solidityValues[0]).toMatch(/^0x[0-9a-fA-F]{40}$/)
    expect(inputs.solidityValues[1]).toBe('_a_f_1')
    expect(inputs.solidityPreamble).toContain('uint256[] memory _a_f_1')
  })

  test('two array params produce preamble entries for both', () => {
    const inputs = generateTestInputs(
      makeFunc('f', 'address[]', 'uint256[]'),
      noEnums,
    )
    expect(inputs.solidityPreamble).toContain('_a_f_0')
    expect(inputs.solidityPreamble).toContain('_a_f_1')
  })
})
