# @1delta/calldatalib

Generated TypeScript functions for 1delta smart contracts calldata encoding.

## Installation

```bash
npm install @1delta/calldatalib
# or
yarn add @1delta/calldatalib
# or
pnpm add @1delta/calldatalib
```

This package requires `viem` as a peer dependency, so make sure to install it as
well:

```bash
npm install viem
# or
yarn add viem
# or
pnpm add viem
```

## Usage

```typescript
import { encodeExternalCall } from '@1delta/calldatalib'
import { parseEther } from 'viem'

// Example usage
const calldata = encodeExternalCall(
  '0x1234567890123456789012345678901234567890',
  parseEther('0.1'),
  '0x1234',
)
```
