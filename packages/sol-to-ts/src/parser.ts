import { parse } from '@solidity-parser/parser'
import type {
  ContractDefinition,
  SourceUnit,
  TypeName,
  ImportDirective,
  StateVariableDeclaration,
  FileLevelConstant,
  FunctionDefinition,
  VariableDeclaration,
} from '@solidity-parser/parser/dist/src/ast-types'
import type {
  ConstantIr,
  EnumIr,
  FunctionIr,
  ImportResolver,
  LibraryAsEnumCandidate,
  ParamIr,
  ProjectIr,
  ResolvedFile,
  ResolvedSource,
  StructIr,
} from './types.ts'
import { solTypeFromAst } from './solTypes.ts'

function canonical(p: string): string {
  // Solidity parser gets raw paths; caller passes absolute paths. Keep as-is.
  return p
}

function parseSource(source: string, filePath: string): SourceUnit {
  try {
    return parse(source, {
      loc: false,
      range: false,
      tolerant: false,
    }) as SourceUnit
  } catch (err) {
    throw new Error(
      `sol-to-ts: failed to parse '${filePath}': ${(err as Error).message}`,
    )
  }
}

/**
 * Walks the import graph starting at `entry` and collects every reachable file's AST.
 * The resolver is responsible for mapping import strings to actual sources.
 */
export async function loadProject(
  entryFile: string,
  entrySource: string,
  resolve: ImportResolver,
): Promise<{
  files: Record<string, ResolvedSource>
  units: Record<string, SourceUnit>
  imports: Record<string, string[]>
}> {
  const files: Record<string, ResolvedSource> = {}
  const units: Record<string, SourceUnit> = {}
  const imports: Record<string, string[]> = {}

  async function visit(filePath: string, source: string): Promise<void> {
    const key = canonical(filePath)
    if (files[key]) return
    files[key] = { path: filePath, source, canonicalPath: key }
    const unit = parseSource(source, filePath)
    units[key] = unit

    const importPaths: string[] = []
    for (const child of unit.children) {
      if ((child as ImportDirective).type === 'ImportDirective') {
        const imp = child as ImportDirective
        const resolved = await resolve(imp.path, filePath)
        importPaths.push(canonical(resolved.path))
        await visit(resolved.path, resolved.source)
      }
    }
    imports[key] = importPaths
  }

  await visit(entryFile, entrySource)
  return { files, units, imports }
}

function extractParams(vars: VariableDeclaration[]): ParamIr[] {
  return vars
    .filter((v) => v.typeName != null)
    .map((v) => ({
      name: v.name ?? '',
      type: solTypeFromAst(v.typeName as TypeName),
      storage: v.storageLocation ?? null,
      raw: v,
    }))
}

function getReturnType(fn: FunctionDefinition): string | null {
  const rp = fn.returnParameters
  if (!rp || rp.length === 0) return null
  if (rp.length > 1) {
    // Tuple returns are not supported for our subset.
    return null
  }
  const r = rp[0]!
  if (!r.typeName) return null
  return solTypeFromAst(r.typeName)
}

/**
 * A library is "enum-like" when it declares only value-typed `internal constant`s
 * with simple literal initializers. CalldataLib's `DeltaEnums.sol` libraries match this.
 */
function isLibraryAsEnum(
  contract: ContractDefinition,
): LibraryAsEnumCandidate | null {
  if (contract.kind !== 'library') return null
  const members: { name: string; value: string }[] = []
  for (const sub of contract.subNodes) {
    if ((sub as StateVariableDeclaration).type !== 'StateVariableDeclaration') {
      return null // any non-state-var disqualifies
    }
    const sv = sub as StateVariableDeclaration
    for (const v of sv.variables) {
      if (!v.isDeclaredConst) return null
      if (!v.typeName) return null
      // Only elementary (uint/int) type libraries make good enums.
      const t = solTypeFromAst(v.typeName)
      if (!/^u?int\d*$/.test(t)) return null
      const init = sv.initialValue
      if (!init) return null
      if (init.type === 'NumberLiteral') {
        members.push({ name: v.name ?? '', value: init.number })
      } else if (init.type === 'HexNumber') {
        members.push({ name: v.name ?? '', value: init.value })
      } else {
        return null // anything fancier (expressions, type(uintN).max) disqualifies
      }
    }
  }
  if (members.length === 0) return null
  return {
    name: contract.name,
    sourceFile: '',
    members,
    raw: contract,
  }
}

