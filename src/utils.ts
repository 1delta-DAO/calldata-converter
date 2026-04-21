import { type Hex, encodePacked as abiEncodePacked, type Address } from 'viem'

export const _NATIVE_FLAG = 1n << 127n
export const _SHARES_MASK = 1n << 126n
export const _UNSAFE_AMOUNT = 1n << 125n

export function shiftLeft(value: bigint | number, bits: number): bigint {
  return BigInt(value) << BigInt(bits)
}

export function shiftRight(value: bigint | number, bits: number): bigint {
  return BigInt(value) >> BigInt(bits)
}

export function uint8(value: number | bigint): number {
  return Number(BigInt(value) & 0xffn)
}

export function uint16(value: number | bigint): number {
  return Number(BigInt(value) & 0xffffn)
}

export function uint32(value: number | bigint): number {
  return Number(BigInt(value) & 0xffffffffn)
}

export function uint64(value: number | bigint): bigint {
  return BigInt(value) & ((1n << 64n) - 1n)
}

export function uint112(value: number | bigint): bigint {
  return BigInt(value) & ((1n << 112n) - 1n)
}

export function uint128(value: number | bigint): bigint {
  return BigInt(value) & ((1n << 128n) - 1n)
}

export function uint256(value: number | bigint): bigint {
  return BigInt(value) & ((1n << 256n) - 1n)
}

export function encodePacked(types: string[], values: any[]): Hex {
  if (types.length !== values.length) {
    throw new Error('Types and values arrays must have the same length')
  }
  return abiEncodePacked(types, values)
}

export function generateAmountBitmap(
  amount: bigint,
  useShares: boolean,
  native: boolean,
): bigint {
  let am = amount
  if (native) am = uint128((am & ~BigInt(_NATIVE_FLAG)) | _NATIVE_FLAG)
  if (useShares) am = uint128((am & ~BigInt(_SHARES_MASK)) | _SHARES_MASK)
  return am
}

export function getMorphoCollateral(market: Hex): Address {
  const slice = market.slice(42, 82)
  return `0x${slice}` as Address
}

export function getMorphoLoanAsset(market: Hex): Address {
  const slice = market.slice(2, 42)
  return `0x${slice}` as Address
}

export function rightPadZero(address: Address): Hex {
  return (address.toLowerCase() + '0'.repeat(24)) as Hex
}

export function newbytes(length: number): Hex {
  return ('0x' + '0'.repeat(length * 2)) as Hex
}

export function bytes(value: Hex): Hex {
  return value
}

export function encodeCompoundV2SelectorId(
  amount: bigint,
  selectorId: number,
): bigint {
  return uint128(amount) | (uint128(selectorId) << 120n)
}

export function encodeSiloV2CollateralMode(
  amount: bigint,
  mode: number,
): bigint {
  return uint128(amount) | (uint128(mode) << 120n)
}

export function encodeAaveV4PmsBatchPermit(
  spoke: Address,
  pms: Address[],
  approvals: boolean[],
  nonce: bigint,
  deadlinePlusOne: number,
  r: Hex,
  vs: Hex,
): Hex {
  if (pms.length !== approvals.length) throw new Error('CL: length mismatch')
  if (pms.length === 0 || pms.length >= 256) throw new Error('CL: invalid count')
  let updates: Hex = '0x'
  for (let i = 0; i < pms.length; i++) {
    updates = encodePacked(['bytes', 'address', 'uint8'], [updates, pms[i]!, uint8(approvals[i]! ? 1 : 0)])
  }
  const data = encodePacked(
    ['uint8', 'bytes', 'uint256', 'uint32', 'bytes32', 'bytes32'],
    [uint8(pms.length), updates, nonce, deadlinePlusOne, r, vs],
  )
  return encodePacked(
    ['uint8', 'uint8', 'address', 'uint16', 'bytes'],
    [uint8(0x50), uint8(6), spoke, uint16(data.length / 2 - 1), data],
  )
}
