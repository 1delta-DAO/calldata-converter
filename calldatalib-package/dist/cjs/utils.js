"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._UNSAFE_AMOUNT = exports._SHARES_MASK = exports._NATIVE_FLAG = void 0;
exports.shiftLeft = shiftLeft;
exports.shiftRight = shiftRight;
exports.uint8 = uint8;
exports.uint16 = uint16;
exports.uint32 = uint32;
exports.uint64 = uint64;
exports.uint112 = uint112;
exports.uint128 = uint128;
exports.uint256 = uint256;
exports.encodePacked = encodePacked;
exports.generateAmountBitmap = generateAmountBitmap;
exports.getMorphoCollateral = getMorphoCollateral;
exports.getMorphoLoanAsset = getMorphoLoanAsset;
exports.rightPadZero = rightPadZero;
exports.newbytes = newbytes;
exports.bytes = bytes;
exports.encodeCompoundV2SelectorId = encodeCompoundV2SelectorId;
exports.encodeSiloV2CollateralMode = encodeSiloV2CollateralMode;
exports.encodeAaveV4PmsBatchPermit = encodeAaveV4PmsBatchPermit;
const viem_1 = require("viem");
exports._NATIVE_FLAG = 1n << 127n;
exports._SHARES_MASK = 1n << 126n;
exports._UNSAFE_AMOUNT = 1n << 125n;
function shiftLeft(value, bits) {
    return BigInt(value) << BigInt(bits);
}
function shiftRight(value, bits) {
    return BigInt(value) >> BigInt(bits);
}
function uint8(value) {
    return Number(BigInt(value) & 0xffn);
}
function uint16(value) {
    return Number(BigInt(value) & 0xffffn);
}
function uint32(value) {
    return Number(BigInt(value) & 0xffffffffn);
}
function uint64(value) {
    return BigInt(value) & ((1n << 64n) - 1n);
}
function uint112(value) {
    return BigInt(value) & ((1n << 112n) - 1n);
}
function uint128(value) {
    return BigInt(value) & ((1n << 128n) - 1n);
}
function uint256(value) {
    return BigInt(value) & ((1n << 256n) - 1n);
}
function encodePacked(types, values) {
    if (types.length !== values.length) {
        throw new Error('Types and values arrays must have the same length');
    }
    return (0, viem_1.encodePacked)(types, values);
}
function generateAmountBitmap(amount, useShares, native) {
    let am = amount;
    if (native)
        am = uint128((am & ~BigInt(exports._NATIVE_FLAG)) | exports._NATIVE_FLAG);
    if (useShares)
        am = uint128((am & ~BigInt(exports._SHARES_MASK)) | exports._SHARES_MASK);
    return am;
}
function getMorphoCollateral(market) {
    const slice = market.slice(42, 82);
    return `0x${slice}`;
}
function getMorphoLoanAsset(market) {
    const slice = market.slice(2, 42);
    return `0x${slice}`;
}
function rightPadZero(address) {
    return (address.toLowerCase() + '0'.repeat(24));
}
function newbytes(length) {
    return ('0x' + '0'.repeat(length * 2));
}
function bytes(value) {
    return value;
}
function encodeCompoundV2SelectorId(amount, selectorId) {
    return uint128(amount) | (uint128(selectorId) << 120n);
}
function encodeSiloV2CollateralMode(amount, mode) {
    return uint128(amount) | (uint128(mode) << 120n);
}
function encodeAaveV4PmsBatchPermit(spoke, pms, approvals, nonce, deadlinePlusOne, r, vs) {
    if (pms.length !== approvals.length)
        throw new Error('CL: length mismatch');
    if (pms.length === 0 || pms.length >= 256)
        throw new Error('CL: invalid count');
    let updates = '0x';
    for (let i = 0; i < pms.length; i++) {
        updates = encodePacked(['bytes', 'address', 'uint8'], [updates, pms[i], uint8(approvals[i] ? 1 : 0)]);
    }
    const data = encodePacked(['uint8', 'bytes', 'uint256', 'uint32', 'bytes32', 'bytes32'], [uint8(pms.length), updates, nonce, deadlinePlusOne, r, vs]);
    return encodePacked(['uint8', 'uint8', 'address', 'uint16', 'bytes'], [uint8(0x50), uint8(6), spoke, uint16(data.length / 2 - 1), data]);
}
