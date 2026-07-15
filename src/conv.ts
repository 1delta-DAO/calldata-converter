import { parseSolidity } from './parser'
import type {
  SolidityStruct,
  FunctionDef,
  ConverterOutput,
  Parameter,
  SolidityConstant,
} from './types'
import { FUNCTION_REGEX, HARDCODED_FUNCTIONS } from './consts'

const TYPE_MAP: Record<string, string> = {
  uint8: 'number',
  uint16: 'number',
  uint24: 'number',
  uint32: 'number',
  uint64: 'bigint',
  uint112: 'bigint',
  uint128: 'bigint',
  uint192: 'bigint',
  uint256: 'bigint',
  uint: 'bigint',
  int8: 'number',
  int16: 'number',
  int32: 'number',
  int64: 'bigint',
  int128: 'bigint',
  int256: 'bigint',
  int: 'bigint',
  bool: 'boolean',
  string: 'string',
  bytes: 'Hex',
  address: 'Address',
  bytes1: 'Hex',
  bytes2: 'Hex',
  bytes3: 'Hex',
  bytes4: 'Hex',
  bytes5: 'Hex',
  bytes6: 'Hex',
  bytes7: 'Hex',
  bytes8: 'Hex',
  bytes9: 'Hex',
  bytes10: 'Hex',
  bytes11: 'Hex',
  bytes12: 'Hex',
  bytes13: 'Hex',
  bytes14: 'Hex',
  bytes15: 'Hex',
  bytes16: 'Hex',
  bytes17: 'Hex',
  bytes18: 'Hex',
  bytes19: 'Hex',
  bytes20: 'Hex',
  bytes21: 'Hex',
  bytes22: 'Hex',
  bytes23: 'Hex',
  bytes24: 'Hex',
  bytes25: 'Hex',
  bytes26: 'Hex',
  bytes27: 'Hex',
  bytes28: 'Hex',
  bytes29: 'Hex',
  bytes30: 'Hex',
  bytes31: 'Hex',
  bytes32: 'Hex',
}

/** TypeScript type for a Solidity top-level / library constant. */
function getConstTsType(solType: string): string {
  if (Object.prototype.hasOwnProperty.call(TYPE_MAP, solType)) {
    return TYPE_MAP[solType]!
  }
  if (/^u?int\d+$/i.test(solType)) {
    return 'bigint'
  }
  if (/^bytes(?:[1-9]|[12]\d|3[0-2])$/i.test(solType) || solType === 'bytes') {
    return 'Hex'
  }
  return 'any'
}

/**
 * `4n` -> `4` for top-level consts whose TypeScript type is `number` (uint8, int8, etc.).
 */
function constExprForTsAnnotation(
  solType: string,
  expr: string,
  tsType: string,
): string {
  if (tsType === 'number' && /^\d+n$/.test(expr)) {
    const b = BigInt(expr.slice(0, -1))
    if (
      b >= BigInt(Number.MIN_SAFE_INTEGER) &&
      b <= BigInt(Number.MAX_SAFE_INTEGER)
    ) {
      return b.toString()
    }
  }
  return expr
}

/**
 * Maps common Solidity constant initializers to a TypeScript expression. Throws
 * for unsupported forms so the mapper can be extended with a clear error.
 */
export function convertSolidityConstValueToTs(
  solType: string,
  valueStr: string,
): string {
  const tsType = getConstTsType(solType)
  let s = valueStr.trim()

  if (solType === 'bool' || tsType === 'boolean') {
    if (s === 'true' || s === 'false') {
      return s
    }
    throw new Error(`Unsupported bool constant initializer: ${valueStr}`)
  }

  s = s
    .replace(
      /type\(\s*u?int(\d+)\s*\)\s*\.\s*max/gi,
      (_: string, n: string) => `((1n << ${n}n) - 1n)`,
    )
    .replace(
      /type\(\s*int(\d+)\s*\)\s*\.\s*min/gi,
      (_: string, n: string) => `(-(1n << ${String(Number(n) - 1)}n))`,
    )
    .replace(/type\(\s*int(\d+)\s*\)\s*\.\s*max/gi, (_: string, n: string) => {
      const bits = Number(n) - 1
      return `((1n << ${bits}n) - 1n)`
    })

  s = s.replace(
    /\b(\d+)\s*<<\s*(\d+)\b/g,
    (_: string, a: string, b: string) => `(${a}n << ${b}n)`,
  )

  s = s.replace(/\baddress\s*\(\s*0\s*\)/gi, 'zeroAddress')

  if (tsType === 'Address' && /^0x[0-9a-fA-F]{40}$/i.test(s)) {
    return `'${s.toLowerCase()}' as Address`
  }

  if (tsType === 'Hex' && /^0x[0-9a-fA-F]+$/i.test(s)) {
    return `'${s}' as Hex`
  }

  if (
    /^0x[0-9a-fA-F]+$/i.test(s) &&
    (tsType === 'bigint' || /^(u?int\d*|u?int)$/.test(solType))
  ) {
    s = `${s}n`
  } else if (
    /^\d+$/.test(s) &&
    (tsType === 'bigint' || /^(u?int\d*|u?int)$/.test(solType))
  ) {
    s = `${s}n`
  }

  if (s.includes('type(')) {
    throw new Error(
      `Unsupported constant initializer (unhandled type() or expression): ${valueStr}`,
    )
  }

  s = constExprForTsAnnotation(solType, s, tsType)
  return s
}

