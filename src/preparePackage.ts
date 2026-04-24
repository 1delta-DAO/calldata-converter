import * as fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { PACKAGE_DIR, PACKAGE_SRC_DIR, OUTPUT_DIR, LIB_NAME } from './consts'

if (!fs.existsSync(PACKAGE_SRC_DIR)) {
  fs.mkdirSync(PACKAGE_SRC_DIR, { recursive: true })
}

const indexContent = `export * from './${LIB_NAME}.js';\nexport * from './runtime.js';\n`
fs.writeFileSync(path.join(PACKAGE_SRC_DIR, 'index.ts'), indexContent)

// runtime.ts is the canonical file in packages/calldatalib/src; do not copy or overwrite it here.
const runtimePath = path.join(PACKAGE_SRC_DIR, 'runtime.ts')
if (!fs.existsSync(runtimePath)) {
  throw new Error(`Runtime helpers not found at ${runtimePath}`)
}

const generatedLib = path.join(OUTPUT_DIR, `${LIB_NAME}.ts`)
if (!fs.existsSync(generatedLib)) {
  console.error(`Error: ${generatedLib} not found. Run the converter first.`)
  process.exit(1)
}

let content = fs.readFileSync(generatedLib, 'utf8')
// Rewrite dev-relative runtime import to a package-internal sibling import.
content = content.replace(
  /from\s+["']\.\.\/\.\.\/packages\/calldatalib\/src\/runtime(?:\.ts)?["']/g,
  "from './runtime.js'",
)

fs.writeFileSync(
  path.join(PACKAGE_SRC_DIR, `${LIB_NAME}.ts`),
  '// @ts-nocheck\n' + content,
)
console.log(`Copied generated ${LIB_NAME}.ts into ${PACKAGE_SRC_DIR}`)

console.log('Building @1delta/calldatalib package...')
execSync('npm run build', { cwd: PACKAGE_DIR, stdio: 'inherit' })
console.log('Package is ready to be published!')
