import { encodePacked as abiEncodePacked } from 'viem'
export const _NATIVE_FLAG = 1n << 127n
export const _SHARES_MASK = 1n << 126n
export const _UNSAFE_AMOUNT = 1n << 125n
export function shiftLeft(value, bits) {
  return BigInt(value) << BigInt(bits)
}
export function shiftRight(value, bits) {
  return BigInt(value) >> BigInt(bits)
}
export function uint8(value) {
  return Number(BigInt(value) & 0xffn)
}
export function uint16(value) {
  return Number(BigInt(value) & 0xffffn)
}
export function uint32(value) {
  return Number(BigInt(value) & 0xffffffffn)
}
export function uint64(value) {
  return BigInt(value) & ((1n << 64n) - 1n)
}
export function uint112(value) {
  return BigInt(value) & ((1n << 112n) - 1n)
}
export function uint128(value) {
  return BigInt(value) & ((1n << 128n) - 1n)
}
export function uint256(value) {
  return BigInt(value) & ((1n << 256n) - 1n)
}
export function encodePacked(types, values) {
  if (types.length !== values.length) {
    throw new Error('Types and values arrays must have the same length')
  }
  return abiEncodePacked(types, values)
}
export function generateAmountBitmap(amount, useShares, native) {
  let am = amount
  if (native) am = uint128((am & ~BigInt(_NATIVE_FLAG)) | _NATIVE_FLAG)
  if (useShares) am = uint128((am & ~BigInt(_SHARES_MASK)) | _SHARES_MASK)
  return am
}
export function getMorphoCollateral(market) {
  const slice = market.slice(42, 82)
  return `0x${slice}`
}
export function getMorphoLoanAsset(market) {
  const slice = market.slice(2, 42)
  return `0x${slice}`
}
export function rightPadZero(address) {
  return address.toLowerCase() + '0'.repeat(24)
}
export function newbytes(length) {
  return '0x' + '0'.repeat(length * 2)
}
export function bytes(value) {
  return value
}
export function encodeCompoundV2SelectorId(amount, selectorId) {
  return uint128(amount) | (uint128(selectorId) << 120n)
}
export function encodeSiloV2CollateralMode(amount, mode) {
  return uint128(amount) | (uint128(mode) << 120n)
}
export function encodeAaveV4PmsBatchPermit(
  spoke,
  pms,
  approvals,
  nonce,
  deadlinePlusOne,
  r,
  vs,
) {
  if (pms.length !== approvals.length) throw new Error('CL: length mismatch')
  if (pms.length === 0 || pms.length >= 256)
    throw new Error('CL: invalid count')
  let updates = '0x'
  for (let i = 0; i < pms.length; i++) {
    updates = encodePacked(
      ['bytes', 'address', 'uint8'],
      [updates, pms[i], uint8(approvals[i] ? 1 : 0)],
    )
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
