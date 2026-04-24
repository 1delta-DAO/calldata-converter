import type {
  ContractDefinition,
  EnumDefinition,
  FunctionDefinition,
  StateVariableDeclaration,
  StructDefinition,
  VariableDeclaration,
  FileLevelConstant,
} from '@solidity-parser/parser/dist/src/ast-types'

/**
 * A resolved Solidity source file together with its parsed AST. Each symbol we
 * lift into the IR carries a reference back to its source file so emitters
 * know where identifiers came from.
 */
export interface ResolvedFile {
  path: string
  source: string
}

export interface ResolvedSource extends ResolvedFile {
  /** absolute canonical path used as the identity key in the project graph */
  canonicalPath: string
}

/**
 * A caller-supplied import resolver. Given an `importPath` written in a
 * Solidity file at `fromFile`, return the source file it should resolve to.
 * The default resolver (see `src/resolver.ts`) treats paths relative to the
 * importing file's directory.
 */
export type ImportResolver = (
  importPath: string,
  fromFile: string,
) => Promise<ResolvedFile>

/** A single top-level library-as-enum candidate: a library whose body is just `uint constant NAME = VALUE;`. */
export interface LibraryAsEnumCandidate {
  name: string
  sourceFile: string
  members: { name: string; value: string }[]
  raw: ContractDefinition
}

/** A Solidity `constant` declaration reachable from the entry. */
export interface ConstantIr {
  name: string
  solidityType: string
  /** Raw AST node for the initializer; emitters translate it. */
  valueAst: StateVariableDeclaration['initialValue'] | FileLevelConstant['initialValue']
  sourceFile: string
  /** If declared inside a contract/library, the containing contract name. */
  container?: string
}

export interface FunctionIr {
  name: string
  params: ParamIr[]
  returnType: string | null
  /**
   * Return parameters preserved for named-return support. Solidity allows
   * `function foo(...) returns (uint128 am) { am = 1; }` without an explicit
   * `return` statement; we need to know `am`'s name/type to emit it.
   */
  returnParams: ParamIr[]
  body: FunctionDefinition['body']
  visibility: FunctionDefinition['visibility']
  stateMutability: FunctionDefinition['stateMutability']
  sourceFile: string
  /** If declared inside a contract/library, the containing contract name. */
  container?: string
  raw: FunctionDefinition
}

export interface ParamIr {
  name: string
  /** Canonical Solidity type string (no memory/calldata/storage). */
  type: string
  storage?: string | null
  raw: VariableDeclaration
}

export interface EnumIr {
  name: string
  members: string[]
  sourceFile: string
  raw: EnumDefinition
}

export interface StructIr {
  name: string
  fields: { name: string; type: string }[]
  sourceFile: string
  raw: StructDefinition
}

/**
 * Project-wide IR. Symbols are organized as `Record<fileOrContainer,
 * Record<name, Symbol>>` so plugins and emitters can look up by location
 * without scanning lists (see user rule: prefer nested Record maps).
 */
export interface ProjectIr {
  entry: string
  /** Every reachable file, keyed by canonical path. */
  files: Record<string, ResolvedSource>
  /** Import edges for debugging / topo sort. */
  imports: Record<string, string[]>
  /** File -> contract name -> contract definition. */
  contracts: Record<string, Record<string, ContractDefinition>>

  /** Flat symbol indices; names are assumed globally unique for CalldataLib-style input. */
  enums: Record<string, EnumIr>
  structs: Record<string, StructIr>
  constants: Record<string, ConstantIr>
  functions: Record<string, FunctionIr>

  /** Libraries that only declare value `constant`s; treated as TS enums. */
  libraryEnums: Record<string, LibraryAsEnumCandidate>

  /** Entry file contract - the thing being "converted" (e.g. `library CalldataLib`). */
  entryContract?: ContractDefinition
}

export interface RuntimeImport {
  from: string
  named: string[]
  typeOnly?: boolean
}

export interface RuntimeConfig {
  imports: RuntimeImport[]
}

export interface ValidateConfig {
  /** Where .sol sources have been materialized for forge. */
  inputDir: string
  /** Where .ts + test-inputs.json + forge script should be written. */
  outputDir: string
  /** Path to the generated TS file relative to cwd (used for the vitest test). */
  tsFilePath: string
  /** Import specifier used inside the vitest test to reference the generated lib. */
  tsImportSpecifier: string
  forgeBin?: string
  /** If true, `vitest run <testFile>` is executed automatically. Default: false. */
  runVitest?: boolean
  /** Reserved for future use (currently unused). */
  testCount?: number
  /** If provided, the forge script uses this purified Solidity library instead of the entry. */
  purifiedSolidityPath?: string
  /** File basename (no extension) used by forge imports / test generation. */
  libraryName: string
  /**
   * Names/patterns that are legitimately emitted into the TS output but
   * should be omitted from the forge script + vitest (e.g. private helpers
   * that the forge script can't call). Applied on top of the normal
   * function filter.
   */
  skipInTests?: (string | RegExp)[]
}

export interface SolToTsPlugin {
  name: string
  onParse?(ir: ProjectIr): ProjectIr | void
  /** Called once before any emission. Mutations to emit-context config (e.g. skip lists) land here. */
  preEmit?(ir: ProjectIr, ctx: EmitCtx): void
  /** Return a string to replace the default emission, or void to fall through. */
  onEmitFunction?(fn: FunctionIr, ctx: EmitCtx): string | void
  onEmitConstant?(c: ConstantIr, ctx: EmitCtx): string | void
  /** Final hook: transform the full generated source. */
  postEmit?(tsSource: string, ir: ProjectIr, ctx: EmitCtx): string
}

export interface EmitCtx {
  ir: ProjectIr
  runtime: RuntimeConfig
  skipFunctions: (string | RegExp)[]
  typeOverrides: Record<string, string>
  /** Set of function names treated as "library-style hardcoded helpers" (by plugins). */
  helperFunctions: Set<string>
  /** Error log: emitters push non-fatal issues here. */
  warnings: string[]
}

export interface ConvertOptions {
  /** Path to the entry Solidity file. */
  entry: string
  /** Optional override for import resolution. */
  resolve?: ImportResolver
  runtime: RuntimeConfig
  skipFunctions?: (string | RegExp)[]
  typeOverrides?: Record<string, string>
  plugins?: SolToTsPlugin[]
  /** Opt-in forge + vitest validation. Disabled by default. */
  validate?: ValidateConfig | false
  /** Run prettier on emitted source. */
  format?: boolean
}

export interface ConvertResult {
  output: string
  ir: ProjectIr
  warnings: string[]
  /** Functions that actually made it into the output (post skip/runtime filter). */
  emittedFunctions: FunctionIr[]
  validation?: ValidationReport
}

export interface ValidationReport {
  forgeExpected: { name: string; hex: string }[]
  testFilePath: string
  testInputsPath: string
  forgeScriptPath: string
  vitestPassed?: boolean
}
