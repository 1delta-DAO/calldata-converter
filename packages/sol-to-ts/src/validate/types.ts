export interface TestInputs {
  functionName: string
  solidityValues: string[]
  typescriptValues: string[]
  solidityPreamble?: string
}

export interface ExpectedOutput {
  name: string
  hex: string
}