function collectFromFile(
  filePath: string,
  unit: SourceUnit,
  acc: {
    enums: Record<string, EnumIr>
    structs: Record<string, StructIr>
    constants: Record<string, ConstantIr>
    functions: Record<string, FunctionIr>
    libraryEnums: Record<string, LibraryAsEnumCandidate>
    contracts: Record<string, Record<string, ContractDefinition>>
  },
  entryContract: { found: ContractDefinition | null; entry: string },
): void {
  const byFile = (acc.contracts[filePath] ??= {})

  for (const child of unit.children) {
    switch (child.type) {
      case 'EnumDefinition': {
        const e = child
        acc.enums[e.name] = {
          name: e.name,
          members: e.members.map((m) => m.name),
          sourceFile: filePath,
          raw: e,
        }
        break
      }
      case 'StructDefinition': {
        const s = child
        acc.structs[s.name] = {
          name: s.name,
          fields: s.members.map((m) => ({
            name: m.name ?? '',
            type: m.typeName ? solTypeFromAst(m.typeName) : 'any',
          })),
          sourceFile: filePath,
          raw: s,
        }
        break
      }
      case 'FileLevelConstant': {
        const fc = child as FileLevelConstant
        acc.constants[fc.name] = {
          name: fc.name,
          solidityType: solTypeFromAst(fc.typeName),
          valueAst: fc.initialValue,
          sourceFile: filePath,
        }
        break
      }
      case 'ContractDefinition': {
        const c = child as ContractDefinition
        byFile[c.name] = c
        if (filePath === entryContract.entry && c.kind === 'library') {
          entryContract.found = c
        }
        const asEnum = isLibraryAsEnum(c)
        if (asEnum) {
          asEnum.sourceFile = filePath
          acc.libraryEnums[c.name] = asEnum
          // Still collect its enum-members so emitters can look them up as library constants.
          for (const m of asEnum.members) {
            acc.constants[`${c.name}.${m.name}`] = {
              name: m.name,
              solidityType: 'uint256',
              valueAst: {
                type: 'NumberLiteral',
                number: m.value,
                subdenomination: null,
              } as any,
              sourceFile: filePath,
              container: c.name,
            }
          }
          break
        }
        // Otherwise walk its subNodes for functions, constants, enums, structs
        for (const sub of c.subNodes) {
          switch (sub.type) {
            case 'EnumDefinition': {
              const e = sub
              acc.enums[e.name] = {
                name: e.name,
                members: e.members.map((m) => m.name),
                sourceFile: filePath,
                raw: e,
              }
              break
            }
            case 'StructDefinition': {
              const s = sub
              acc.structs[s.name] = {
                name: s.name,
                fields: s.members.map((m) => ({
                  name: m.name ?? '',
                  type: m.typeName ? solTypeFromAst(m.typeName) : 'any',
                })),
                sourceFile: filePath,
                raw: s,
              }
              break
            }
            case 'StateVariableDeclaration': {
              const sv = sub as StateVariableDeclaration
              for (const v of sv.variables) {
                if (!v.isDeclaredConst || !v.typeName || !v.name) continue
                acc.constants[v.name] = {
                  name: v.name,
                  solidityType: solTypeFromAst(v.typeName),
                  valueAst: sv.initialValue,
                  sourceFile: filePath,
                  container: c.name,
                }
              }
              break
            }
            case 'FunctionDefinition': {
              const fn = sub as FunctionDefinition
              if (
                !fn.name ||
                fn.isConstructor ||
                fn.isFallback ||
                fn.isReceiveEther
              )
                break
              acc.functions[fn.name] = {
                name: fn.name,
                params: extractParams(fn.parameters),
                returnType: getReturnType(fn),
                returnParams: fn.returnParameters
                  ? extractParams(fn.returnParameters as VariableDeclaration[])
                  : [],
                body: fn.body,
                visibility: fn.visibility,
                stateMutability: fn.stateMutability,
                sourceFile: filePath,
                container: c.name,
                raw: fn,
              }
              break
            }
            default:
              // Ignore events/errors/modifiers - not used by CalldataLib subset.
              break
          }
        }
        break
      }
      default:
        break
    }
  }
}

/**
 * Build the project IR from the loaded file AST map. `entry` must be one of the
 * canonical paths in `units`.
 */
export function buildProjectIr(
  entry: string,
  files: Record<string, ResolvedSource>,
  units: Record<string, SourceUnit>,
  imports: Record<string, string[]>,
): ProjectIr {
  const acc = {
    enums: {} as Record<string, EnumIr>,
    structs: {} as Record<string, StructIr>,
    constants: {} as Record<string, ConstantIr>,
    functions: {} as Record<string, FunctionIr>,
    libraryEnums: {} as Record<string, LibraryAsEnumCandidate>,
    contracts: {} as Record<string, Record<string, ContractDefinition>>,
  }
  const entryHolder: { found: ContractDefinition | null; entry: string } = {
    found: null,
    entry,
  }
  // Collect from entry first so entry's names win on collision.
  const order = [entry, ...Object.keys(units).filter((k) => k !== entry)]
  for (const filePath of order) {
    const unit = units[filePath]
    if (!unit) continue
    collectFromFile(filePath, unit, acc, entryHolder)
  }
  return {
    entry,
    files,
    imports,
    contracts: acc.contracts,
    enums: acc.enums,
    structs: acc.structs,
    constants: acc.constants,
    functions: acc.functions,
    libraryEnums: acc.libraryEnums,
    entryContract: entryHolder.found ?? undefined,
  }
}
