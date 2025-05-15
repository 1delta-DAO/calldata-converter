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
exports.newbytes = newbytes;
exports.bytes = bytes;
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
        throw new Error("Types and values arrays must have the same length");
    }
    return (0, viem_1.encodePacked)(types, values);
}
function generateAmountBitmap(amount, useShares, unsafe, native) {
    let am = amount;
    if (useShares)
        am = uint128((am & ~BigInt(exports._SHARES_MASK)) | exports._SHARES_MASK);
    if (unsafe)
        am = uint128((am & ~BigInt(exports._UNSAFE_AMOUNT)) | exports._UNSAFE_AMOUNT);
    if (native)
        am = uint128((am & ~BigInt(exports._NATIVE_FLAG)) | exports._NATIVE_FLAG);
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
function newbytes(length) {
    return ("0x" + "0".repeat(length * 2));
}
function bytes(value) {
    return value;
}
