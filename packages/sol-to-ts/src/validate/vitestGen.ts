import type { FunctionIr } from '../types.ts'
import type { ExpectedOutput, TestInputs } from './types.ts'

export function generateVitestSuite(opts: {
  functions: FunctionIr[]
  testInputs: TestInputs[]
  expected: ExpectedOutput[]
  tsImportSpecifier: string
}): string {
  const { functions, testInputs, expected, tsImportSpecifier } = opts
  const byName = Object.fromEntries(testInputs.map((t) => [t.functionName, t]))
  const expectedByName = Object.fromEntries(expected.map((e) => [e.name, e.hex]))

  const tests = functions
    .map((fn) => {
      const t = byName[fn.name]
      if (!t) return ''
      const hex = expectedByName[fn.name]
      if (!hex) return `  // ${fn.name}: no expected output captured`
      return `
  test('${fn.name} should match Solidity output', () => {
      const result = CalldataLib.${fn.name}(
        ${t.typescriptValues.join(',\n        ')}
      );
      expect(result).toBe("${hex}");
  });`
    })
    .join('\n')

  return `import { describe, expect, test } from 'vitest';
import * as CalldataLib from "${tsImportSpecifier}";
import type { Address, Hex } from 'viem';

describe('CalldataLib', () => {
${tests}
});
`
}
