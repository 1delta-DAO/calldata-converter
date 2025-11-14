"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexForkMappings = exports.DexTypeMappings = exports.SiloV2CollateralType = exports.CompoundV2Selector = exports.BridgeIds = exports.ComposerCommands = exports.Gen2025ActionIds = exports.ERC4626Ids = exports.FlashLoanIds = exports.LenderOps = exports.LenderIds = exports.PermitIds = exports.TransferIds = exports.WrapOperation = exports.DodoSelector = exports.DexPayConfig = exports.SweepType = void 0;
exports.encodeExternalCall = encodeExternalCall;
exports.encodeTryExternalCall = encodeTryExternalCall;
exports.encodeExternalCallWithReplace = encodeExternalCallWithReplace;
exports.encodeTryExternalCallWithReplace = encodeTryExternalCallWithReplace;
exports.encodeStargateV2Bridge = encodeStargateV2Bridge;
exports.encodePermit = encodePermit;
exports.encodeStargateV2BridgePartial = encodeStargateV2BridgePartial;
exports.encodeStargateV2BridgeSimpleTaxi = encodeStargateV2BridgeSimpleTaxi;
exports.encodeStargateV2BridgeSimpleBus = encodeStargateV2BridgeSimpleBus;
exports.encodeAcrossBridgeToken = encodeAcrossBridgeToken;
exports.encodeAcrossBridgeNative = encodeAcrossBridgeNative;
exports.encodeAcrossHeader = encodeAcrossHeader;
exports.encodeAcrossParams = encodeAcrossParams;
exports.encodeSquidRouterCall = encodeSquidRouterCall;
exports.encodeSquidRouterCallPartial = encodeSquidRouterCallPartial;
exports.encodeGasZipBridge = encodeGasZipBridge;
exports.encodeGasZipEvmBridge = encodeGasZipEvmBridge;
exports.encodePermit2TransferFrom = encodePermit2TransferFrom;
exports.encodeNextGenDexUnlock = encodeNextGenDexUnlock;
exports.encodeBalancerV3FlashLoan = encodeBalancerV3FlashLoan;
exports.encodeBalancerV3FlashLoanData = encodeBalancerV3FlashLoanData;
exports.encodeUniswapV4FlashLoan = encodeUniswapV4FlashLoan;
exports.encodeUniswapV4FlashLoanData = encodeUniswapV4FlashLoanData;
exports.encodeBalancerV3Take = encodeBalancerV3Take;
exports.encodeUniswapV4Sync = encodeUniswapV4Sync;
exports.encodeUniswapV4Take = encodeUniswapV4Take;
exports.swapHead = swapHead;
exports.attachBranch = attachBranch;
exports.encodeUniswapV2StyleSwap = encodeUniswapV2StyleSwap;
exports.encodeUniswapV4StyleSwap = encodeUniswapV4StyleSwap;
exports.encodeBalancerV2StyleSwap = encodeBalancerV2StyleSwap;
exports.encodeLbStyleSwap = encodeLbStyleSwap;
exports.encodeSyncSwapStyleSwap = encodeSyncSwapStyleSwap;
exports.encodeUniswapV3StyleSwap = encodeUniswapV3StyleSwap;
exports.encodeIzumiStyleSwap = encodeIzumiStyleSwap;
exports.encodeBalancerV3StyleSwap = encodeBalancerV3StyleSwap;
exports.encodeDodoStyleSwap = encodeDodoStyleSwap;
exports.encodeWooStyleSwap = encodeWooStyleSwap;
exports.encodeGmxStyleSwap = encodeGmxStyleSwap;
exports.encodeKtxStyleSwap = encodeKtxStyleSwap;
exports.encodeCurveStyleSwap = encodeCurveStyleSwap;
exports.encodeCurveNGStyleSwap = encodeCurveNGStyleSwap;
exports.encodeWrapperSwap = encodeWrapperSwap;
exports.encodeNextGenDexSettle = encodeNextGenDexSettle;
exports.encodeNextGenDexSettleBalancer = encodeNextGenDexSettleBalancer;
exports.encodeTransferIn = encodeTransferIn;
exports.encodeSweep = encodeSweep;
exports.encodeWrap = encodeWrap;
exports.encodeApprove = encodeApprove;
exports.encodeUnwrap = encodeUnwrap;
exports.encodeBalancerV2FlashLoan = encodeBalancerV2FlashLoan;
exports.encodeFlashLoan = encodeFlashLoan;
exports.encodeUint8AndBytes = encodeUint8AndBytes;
exports.encodeMorphoMarket = encodeMorphoMarket;
exports.encodeMorphoDepositCollateral = encodeMorphoDepositCollateral;
exports.encodeMorphoDeposit = encodeMorphoDeposit;
exports.encodeErc4646Deposit = encodeErc4646Deposit;
exports.encodeErc4646Withdraw = encodeErc4646Withdraw;
exports.encodeMorphoWithdraw = encodeMorphoWithdraw;
exports.encodeMorphoWithdrawCollateral = encodeMorphoWithdrawCollateral;
exports.encodeMorphoBorrow = encodeMorphoBorrow;
exports.encodeMorphoRepay = encodeMorphoRepay;
exports.encodeAaveDeposit = encodeAaveDeposit;
exports.encodeAaveBorrow = encodeAaveBorrow;
exports.encodeAaveRepay = encodeAaveRepay;
exports.encodeAaveWithdraw = encodeAaveWithdraw;
exports.encodeAaveV2Deposit = encodeAaveV2Deposit;
exports.encodeAaveV2Borrow = encodeAaveV2Borrow;
exports.encodeAaveV2Repay = encodeAaveV2Repay;
exports.encodeAaveV2Withdraw = encodeAaveV2Withdraw;
exports.encodeCompoundV3Deposit = encodeCompoundV3Deposit;
exports.encodeCompoundV3Borrow = encodeCompoundV3Borrow;
exports.encodeCompoundV3Repay = encodeCompoundV3Repay;
exports.encodeCompoundV3Withdraw = encodeCompoundV3Withdraw;
exports.encodeCompoundV2Deposit = encodeCompoundV2Deposit;
exports.encodeSiloV2Deposit = encodeSiloV2Deposit;
exports.encodeSiloV2Borrow = encodeSiloV2Borrow;
exports.encodeCompoundV2Borrow = encodeCompoundV2Borrow;
exports.encodeCompoundV2Repay = encodeCompoundV2Repay;
exports.encodeCompoundV2Withdraw = encodeCompoundV2Withdraw;
exports.encodeSiloV2Withdraw = encodeSiloV2Withdraw;
exports.encodeSiloV2Repay = encodeSiloV2Repay;
const viem_1 = require("viem");
const utils_js_1 = require("./utils.js");
var SweepType;
(function (SweepType) {
    SweepType[SweepType["VALIDATE"] = 0] = "VALIDATE";
    SweepType[SweepType["AMOUNT"] = 1] = "AMOUNT";
})(SweepType || (exports.SweepType = SweepType = {}));
var DexPayConfig;
(function (DexPayConfig) {
    DexPayConfig[DexPayConfig["CALLER_PAYS"] = 0] = "CALLER_PAYS";
    DexPayConfig[DexPayConfig["CONTRACT_PAYS"] = 1] = "CONTRACT_PAYS";
    DexPayConfig[DexPayConfig["PRE_FUND"] = 2] = "PRE_FUND";
    DexPayConfig[DexPayConfig["FLASH"] = 3] = "FLASH";
})(DexPayConfig || (exports.DexPayConfig = DexPayConfig = {}));
var DodoSelector;
(function (DodoSelector) {
    DodoSelector[DodoSelector["SELL_BASE"] = 0] = "SELL_BASE";
    DodoSelector[DodoSelector["SELL_QUOTE"] = 1] = "SELL_QUOTE";
})(DodoSelector || (exports.DodoSelector = DodoSelector = {}));
var WrapOperation;
(function (WrapOperation) {
    WrapOperation[WrapOperation["NATIVE"] = 0] = "NATIVE";
    WrapOperation[WrapOperation["ERC4626_DEPOSIT"] = 1] = "ERC4626_DEPOSIT";
    WrapOperation[WrapOperation["ERC4626_REDEEM"] = 2] = "ERC4626_REDEEM";
})(WrapOperation || (exports.WrapOperation = WrapOperation = {}));
var TransferIds;
(function (TransferIds) {
    TransferIds[TransferIds["TRANSFER_FROM"] = 0] = "TRANSFER_FROM";
    TransferIds[TransferIds["SWEEP"] = 1] = "SWEEP";
    TransferIds[TransferIds["WRAP_NATIVE"] = 2] = "WRAP_NATIVE";
    TransferIds[TransferIds["UNWRAP_WNATIVE"] = 3] = "UNWRAP_WNATIVE";
    TransferIds[TransferIds["PERMIT2_TRANSFER_FROM"] = 4] = "PERMIT2_TRANSFER_FROM";
    TransferIds[TransferIds["APPROVE"] = 5] = "APPROVE";
})(TransferIds || (exports.TransferIds = TransferIds = {}));
var PermitIds;
(function (PermitIds) {
    PermitIds[PermitIds["TOKEN_PERMIT"] = 0] = "TOKEN_PERMIT";
    PermitIds[PermitIds["AAVE_V3_CREDIT_PERMIT"] = 1] = "AAVE_V3_CREDIT_PERMIT";
    PermitIds[PermitIds["ALLOW_CREDIT_PERMIT"] = 2] = "ALLOW_CREDIT_PERMIT";
})(PermitIds || (exports.PermitIds = PermitIds = {}));
var LenderIds;
(function (LenderIds) {
    LenderIds[LenderIds["UP_TO_AAVE_V3"] = 1000] = "UP_TO_AAVE_V3";
    LenderIds[LenderIds["UP_TO_AAVE_V2"] = 2000] = "UP_TO_AAVE_V2";
    LenderIds[LenderIds["UP_TO_COMPOUND_V3"] = 3000] = "UP_TO_COMPOUND_V3";
    LenderIds[LenderIds["UP_TO_COMPOUND_V2"] = 4000] = "UP_TO_COMPOUND_V2";
    LenderIds[LenderIds["UP_TO_MORPHO"] = 5000] = "UP_TO_MORPHO";
    LenderIds[LenderIds["UP_TO_SILO_V2"] = 6000] = "UP_TO_SILO_V2";
})(LenderIds || (exports.LenderIds = LenderIds = {}));
var LenderOps;
(function (LenderOps) {
    LenderOps[LenderOps["DEPOSIT"] = 0] = "DEPOSIT";
    LenderOps[LenderOps["BORROW"] = 1] = "BORROW";
    LenderOps[LenderOps["REPAY"] = 2] = "REPAY";
    LenderOps[LenderOps["WITHDRAW"] = 3] = "WITHDRAW";
    LenderOps[LenderOps["DEPOSIT_LENDING_TOKEN"] = 4] = "DEPOSIT_LENDING_TOKEN";
    LenderOps[LenderOps["WITHDRAW_LENDING_TOKEN"] = 5] = "WITHDRAW_LENDING_TOKEN";
})(LenderOps || (exports.LenderOps = LenderOps = {}));
var FlashLoanIds;
(function (FlashLoanIds) {
    FlashLoanIds[FlashLoanIds["MORPHO"] = 0] = "MORPHO";
    FlashLoanIds[FlashLoanIds["BALANCER_V2"] = 1] = "BALANCER_V2";
    FlashLoanIds[FlashLoanIds["AAVE_V3"] = 2] = "AAVE_V3";
    FlashLoanIds[FlashLoanIds["AAVE_V2"] = 3] = "AAVE_V2";
})(FlashLoanIds || (exports.FlashLoanIds = FlashLoanIds = {}));
var ERC4626Ids;
(function (ERC4626Ids) {
    ERC4626Ids[ERC4626Ids["DEPOSIT"] = 0] = "DEPOSIT";
    ERC4626Ids[ERC4626Ids["WITHDRAW"] = 1] = "WITHDRAW";
})(ERC4626Ids || (exports.ERC4626Ids = ERC4626Ids = {}));
var Gen2025ActionIds;
(function (Gen2025ActionIds) {
    Gen2025ActionIds[Gen2025ActionIds["UNLOCK"] = 0] = "UNLOCK";
    Gen2025ActionIds[Gen2025ActionIds["UNI_V4_TAKE"] = 1] = "UNI_V4_TAKE";
    Gen2025ActionIds[Gen2025ActionIds["UNI_V4_SETTLE"] = 2] = "UNI_V4_SETTLE";
    Gen2025ActionIds[Gen2025ActionIds["UNI_V4_SYNC"] = 3] = "UNI_V4_SYNC";
    Gen2025ActionIds[Gen2025ActionIds["BAL_V3_TAKE"] = 4] = "BAL_V3_TAKE";
    Gen2025ActionIds[Gen2025ActionIds["BAL_V3_SETTLE"] = 5] = "BAL_V3_SETTLE";
})(Gen2025ActionIds || (exports.Gen2025ActionIds = Gen2025ActionIds = {}));
var ComposerCommands;
(function (ComposerCommands) {
    ComposerCommands[ComposerCommands["SWAPS"] = 16] = "SWAPS";
    ComposerCommands[ComposerCommands["EXT_CALL"] = 32] = "EXT_CALL";
    ComposerCommands[ComposerCommands["EXT_TRY_CALL"] = 33] = "EXT_TRY_CALL";
    ComposerCommands[ComposerCommands["EXT_CALL_WITH_REPLACE"] = 34] = "EXT_CALL_WITH_REPLACE";
    ComposerCommands[ComposerCommands["EXT_TRY_CALL_WITH_REPLACE"] = 35] = "EXT_TRY_CALL_WITH_REPLACE";
    ComposerCommands[ComposerCommands["LENDING"] = 48] = "LENDING";
    ComposerCommands[ComposerCommands["TRANSFERS"] = 64] = "TRANSFERS";
    ComposerCommands[ComposerCommands["PERMIT"] = 80] = "PERMIT";
    ComposerCommands[ComposerCommands["FLASH_LOAN"] = 96] = "FLASH_LOAN";
    ComposerCommands[ComposerCommands["ERC4626"] = 112] = "ERC4626";
    ComposerCommands[ComposerCommands["GEN_2025_SINGELTONS"] = 128] = "GEN_2025_SINGELTONS";
    ComposerCommands[ComposerCommands["BRIDGING"] = 144] = "BRIDGING";
})(ComposerCommands || (exports.ComposerCommands = ComposerCommands = {}));
var BridgeIds;
(function (BridgeIds) {
    BridgeIds[BridgeIds["STARGATE_V2"] = 0] = "STARGATE_V2";
    BridgeIds[BridgeIds["ACROSS"] = 10] = "ACROSS";
    BridgeIds[BridgeIds["SQUID_ROUTER"] = 20] = "SQUID_ROUTER";
    BridgeIds[BridgeIds["GASZIP"] = 30] = "GASZIP";
})(BridgeIds || (exports.BridgeIds = BridgeIds = {}));
var CompoundV2Selector;
(function (CompoundV2Selector) {
    CompoundV2Selector[CompoundV2Selector["MINT_BEHALF"] = 0] = "MINT_BEHALF";
    CompoundV2Selector[CompoundV2Selector["MINT"] = 1] = "MINT";
    CompoundV2Selector[CompoundV2Selector["REDEEM"] = 0] = "REDEEM";
    CompoundV2Selector[CompoundV2Selector["REDEEM_BEHALF"] = 1] = "REDEEM_BEHALF";
})(CompoundV2Selector || (exports.CompoundV2Selector = CompoundV2Selector = {}));
var SiloV2CollateralType;
(function (SiloV2CollateralType) {
    SiloV2CollateralType[SiloV2CollateralType["PROTECTED"] = 0] = "PROTECTED";
    SiloV2CollateralType[SiloV2CollateralType["COLLATERAL"] = 1] = "COLLATERAL";
})(SiloV2CollateralType || (exports.SiloV2CollateralType = SiloV2CollateralType = {}));
var DexTypeMappings;
(function (DexTypeMappings) {
    DexTypeMappings[DexTypeMappings["UNISWAP_V3_ID"] = 0] = "UNISWAP_V3_ID";
    DexTypeMappings[DexTypeMappings["UNISWAP_V2_ID"] = 1] = "UNISWAP_V2_ID";
    DexTypeMappings[DexTypeMappings["UNISWAP_V4_ID"] = 2] = "UNISWAP_V4_ID";
    DexTypeMappings[DexTypeMappings["IZI_ID"] = 5] = "IZI_ID";
    DexTypeMappings[DexTypeMappings["UNISWAP_V2_FOT_ID"] = 3] = "UNISWAP_V2_FOT_ID";
    DexTypeMappings[DexTypeMappings["CURVE_V1_STANDARD_ID"] = 64] = "CURVE_V1_STANDARD_ID";
    DexTypeMappings[DexTypeMappings["CURVE_RECEIVED_ID"] = 65] = "CURVE_RECEIVED_ID";
    DexTypeMappings[DexTypeMappings["CURVE_FORK_ID"] = 66] = "CURVE_FORK_ID";
    DexTypeMappings[DexTypeMappings["WOO_FI_ID"] = 80] = "WOO_FI_ID";
    DexTypeMappings[DexTypeMappings["GMX_ID"] = 90] = "GMX_ID";
    DexTypeMappings[DexTypeMappings["KTX_ID"] = 91] = "KTX_ID";
    DexTypeMappings[DexTypeMappings["BALANCER_V2_ID"] = 128] = "BALANCER_V2_ID";
    DexTypeMappings[DexTypeMappings["BALANCER_V3_ID"] = 129] = "BALANCER_V3_ID";
    DexTypeMappings[DexTypeMappings["LB_ID"] = 140] = "LB_ID";
    DexTypeMappings[DexTypeMappings["DODO_ID"] = 150] = "DODO_ID";
    DexTypeMappings[DexTypeMappings["SYNC_SWAP_ID"] = 160] = "SYNC_SWAP_ID";
    DexTypeMappings[DexTypeMappings["ERC4626_ID"] = 253] = "ERC4626_ID";
    DexTypeMappings[DexTypeMappings["ASSET_WRAP_ID"] = 254] = "ASSET_WRAP_ID";
})(DexTypeMappings || (exports.DexTypeMappings = DexTypeMappings = {}));
var DexForkMappings;
(function (DexForkMappings) {
    DexForkMappings[DexForkMappings["UNISWAP_V3"] = 0] = "UNISWAP_V3";
    DexForkMappings[DexForkMappings["IZI"] = 0] = "IZI";
    DexForkMappings[DexForkMappings["ANY_V3"] = 255] = "ANY_V3";
    DexForkMappings[DexForkMappings["ANY_IZI"] = 255] = "ANY_IZI";
    DexForkMappings[DexForkMappings["UNISWAP_V4"] = 0] = "UNISWAP_V4";
    DexForkMappings[DexForkMappings["BALANCER_V3"] = 0] = "BALANCER_V3";
    DexForkMappings[DexForkMappings["UNISWAP_V2"] = 0] = "UNISWAP_V2";
})(DexForkMappings || (exports.DexForkMappings = DexForkMappings = {}));
function encodeExternalCall(target, value, useSelfBalance, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'address', 'uint128', 'uint16', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.EXT_CALL), target, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance), (0, utils_js_1.uint16)(data.length / 2 - 1), data]);
}
function encodeTryExternalCall(target, value, useSelfBalance, rOnFailure, data, catchData) {
    return (0, utils_js_1.encodePacked)(['uint8', 'address', 'uint128', 'uint16', 'bytes', 'uint8', 'uint16', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.EXT_TRY_CALL), target, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance), (0, utils_js_1.uint16)(data.length / 2 - 1), data, (0, utils_js_1.uint8)(rOnFailure ? 0 : 1), (0, utils_js_1.uint16)(catchData.length / 2 - 1), catchData]);
}
function encodeExternalCallWithReplace(target, value, useSelfBalance, token, replaceOffset, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'address', 'uint128', 'address', 'uint16', 'uint16', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.EXT_CALL_WITH_REPLACE), target, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance), token, replaceOffset, (0, utils_js_1.uint16)(data.length / 2 - 1), data]);
}
function encodeTryExternalCallWithReplace(target, value, useSelfBalance, token, replaceOffset, data, rOnFailure, catchData) {
    return (0, utils_js_1.encodePacked)(['uint8', 'address', 'uint128', 'address', 'uint16', 'uint16', 'uint8', 'uint16', 'bytes', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.EXT_TRY_CALL_WITH_REPLACE), target, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance), token, replaceOffset, (0, utils_js_1.uint16)(data.length / 2 - 1), (0, utils_js_1.uint8)(rOnFailure ? 0 : 1), (0, utils_js_1.uint16)(catchData.length / 2 - 1), data, catchData]);
}
function encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions) {
    const partialData = encodeStargateV2BridgePartial(amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions);
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint32', 'bytes32', 'address', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.BRIDGING), (0, utils_js_1.uint8)(BridgeIds.STARGATE_V2), asset, stargatePool, dstEid, receiver, refundReceiver, partialData]);
}
function encodePermit(permitId, target, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint16', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.PERMIT), (0, utils_js_1.uint8)(permitId), target, (0, utils_js_1.uint16)(data.length / 2 - 1), data]);
}
function encodeStargateV2BridgePartial(amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions) {
    return (0, utils_js_1.encodePacked)(['uint128', 'uint32', 'uint128', 'uint8', 'uint16', 'uint16', 'bytes', 'bytes'], [(0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(amount), false, isNative), slippage, (0, utils_js_1.uint128)(fee), (0, utils_js_1.uint8)(isBusMode ? 1 : 0), (0, utils_js_1.uint16)(composeMsg.length / 2 - 1), (0, utils_js_1.uint16)(extraOptions.length / 2 - 1), composeMsg, extraOptions]);
}
function encodeStargateV2BridgeSimpleTaxi(asset, stargatePool, dstEid, receiver, refundReceiver, amount, isNative, slippage, fee) {
    return encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, false, isNative, (0, utils_js_1.newbytes)(0), (0, utils_js_1.newbytes)(0));
}
function encodeStargateV2BridgeSimpleBus(asset, stargatePool, dstEid, receiver, refundReceiver, amount, isNative, slippage, fee) {
    return encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, true, isNative, (0, utils_js_1.newbytes)(0), (0, utils_js_1.newbytes)(0));
}
function encodeAcrossBridgeToken(spokePool, depositor, sendingAssetId, receivingAssetId, amount, fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes'], [encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, false), encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message)]);
}
function encodeAcrossBridgeNative(spokePool, depositor, sendingAssetId, receivingAssetId, amount, fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes'], [encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, true), encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message)]);
}
function encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, isNative) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'address', 'bytes32', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.BRIDGING), (0, utils_js_1.uint8)(BridgeIds.ACROSS), spokePool, depositor, sendingAssetId, receivingAssetId, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(amount), false, isNative)]);
}
function encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return (0, utils_js_1.encodePacked)(['uint128', 'uint32', 'uint32', 'uint8', 'uint8', 'bytes32', 'uint32', 'uint16', 'bytes'], [fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, (0, utils_js_1.uint16)(message.length / 2 - 1), message]);
}
function encodeSquidRouterCall(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload, gasRefundRecipient, enableExpress, nativeAmount) {
    const partialData = encodeSquidRouterCallPartial(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload);
    return (0, utils_js_1.encodePacked)(['bytes', 'uint128', 'address', 'uint8', 'bytes', 'bytes', 'bytes', 'bytes'], [partialData, (0, utils_js_1.uint128)(nativeAmount), gasRefundRecipient, (0, utils_js_1.uint8)(enableExpress ? 1 : 0), bridgedTokenSymbol, destinationChain, destinationAddress, payload]);
}
function encodeSquidRouterCallPartial(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint16', 'uint16', 'uint16', 'uint16', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.BRIDGING), (0, utils_js_1.uint8)(BridgeIds.SQUID_ROUTER), gateway, asset, (0, utils_js_1.uint16)(bridgedTokenSymbol.length / 2 - 1), (0, utils_js_1.uint16)(destinationChain.length / 2 - 1), (0, utils_js_1.uint16)(destinationAddress.length / 2 - 1), (0, utils_js_1.uint16)(payload.length / 2 - 1), (0, utils_js_1.uint128)(amount)]);
}
function encodeGasZipBridge(gasZipRouter, receiver, amount, destinationChainId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'], [(0, utils_js_1.uint8)(ComposerCommands.BRIDGING), (0, utils_js_1.uint8)(BridgeIds.GASZIP), gasZipRouter, receiver, (0, utils_js_1.uint128)(amount), destinationChainId]);
}
function encodeGasZipEvmBridge(gasZipRouter, receiver, amount, destinationChainId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'], [(0, utils_js_1.uint8)(ComposerCommands.BRIDGING), (0, utils_js_1.uint8)(BridgeIds.GASZIP), gasZipRouter, (0, utils_js_1.rightPadZero)(receiver), (0, utils_js_1.uint128)(amount), destinationChainId]);
}
function encodePermit2TransferFrom(token, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.TRANSFERS), (0, utils_js_1.uint8)(TransferIds.PERMIT2_TRANSFER_FROM), token, receiver, (0, utils_js_1.uint128)(amount)]);
}
function encodeNextGenDexUnlock(singleton, id, d) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint16', 'uint8', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS), (0, utils_js_1.uint8)(Gen2025ActionIds.UNLOCK), singleton, (0, utils_js_1.uint16)(d.length / 2 - 1 + 1), (0, utils_js_1.uint8)(id), d]);
}
function encodeBalancerV3FlashLoan(singleton, poolId, asset, receiver, amount, flashData) {
    const take = encodeBalancerV3Take(singleton, asset, receiver, amount);
    const settle = encodeNextGenDexSettleBalancer(singleton, asset, amount);
    return encodeNextGenDexUnlock(singleton, poolId, encodeBalancerV3FlashLoanData(take, flashData, settle));
}
function encodeBalancerV3FlashLoanData(take, flashData, settle) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [take, flashData, settle]);
}
function encodeUniswapV4FlashLoan(singleton, poolId, asset, receiver, amount, flashData) {
    const take = encodeUniswapV4Take(singleton, asset, receiver, amount);
    const settle = encodeNextGenDexSettle(singleton, asset === viem_1.zeroAddress ? amount : 0);
    const sync = encodeUniswapV4Sync(singleton, asset);
    return encodeNextGenDexUnlock(singleton, poolId, encodeUniswapV4FlashLoanData(take, sync, flashData, settle));
}
function encodeUniswapV4FlashLoanData(take, sync, flashData, settle) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes', 'bytes'], [take, sync, flashData, settle]);
}
function encodeBalancerV3Take(singleton, asset, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'address', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS), (0, utils_js_1.uint8)(Gen2025ActionIds.BAL_V3_TAKE), singleton, asset, receiver, (0, utils_js_1.uint128)(amount)]);
}
function encodeUniswapV4Sync(singleton, asset) {
    if (asset === viem_1.zeroAddress)
        return `0x0`;
    ;
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS), (0, utils_js_1.uint8)(Gen2025ActionIds.UNI_V4_SYNC), singleton, asset]);
}
function encodeUniswapV4Take(singleton, asset, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'address', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS), (0, utils_js_1.uint8)(Gen2025ActionIds.UNI_V4_TAKE), singleton, asset, receiver, (0, utils_js_1.uint128)(amount)]);
}
function swapHead(amount, amountOutMin, assetIn) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint128', 'uint128', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.SWAPS), (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(amount), false, false), (0, utils_js_1.uint128)(amountOutMin), assetIn]);
}
function attachBranch(data, hops, splits, splitsData) {
    if (hops !== 0n && splits !== 0n)
        throw new Error("Invalidbranching");
    if (splitsData.length / 2 - 1 > 0 && splits === 0n)
        throw new Error("Nosplitsbutsplitdataprovided");
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'bytes'], [data, (0, utils_js_1.uint8)(hops), (0, utils_js_1.uint8)(splits), splitsData]);
}
function encodeUniswapV2StyleSwap(tokenOut, receiver, forkId, pool, feeDenom, cfg, flashCalldata) {
    if ((0, utils_js_1.uint256)(cfg) < 2 && flashCalldata.length / 2 - 1 > 2)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['address', 'address', 'uint8', 'address', 'uint16', 'uint8', 'uint16', 'bytes'], [tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.UNISWAP_V2_ID), pool, (0, utils_js_1.uint16)(feeDenom), (0, utils_js_1.uint8)(forkId), (0, utils_js_1.uint16)(cfg === DexPayConfig.FLASH ? flashCalldata.length / 2 - 1 : (0, utils_js_1.uint256)(cfg)), (0, utils_js_1.bytes)(cfg === DexPayConfig.FLASH ? flashCalldata : (0, utils_js_1.newbytes)(0))]);
}
function encodeUniswapV4StyleSwap(currentData, tokenOut, receiver, manager, fee, tickSpacing, hooks, hookData, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'address', 'uint24', 'uint24', 'uint8', 'uint16', 'bytes'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.UNISWAP_V4_ID), hooks, manager, fee, tickSpacing, (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg)), (0, utils_js_1.uint16)(hookData.length / 2 - 1), hookData]);
}
function encodeBalancerV2StyleSwap(currentData, tokenOut, receiver, poolId, balancerVault, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'bytes32', 'address', 'uint8'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.BALANCER_V2_ID), poolId, balancerVault, (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeLbStyleSwap(currentData, tokenOut, receiver, pool, swapForY, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8', 'uint8'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.LB_ID), pool, (0, utils_js_1.uint8)(swapForY ? 1 : 0), (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeSyncSwapStyleSwap(currentData, tokenOut, receiver, pool, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.SYNC_SWAP_ID), pool, (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeUniswapV3StyleSwap(currentData, tokenOut, receiver, forkId, pool, feeTier, cfg, flashCalldata) {
    if ((0, utils_js_1.uint256)(cfg) < 2 && flashCalldata.length / 2 - 1 > 2)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8', 'uint16', 'uint16', 'bytes'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.UNISWAP_V3_ID), pool, (0, utils_js_1.uint8)(forkId), (0, utils_js_1.uint16)(feeTier), (0, utils_js_1.uint16)(cfg === DexPayConfig.FLASH ? flashCalldata.length / 2 - 1 : (0, utils_js_1.uint256)(cfg)), (0, utils_js_1.bytes)(cfg === DexPayConfig.FLASH ? flashCalldata : (0, utils_js_1.newbytes)(0))]);
}
function encodeIzumiStyleSwap(currentData, tokenOut, receiver, forkId, pool, feeTier, cfg, flashCalldata) {
    if ((0, utils_js_1.uint256)(cfg) < 2 && flashCalldata.length / 2 - 1 > 2)
        throw new Error("Invalidconfigforv2swap");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8', 'uint16', 'uint16', 'bytes'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.IZI_ID), pool, (0, utils_js_1.uint8)(forkId), (0, utils_js_1.uint16)(feeTier), (0, utils_js_1.uint16)(cfg === DexPayConfig.FLASH ? flashCalldata.length / 2 - 1 : (0, utils_js_1.uint256)(cfg)), (0, utils_js_1.bytes)(cfg === DexPayConfig.FLASH ? flashCalldata : (0, utils_js_1.newbytes)(0))]);
}
function encodeBalancerV3StyleSwap(currentData, tokenOut, receiver, balancerV3Vault, pool, cfg, poolUserData) {
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'address', 'uint8', 'uint16', 'bytes'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.BALANCER_V3_ID), pool, balancerV3Vault, (0, utils_js_1.uint8)(cfg), (0, utils_js_1.uint16)(poolUserData.length / 2 - 1), poolUserData]);
}
function encodeDodoStyleSwap(currentData, tokenOut, receiver, pool, selector, poolId, cfg, flashCalldata) {
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8', 'uint16', 'uint16', 'bytes'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.DODO_ID), pool, (0, utils_js_1.uint8)(selector), (0, utils_js_1.uint16)(poolId), (0, utils_js_1.uint16)(cfg === DexPayConfig.FLASH ? flashCalldata.length / 2 - 1 : (0, utils_js_1.uint256)(cfg)), (0, utils_js_1.bytes)(cfg === DexPayConfig.FLASH ? flashCalldata : (0, utils_js_1.newbytes)(0))]);
}
function encodeWooStyleSwap(currentData, tokenOut, receiver, pool, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("NoflashforWoo");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.WOO_FI_ID), pool, (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeGmxStyleSwap(currentData, tokenOut, receiver, pool, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("NoflashforWoo");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.GMX_ID), pool, (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeKtxStyleSwap(currentData, tokenOut, receiver, pool, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("NoflashforWoo");
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'address', 'uint8'], [currentData, tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.KTX_ID), pool, (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeCurveStyleSwap(tokenOut, receiver, pool, indexIn, indexOut, selectorId, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("FlashnotyetsupportedforCurve");
    return (0, utils_js_1.encodePacked)(['address', 'address', 'uint8', 'address', 'uint8', 'uint8', 'uint8', 'uint16'], [tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.CURVE_V1_STANDARD_ID), pool, (0, utils_js_1.uint8)(indexIn), (0, utils_js_1.uint8)(indexOut), (0, utils_js_1.uint8)(selectorId), (0, utils_js_1.uint16)((0, utils_js_1.uint256)(cfg))]);
}
function encodeCurveNGStyleSwap(tokenOut, receiver, pool, indexIn, indexOut, selectorId, cfg) {
    if (cfg === DexPayConfig.FLASH)
        throw new Error("FlashnotyetsupportedforCurve");
    return (0, utils_js_1.encodePacked)(['address', 'address', 'uint8', 'address', 'uint8', 'uint8', 'uint8', 'uint16'], [tokenOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.CURVE_RECEIVED_ID), pool, (0, utils_js_1.uint8)(indexIn), (0, utils_js_1.uint8)(indexOut), (0, utils_js_1.uint8)(selectorId), (0, utils_js_1.uint16)((0, utils_js_1.uint256)(cfg))]);
}
function encodeWrapperSwap(currentData, assetOut, receiver, operation, cfg) {
    return (0, utils_js_1.encodePacked)(['bytes', 'address', 'address', 'uint8', 'uint8', 'uint8'], [currentData, assetOut, receiver, (0, utils_js_1.uint8)(DexTypeMappings.ASSET_WRAP_ID), (0, utils_js_1.uint8)((0, utils_js_1.uint256)(operation)), (0, utils_js_1.uint8)((0, utils_js_1.uint256)(cfg))]);
}
function encodeNextGenDexSettle(singleton, nativeAmount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS), (0, utils_js_1.uint8)(Gen2025ActionIds.UNI_V4_SETTLE), singleton, (0, utils_js_1.uint128)(nativeAmount)]);
}
function encodeNextGenDexSettleBalancer(singleton, asset, amountHint) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS), (0, utils_js_1.uint8)(Gen2025ActionIds.BAL_V3_SETTLE), singleton, asset, (0, utils_js_1.uint128)(amountHint >= 0xffffffffffffffffffffffffffffffn ? 0xffffffffffffffffffffffffffffffn : amountHint)]);
}
function encodeTransferIn(asset, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.TRANSFERS), (0, utils_js_1.uint8)(TransferIds.TRANSFER_FROM), asset, receiver, (0, utils_js_1.uint128)(amount)]);
}
function encodeSweep(asset, receiver, amount, sweepType) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.TRANSFERS), (0, utils_js_1.uint8)(TransferIds.SWEEP), asset, receiver, sweepType, (0, utils_js_1.uint128)(amount)]);
}
function encodeWrap(amount, wrapTarget) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.TRANSFERS), (0, utils_js_1.uint8)(TransferIds.SWEEP), viem_1.zeroAddress, wrapTarget, (0, utils_js_1.uint8)(SweepType.AMOUNT), (0, utils_js_1.uint128)(amount)]);
}
function encodeApprove(asset, target) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.TRANSFERS), (0, utils_js_1.uint8)(TransferIds.APPROVE), asset, target]);
}
function encodeUnwrap(target, receiver, amount, sweepType) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [(0, utils_js_1.uint8)(ComposerCommands.TRANSFERS), (0, utils_js_1.uint8)(TransferIds.UNWRAP_WNATIVE), target, receiver, sweepType, (0, utils_js_1.uint128)(amount)]);
}
function encodeBalancerV2FlashLoan(asset, amount, poolId, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint128', 'uint16', 'bytes'], [(0, utils_js_1.uint8)(ComposerCommands.FLASH_LOAN), (0, utils_js_1.uint8)(FlashLoanIds.BALANCER_V2), asset, (0, utils_js_1.uint128)(amount), (0, utils_js_1.uint16)(data.length / 2 - 1 + 1), encodeUint8AndBytes(poolId, data)]);
}
function encodeFlashLoan(asset, amount, pool, poolType, poolId, data) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'address', 'address', 'uint128', 'uint16', 'bytes'], [encodeApprove(asset, pool), (0, utils_js_1.uint8)(ComposerCommands.FLASH_LOAN), poolType, asset, pool, (0, utils_js_1.uint128)(amount), (0, utils_js_1.uint16)(data.length / 2 - 1 + 1), encodeUint8AndBytes(poolId, data)]);
}
function encodeUint8AndBytes(poolId, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'bytes'], [(0, utils_js_1.uint8)(poolId), data]);
}
function encodeMorphoMarket(loanToken, collateralToken, oracle, irm, lltv) {
    return (0, utils_js_1.encodePacked)(['address', 'address', 'address', 'address', 'uint128'], [loanToken, collateralToken, oracle, irm, (0, utils_js_1.uint128)(lltv)]);
}
function encodeMorphoDepositCollateral(market, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [encodeApprove((0, utils_js_1.getMorphoCollateral)(market), morphoB), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT), (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1), market, (0, utils_js_1.uint128)(assets), receiver, morphoB, (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? (0, utils_js_1.newbytes)(0) : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data)]);
}
function encodeMorphoDeposit(market, isShares, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [encodeApprove((0, utils_js_1.getMorphoLoanAsset)(market), morphoB), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT_LENDING_TOKEN), (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1), market, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false), receiver, morphoB, (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? (0, utils_js_1.newbytes)(0) : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data)]);
}
function encodeErc4646Deposit(asset, vault, isShares, assets, receiver) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'address', 'address', 'uint128', 'address'], [encodeApprove(asset, vault), (0, utils_js_1.uint8)(ComposerCommands.ERC4626), (0, utils_js_1.uint8)(0), asset, vault, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false), receiver]);
}
function encodeErc4646Withdraw(vault, isShares, assets, receiver) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint128', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.ERC4626), (0, utils_js_1.uint8)(1), vault, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false), receiver]);
}
function encodeMorphoWithdraw(market, isShares, assets, receiver, morphoB) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW_LENDING_TOKEN), (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1), market, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false), receiver, morphoB]);
}
function encodeMorphoWithdrawCollateral(market, assets, receiver, morphoB) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW), (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1), market, (0, utils_js_1.uint128)(assets), receiver, morphoB]);
}
function encodeMorphoBorrow(market, isShares, assets, receiver, morphoB) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.BORROW), (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1), market, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false), receiver, morphoB]);
}
function encodeMorphoRepay(market, isShares, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [encodeApprove((0, utils_js_1.getMorphoLoanAsset)(market), morphoB), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.REPAY), (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1), market, (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false), receiver, morphoB, (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? (0, utils_js_1.newbytes)(0) : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data)]);
}
function encodeAaveDeposit(token, amount, receiver, pool) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, pool), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, pool]);
}
function encodeAaveBorrow(token, amount, receiver, mode, pool) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.BORROW), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, (0, utils_js_1.uint8)(mode), pool]);
}
function encodeAaveRepay(token, amount, receiver, mode, dToken, pool) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address', 'address'], [encodeApprove(token, pool), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.REPAY), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, (0, utils_js_1.uint8)(mode), dToken, pool]);
}
function encodeAaveWithdraw(token, amount, receiver, aToken, pool) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, aToken, pool]);
}
function encodeAaveV2Deposit(token, amount, receiver, pool) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, pool), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, pool]);
}
function encodeAaveV2Borrow(token, amount, receiver, mode, pool) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.BORROW), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, (0, utils_js_1.uint8)(mode), pool]);
}
function encodeAaveV2Repay(token, amount, receiver, mode, dToken, pool) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address', 'address'], [encodeApprove(token, pool), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.REPAY), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, (0, utils_js_1.uint8)(mode), dToken, pool]);
}
function encodeAaveV2Withdraw(token, amount, receiver, aToken, pool) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW), (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, aToken, pool]);
}
function encodeCompoundV3Deposit(token, amount, receiver, comet) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, comet), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, comet]);
}
function encodeCompoundV3Borrow(token, amount, receiver, comet) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.BORROW), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, comet]);
}
function encodeCompoundV3Repay(token, amount, receiver, comet) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, comet), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.REPAY), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, comet]);
}
function encodeCompoundV3Withdraw(token, amount, receiver, comet, isBase) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1), token, (0, utils_js_1.uint128)(amount), receiver, isBase ? (0, utils_js_1.uint8)(1) : (0, utils_js_1.uint8)(0), comet]);
}
function encodeCompoundV2Deposit(token, amount, receiver, cToken, selectorId) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, cToken), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1), token, (0, utils_js_1.encodeCompoundV2SelectorId)((0, utils_js_1.uint128)(amount), selectorId), receiver, cToken]);
}
function encodeSiloV2Deposit(token, amount, receiver, silo, collateralMode) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, silo), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.DEPOSIT), (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1), token, (0, utils_js_1.encodeSiloV2CollateralMode)((0, utils_js_1.uint128)(amount), collateralMode), receiver, silo]);
}
function encodeSiloV2Borrow(amount, receiver, silo) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.BORROW), (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1), (0, utils_js_1.uint128)(amount), receiver, silo]);
}
function encodeCompoundV2Borrow(token, amount, receiver, cToken) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.BORROW), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, cToken]);
}
function encodeCompoundV2Repay(token, amount, receiver, cToken) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, cToken), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.REPAY), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, cToken]);
}
function encodeCompoundV2Withdraw(token, amount, receiver, cToken, selectorId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW), (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1), token, (0, utils_js_1.encodeCompoundV2SelectorId)((0, utils_js_1.uint128)(amount), selectorId), receiver, cToken]);
}
function encodeSiloV2Withdraw(amount, receiver, silo, collateralMode) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'], [(0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.WITHDRAW), (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1), (0, utils_js_1.encodeSiloV2CollateralMode)((0, utils_js_1.uint128)(amount), collateralMode), receiver, silo]);
}
function encodeSiloV2Repay(token, amount, receiver, silo) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, silo), (0, utils_js_1.uint8)(ComposerCommands.LENDING), (0, utils_js_1.uint8)(LenderOps.REPAY), (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1), token, (0, utils_js_1.uint128)(amount), receiver, silo]);
}
