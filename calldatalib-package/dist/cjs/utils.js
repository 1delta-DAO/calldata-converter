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
exports.int8 = int8;
exports.int16 = int16;
exports.int32 = int32;
exports.int64 = int64;
exports.int128 = int128;
exports.int256 = int256;
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
exports.encodeMidnightFlashLoanTokens = encodeMidnightFlashLoanTokens;
exports.encodeMidnightFlashLoanApprovals = encodeMidnightFlashLoanApprovals;
exports.encodeMidnightFlashLoan = encodeMidnightFlashLoan;
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
function toSigned(value, bits) {
    const b = BigInt(bits);
    const mod = 1n << b;
    const masked = BigInt(value) & (mod - 1n);
    const signBit = 1n << (b - 1n);
    return masked >= signBit ? masked - mod : masked;
}
function int8(value) {
    return Number(toSigned(value, 8));
}
function int16(value) {
    return Number(toSigned(value, 16));
}
function int32(value) {
    return Number(toSigned(value, 32));
}
function int64(value) {
    return toSigned(value, 64);
}
function int128(value) {
    return toSigned(value, 128);
}
function int256(value) {
    return toSigned(value, 256);
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
// --- Midnight flash-loan encoders --------------------------------------------
// Hand-written because the regex transpiler cannot express overloads, dynamic
// array locals (`new address[](n)`) or `for`-loop accumulators. Enum values are
// inlined to mirror the Solidity source (ComposerCommands / FlashLoanIds /
// TransferIds), matching the encodeAaveV4PmsBatchPermit precedent above.
// ComposerCommands.TRANSFERS
const _COMMAND_TRANSFERS = 0x40;
// TransferIds.APPROVE
const _TRANSFER_ID_APPROVE = 5;
// ComposerCommands.FLASH_LOAN
const _COMMAND_FLASH_LOAN = 0x60;
// FlashLoanIds.MORPHO_MIDNIGHT
const _FLASH_LOAN_ID_MORPHO_MIDNIGHT = 4;
// CalldataLib.encodeApprove
function encodeApprove(asset, target) {
    return encodePacked(['uint8', 'uint8', 'address', 'address'], [uint8(_COMMAND_TRANSFERS), uint8(_TRANSFER_ID_APPROVE), asset, target]);
}
// CalldataLib.encodeUint8AndBytes
function encodeUint8AndBytes(poolId, data) {
    return encodePacked(['uint8', 'bytes'], [uint8(poolId), data]);
}
function encodeMidnightFlashLoanTokens(tokens, amounts) {
    let result = '0x';
    for (let i = 0; i < tokens.length; i++) {
        result = encodePacked(['bytes', 'address', 'uint128'], [result, tokens[i], uint128(amounts[i])]);
    }
    return result;
}
function encodeMidnightFlashLoanApprovals(pool, tokens) {
    let result = '0x';
    for (let i = 0; i < tokens.length; i++) {
        result = encodePacked(['bytes', 'bytes'], [result, encodeApprove(tokens[i], pool)]);
    }
    return result;
}
function encodeMidnightFlashLoan(a, b, c, poolId, data) {
    // Single (asset, amount) form wraps into length-1 arrays and delegates.
    if (!Array.isArray(b)) {
        return encodeMidnightFlashLoan(c, [a], [b], poolId, data);
    }
    const pool = a;
    const tokens = b;
    const amounts = c;
    return encodePacked(['bytes', 'uint8', 'uint8', 'address', 'uint8', 'bytes', 'uint16', 'bytes'], [
        encodeMidnightFlashLoanApprovals(pool, tokens),
        uint8(_COMMAND_FLASH_LOAN),
        uint8(_FLASH_LOAN_ID_MORPHO_MIDNIGHT),
        pool,
        uint8(tokens.length),
        encodeMidnightFlashLoanTokens(tokens, amounts),
        // Solidity: uint16(data.length + 1); data.length is the byte length,
        // which for a Hex string is `data.length / 2 - 1`.
        uint16(data.length / 2 - 1 + 1),
        encodeUint8AndBytes(poolId, data),
    ]);
}