function convertType(
  solidityType: string,
  structs: SolidityStruct[] = [],
): string {
  if (solidityType.endsWith('[]')) {
    const baseType = solidityType.slice(0, -2)
    return `${convertType(baseType, structs)}[]`
  }

  // Handle fixed-size arrays
  const fixedArrayMatch = solidityType.match(/\[(\d+)\]$/)
  if (fixedArrayMatch) {
    const baseType = solidityType.slice(0, -fixedArrayMatch[0].length)
    return `${convertType(baseType, structs)}[]`
  }

  // Handle struct types
  const struct = structs.find((s) => s.name === solidityType)
  if (struct) {
    return `{
      ${struct.fields.map((field) => `${field.name}: ${convertType(field.type, structs)}`).join(';\n      ')}
    }`
  }

  // Handle basic types
  return TYPE_MAP[solidityType] || 'any'
}

function getFunctionReturnType(
  functionName: string,
  functions: FunctionDef[],
): string {
  const func = functions.find((f) => f.name === functionName)
  return func?.returnType || 'bytes' // Default to bytes if function not found
}

/**
 * Parses the type of a ternary expression
 * @param expression - The ternary expression to parse
 * @param functions - list of all functions
 * @param params - list of all params used for the function that is being parsed
 * @returns The type of the ternary expression
 */
function parseTernaryType(
  expression: string,
  functions: FunctionDef[],
  params: Parameter[],
): string {
  // split ternary into parts
  const [condition, truePart, falsePart] = expression
    .split(/\?|:/)
    .map((p) => p.trim())
  if (!truePart || !falsePart) throw new Error('Invalid ternary expression')
  // check one of the parts only to find the return type, the other part
  // should return the same type
  // first check if any of the parts returns a parameter
  let paramType = ''
  for (const p of params) {
    if (truePart === p.name) {
      paramType = p.type
      break
    }
    if (falsePart === p.name) {
      paramType = p.type
      break
    }
  }
  // return if found
  if (paramType) return paramType

  // Helper to get type from expression
  const getExprType = (expr: string): string => {
    // Check for new bytes(0)
    if (expr.includes('bytes(0)')) {
      return 'bytes'
    }

    // check for casts
    const castMatch = expr.match(FUNCTION_REGEX)
    if (
      castMatch &&
      (castMatch[0]?.startsWith('uint') ||
        castMatch[0]?.startsWith('int') ||
        castMatch[0]?.startsWith('address'))
    ) {
      return castMatch[1]!
    }

    // Check for function calls
    const funcMatch = expr.match(FUNCTION_REGEX)
    if (funcMatch) {
      if (funcMatch[1]?.startsWith('uint') || funcMatch[1]?.startsWith('int')) {
        // for casts
        return funcMatch[1]
      }
      return getFunctionReturnType(funcMatch[1]!, functions)
    }

    // Check for type casts
    const typeCastMatch = expr.match(FUNCTION_REGEX)
    if (typeCastMatch) {
      return typeCastMatch[1]!
    }

    return 'bytes' // Default fallback
  }

  return getExprType(truePart)
}

function buildConstantNameToTypeMap(
  constants: SolidityConstant[],
): Map<string, string> {
  const m = new Map<string, string>()
  for (const c of constants) {
    if (!m.has(c.name)) m.set(c.name, c.type)
  }
  return m
}

/**
 * Builds a map of local variable name -> Solidity type by scanning the
 * function body for declarations like `uint128 amountWord = ...;`.
 */
function buildLocalVarTypeMap(body: string): Map<string, string> {
  const m = new Map<string, string>()
  // The parser strips all whitespace from the body, so declarations look like
  // `uint128amountWord=...`. Match a leading type followed by the var name.
  const declRegex =
    /(?:^|[;{])(u?int\d*|address|bool|string|bytes\d*)([A-Za-z_]\w*)=/g
  let match: RegExpExecArray | null
  while ((match = declRegex.exec(body)) !== null) {
    const type = match[1]!
    const name = match[2]!
    if (!m.has(name)) m.set(name, type)
  }
  return m
}

/** viem `encodePacked` type tag for a Solidity value type. */
function solidityTypeToEncodePackedType(solType: string): string {
  const t = solType.replace(' memory', '').replace(' calldata', '').trim()
  if (t === 'uint') return 'uint256'
  if (t === 'int') return 'int256'
  if (/^u?int\d+$/i.test(t)) return t
  if (/^bytes(?:[1-9]|[12]\d|3[0-2])$/i.test(t)) return t
  if (t === 'bytes' || t === 'string')
    return t === 'string' ? 'string' : 'bytes'
  if (t === 'address') return 'address'
  if (t === 'bool') return 'bool'
  return t
}

function convertAbiEncodePacked(
  funcDef: FunctionDef,
  allFunctions: FunctionDef[],
  constantTypeByName: Map<string, string>,
): string {
  // Process function body
  let tsBody = funcDef.body

  // Local variables declared in the body (e.g. `uint128 amountWord = ...;`)
  const localVarTypeByName = buildLocalVarTypeMap(funcDef.body)

  // Process each abi.encodePacked call
  while (tsBody.includes('abi.encodePacked')) {
    const encodeMarker = 'abi.encodePacked'
    const markerIdx = tsBody.indexOf(encodeMarker)
    const openParenIdx = markerIdx + encodeMarker.length
    const closeParenIdx = findMatchingParen(tsBody, openParenIdx)

    if (markerIdx !== -1 && closeParenIdx !== -1) {
      const encodedParams = tsBody.slice(openParenIdx + 1, closeParenIdx)
      // Split by commas and handle nested function calls correctly ()
      const args = splitArgsRespectingParentheses(encodedParams)

      const types: string[] = []
      const valueExpressions: string[] = []
      args.forEach((arg) => {
        arg = arg.trim()

        // Skip comments (don't add them to types or values)
        if (arg.startsWith('//')) return
        // Handle function calls
        const functionCallMatch = arg.match(FUNCTION_REGEX)
        if (
          functionCallMatch &&
          arg.indexOf(functionCallMatch?.[0] || '0') === 0 &&
          !arg.startsWith('uint') &&
          !arg.startsWith('int') &&
          !arg.startsWith('bytes') &&
          !arg.startsWith('address')
        ) {
          const [_, funcName] = functionCallMatch
          const returnType = getFunctionReturnType(funcName!, allFunctions)
          types.push(returnType)
          valueExpressions.push(arg)
          return
        }

        // Handle regular type casting
        if (
          functionCallMatch &&
          arg.indexOf(functionCallMatch?.[0] || '0') === 0
        ) {
          const castType = functionCallMatch[1] || ''
          const castValue = functionCallMatch[2] || ''
          types.push(castType)
          valueExpressions.push(`${castType}(${castValue})`)
          return
        }

        // Handle ternary operators
        if (arg.includes('?')) {
          const inferredType = parseTernaryType(
            arg,
            allFunctions,
            funcDef.params,
          )
          types.push(inferredType)
          valueExpressions.push(arg)
          return
        }

        // Handle enum types
        const enumMatch = arg.match(/(\w+)\.(\w+)\.(\w+)/) // Like CalldataLib.SweepType.VALIDATE
        if (enumMatch || arg.match(/sweepType/)) {
          types.push('uint8') // Enums are uint8 in Solidity
          valueExpressions.push(arg)
          return
        }

        // For regular variables
        const argName = arg.trim()
        // Find parameter type from function definition
        const param = funcDef.params.find(
          (p) => p.name === argName || argName.startsWith(`${p.name}[`),
        )
        let paramType: string
        if (param) {
          paramType = param.type
        } else if (constantTypeByName.has(argName)) {
          paramType = solidityTypeToEncodePackedType(
            constantTypeByName.get(argName)!,
          )
        } else if (localVarTypeByName.has(argName)) {
          paramType = solidityTypeToEncodePackedType(
            localVarTypeByName.get(argName)!,
          )
        } else {
          paramType = 'bytes'
        }

        // If this is an indexed access (e.g. a[0]) and the param is an array,
        // encode the element type, not the array type.
        if (param && argName.startsWith(`${param.name}[`)) {
          paramType = paramType.replace(/\[\d*\]$/, '')
        }

        // Clean up type by removing "memory" and other modifiers
        paramType = paramType
          .replace(' memory', '')
          .replace(' calldata', '')
          .trim()
        if (!Object.keys(TYPE_MAP).includes(paramType)) {
          paramType = 'bytes'
        }
        types.push(paramType)
        valueExpressions.push(arg)
      })

      // Replace abi.encodePacked with our utility using balanced-paren positions
      // so we don't overwrite code that follows the closing paren
      const cleanedTypes = types.map((type) =>
        type.startsWith('//') ? type.replace('//', '').trim() : type,
      )
      const replacement = ` encodePacked(['${cleanedTypes.join("', '")}'], [${valueExpressions.join(', ')}])`
      tsBody =
        tsBody.slice(0, markerIdx) +
        replacement +
        tsBody.slice(closeParenIdx + 1)
      continue
    }
    break
  }

  // Reassemble the function
  return `${tsBody.replace(/;$/, ';')}`
}

function findMatchingParen(str: string, openIdx: number): number {
  let depth = 0
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === '(') depth++
    else if (str[i] === ')') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

function splitArgsRespectingParentheses(argsStr: string): string[] {
  const result: string[] = []
  let current = ''
  let depth = 0

  for (let i = 0; i < argsStr.length; i++) {
    const char = argsStr[i]

    if (char === '(' || char === '{' || char === '[') {
      depth++
      current += char
    } else if (char === ')' || char === '}' || char === ']') {
      depth--
      current += char
    } else if (char === ',' && depth === 0) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  if (current) {
    result.push(current)
  }

  return result
}

function convertLib2Enum(libCode: string): string {
  // Regular expression to match library definitions
  const libraryRegex = /library\s+(\w+)\s*{([^}]*)}/g
  // Regular expression to match constant declarations
  const constantRegex =
    /\w+\s+(?:internal\s+)?(?:constant\s+)?(\w+)\s*=\s*([^;]+);/g

  let result = libCode

  // Replace each library with enum
  result = result.replace(libraryRegex, (_, libraryName, libraryContent) => {
    // Extract all constants
    const constants: string[] = []
    let constantMatch

    while ((constantMatch = constantRegex.exec(libraryContent)) !== null) {
      const [_, name, value] = constantMatch
      constants.push(`  ${name} = ${value}`)
    }

    // Create enum
    return `export enum ${libraryName} {\n${constants.join(',\n')}\n}\n\n`
  })

  return result
}

/**
 * Converts Solidity code to TypeScript code
 * @param solidityCode - The Solidity code to convert
 * @returns The TypeScript code
 */
export function convertToTS(
  solidityCode: string,
  debug: boolean = false,
): ConverterOutput {
  const { functions, enums, constants, structs, imports, libraries } =
    parseSolidity(solidityCode)

  let output = ''

  output += `
  import { type Hex, type Address, zeroAddress } from "viem";
  import { encodePacked, uint128, uint8, uint112, uint16, uint256, int8, int16, int32, int64, int128, int256, _SHARES_MASK, _UNSAFE_AMOUNT, generateAmountBitmap, newbytes, bytes, getMorphoCollateral, getMorphoLoanAsset, rightPadZero, encodeCompoundV2SelectorId, encodeSiloV2CollateralMode, encodeAaveV4PmsBatchPermit, encodeMidnightFlashLoan, encodeMidnightFlashLoanTokens, encodeMidnightFlashLoanApprovals } from "../../src/utils.ts";
  `

  // Add enum definitions
  enums.forEach((enumDef) => {
    output += `export enum ${enumDef.name} {\n`
    enumDef.values.forEach((value, index) => {
      output += `  ${value.name} = ${index},\n`
    })
    output += '}\n\n'
  })

  // Add libraries as ts enum
  libraries.forEach((lib) => {
    output += convertLib2Enum(lib.code)
  })

  // Add struct definitions
  structs.forEach((struct) => {
    output += `export interface ${struct.name} {\n`
    struct.fields.forEach((field) => {
      output += `  ${field.name}: ${convertType(field.type, structs)};\n`
    })
    output += '}\n\n'
  })

  const constantTypeByName = buildConstantNameToTypeMap(constants)

  // Solidity `constant` declarations (including `internal` etc. before `constant`)
  constants.forEach((c) => {
    const tsT = getConstTsType(c.type)
    const expr = convertSolidityConstValueToTs(c.type, c.value)
    output += `export const ${c.name}: ${tsT} = ${expr};\n\n`
  })

  // Convert functions
  functions
    .filter((func) => !HARDCODED_FUNCTIONS.includes(func.name))
    .forEach((func) => {
      const funcOutput = convertFunction(
        func,
        structs,
        functions,
        constantTypeByName,
      )
      output += funcOutput
    })

  return {
    output,
    functions,
    enums,
    constants,
    structs,
    imports,
    libraries,
  }
}

/** `address[]` etc. use real `.length`; only `bytes` / Hex use hex half-length. */
function escapeForRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Masks `someArray.length` for dynamic array parameters so the global
 * `bytes` `.length` -> `.length/2 -1` pass does not break for-loops and counts.
 */
function maskArrayParamLengths(
  body: string,
  func: FunctionDef,
): { body: string; unmask: (b: string) => string } {
  const arrayParams = func.params.filter(
    (p) => p.type.includes('[') && p.type.includes(']') && p.name,
  )
  if (arrayParams.length === 0) {
    return { body, unmask: (b) => b }
  }
  const slices: { token: string; literal: string }[] = []
  let b = body
  for (const p of arrayParams) {
    const re = new RegExp(`\\b${escapeForRegex(p.name)}\\.length\\b`, 'g')
    b = b.replace(re, (m) => {
      const t = `__ph_arr_len_${slices.length}__`
      slices.push({ token: t, literal: m })
      return t
    })
  }
  return {
    body: b,
    unmask: (out: string) => {
      let s = out
      for (const { token, literal } of slices) {
        s = s.split(token).join(literal)
      }
      return s
    },
  }
}

function convertFunction(
  func: FunctionDef,
  structs: SolidityStruct[],
  functions: FunctionDef[],
  constantTypeByName: Map<string, string>,
): string {
  let output: string = ''
  // Function signature
  output += `export function ${func.name}(`
  output += func.params
    .map((param) => `${param.name}: ${convertType(param.type, structs)}`)
    .join(', ')
  output += `): ${convertType(func.returnType || 'void', structs)} {\n`

  let body = func.body
  if (body.includes('abi.encodePacked')) {
    // then convert this
    body = convertAbiEncodePacked(func, functions, constantTypeByName)
  }
  const masked = maskArrayParamLengths(body, func)
  body = masked.body
  body = body
    .replaceAll('revert', 'throw new Error')
    .replaceAll('returnnewbytes(0)', 'return `0x0` as Hex;\n')
    .replaceAll('==', '===')
    .replaceAll('!=', '!==')
    .replaceAll('bytesmemory', 'const ')
    .replace(/\bconst (\w+);/g, 'let $1: Hex = "0x";')
    .replace(
      /(^|[;{])(u?int\d+|address|bool|string|bytes\d*|bytes)([A-Za-z_]\w*)=/g,
      '$1let $3=',
    )
    .replace(/for\s*\(\s*uint\d*\s*(\w+)\s*=/g, 'for (let $1 =')
    .replaceAll('return', 'return ')
    .replaceAll(/=\s*(\d+)(?!n\b)/g, '= $1n')
    .replace(
      /type\(u?int(\d+)\)\.max/g,
      (_: string, n: string) => `((1n << ${n}n) - 1n)`,
    )
    .replaceAll('bytes32(0)', "('0x' + '0'.repeat(64)) as Hex")
    .replaceAll('FLUID_MAX_AMOUNT', '((1n << 112n) - 1n)')
    .replaceAll('FLUID_USE_BALANCE', '((1n << 127n) - 1n)')
    .replaceAll('FLUID_ALL', '(-(1n << 127n))')
    .replaceAll('address(0)', 'zeroAddress')
    .replaceAll(/\.length\s*===\s*0n/g, '.length === 0')
    .replaceAll('.length', '.length/2 -1')
  body = masked.unmask(body)

  output += body
  output += '}\n\n'
  return output
}
