"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UP_TO_FLUID_SMART = exports.UP_TO_FLUID = exports.UP_TO_AAVE_V4 = exports.UP_TO_SILO_V2 = exports.UP_TO_MORPHO = exports.UP_TO_COMPOUND_V2 = exports.UP_TO_COMPOUND_V3 = exports.UP_TO_AAVE_V2 = exports.UP_TO_AAVE_V3 = exports.AAVE_V4_PMS_BATCH_PERMIT = exports.AAVE_V4_CONFIG_PERMIT = exports.AAVE_V4_WITHDRAW_PERMIT = exports.AAVE_V4_BORROW_PERMIT = exports.ALLOW_CREDIT_PERMIT = exports.AAVE_V3_CREDIT_PERMIT = exports.TOKEN_PERMIT = exports.SWEEP_NFT = exports.WRAP = exports.APPROVE = exports.PERMIT2_TRANSFER_FROM = exports.UNWRAP_WNATIVE = exports.WRAP_NATIVE = exports.SWEEP = exports.TRANSFER_FROM = exports.GEARBOX_UPDATE_QUOTA_PERMISSION = exports.GEARBOX_WITHDRAW_COLLATERAL_PERMISSION = exports.GEARBOX_DECREASE_DEBT_PERMISSION = exports.GEARBOX_INCREASE_DEBT_PERMISSION = exports.GEARBOX_ADD_COLLATERAL_PERMISSION = exports.GEARBOX_WITHDRAW_ALL = exports.GEARBOX_REPAY_ALL = exports.FLUID_SMART_USE_BALANCE = exports.FLUID_MAX_AMOUNT = exports.FLUID_USE_BALANCE = exports.FLUID_ALL = exports.UPPER_128BITS = exports.USE_SHARES_FLAG = exports.NATIVE_FLAG = exports.SiloV2CollateralType = exports.CompoundV2Selector = exports.BridgeIds = exports.ComposerCommands = exports.Gen2025ActionIds = exports.ERC4626Ids = exports.FlashLoanIds = exports.LenderOps = exports.LenderIds = exports.PermitIds = exports.TransferIds = exports.SweepType = void 0;
exports.COLLATERAL = exports.PROTECTED = exports.REDEEM_ITOKEN = exports.REDEEM_BEHALF = exports.REDEEM = exports.MINT_ITOKEN = exports.MINT = exports.MINT_BEHALF = exports.GASZIP = exports.SQUID_ROUTER = exports.ACROSS = exports.STARGATE_V2 = exports.BRIDGING = exports.GEN_2025_SINGELTONS = exports.ERC4626 = exports.FLASH_LOAN = exports.PERMIT = exports.TRANSFERS = exports.LENDING = exports.EXT_TRY_CALL_WITH_REPLACE = exports.EXT_CALL_WITH_REPLACE = exports.EXT_TRY_CALL = exports.EXT_CALL = exports.BAL_V3_SETTLE = exports.BAL_V3_TAKE = exports.UNI_V4_SYNC = exports.UNI_V4_SETTLE = exports.UNI_V4_TAKE = exports.UNLOCK = exports.AAVE_V2 = exports.AAVE_V3 = exports.BALANCER_V2 = exports.MORPHO = exports.GEARBOX_MULTICALL = exports.FLUID_OPERATE_T1 = exports.FLUID_OPERATE_PERFECT = exports.FLUID_OPERATE = exports.SET_COLLATERAL = exports.WITHDRAW_LENDING_TOKEN = exports.DEPOSIT_LENDING_TOKEN = exports.WITHDRAW = exports.REPAY = exports.BORROW = exports.DEPOSIT = exports.UP_TO_GEARBOX_V3 = void 0;
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
exports.encodeNextGenDexSettle = encodeNextGenDexSettle;
exports.encodeNextGenDexSettleBalancer = encodeNextGenDexSettleBalancer;
exports.encodeTransferIn = encodeTransferIn;
exports.encodeSweep = encodeSweep;
exports.encodeWrap = encodeWrap;
exports.encodeWrapWithReceiver = encodeWrapWithReceiver;
exports.encodeApprove = encodeApprove;
exports.encodeSweepNft = encodeSweepNft;
exports.encodeUnwrap = encodeUnwrap;
exports.encodeBalancerV2FlashLoan = encodeBalancerV2FlashLoan;
exports.encodeFlashLoan = encodeFlashLoan;
exports.encodeUint8AndBytes = encodeUint8AndBytes;
exports.encodeMorphoMarket = encodeMorphoMarket;
exports.encodeMorphoDepositCollateral = encodeMorphoDepositCollateral;
exports.encodeListaSupplyCollateralViaProvider = encodeListaSupplyCollateralViaProvider;
exports.encodeMorphoDeposit = encodeMorphoDeposit;
exports.encodeErc4626Deposit = encodeErc4626Deposit;
exports.encodeErc4646Withdraw = encodeErc4646Withdraw;
exports.encodeMorphoWithdraw = encodeMorphoWithdraw;
exports.encodeMorphoWithdrawCollateral = encodeMorphoWithdrawCollateral;
exports.encodeListaWithdrawCollateralViaProvider = encodeListaWithdrawCollateralViaProvider;
exports.encodeMorphoBorrow = encodeMorphoBorrow;
exports.encodeMorphoRepay = encodeMorphoRepay;
exports.encodeListaRepayViaProvider = encodeListaRepayViaProvider;
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
exports.encodeAaveV4Deposit = encodeAaveV4Deposit;
exports.encodeAaveV4Borrow = encodeAaveV4Borrow;
exports.encodeAaveV4Repay = encodeAaveV4Repay;
exports.encodeAaveV4Withdraw = encodeAaveV4Withdraw;
exports.encodeAaveV4SetCollateral = encodeAaveV4SetCollateral;
exports.encodeAaveV4BorrowPermit = encodeAaveV4BorrowPermit;
exports.encodeAaveV4WithdrawPermit = encodeAaveV4WithdrawPermit;
exports.encodeAaveV4ConfigPermit = encodeAaveV4ConfigPermit;
exports.encodeFluidT1Operate = encodeFluidT1Operate;
exports._fluidIsDepositAmount = _fluidIsDepositAmount;
exports._fluidIsRepayAmount = _fluidIsRepayAmount;
exports.encodeFluidDeposit = encodeFluidDeposit;
exports.encodeFluidBorrow = encodeFluidBorrow;
exports.encodeFluidRepay = encodeFluidRepay;
exports.encodeFluidWithdraw = encodeFluidWithdraw;
exports._fluidSmartHeader = _fluidSmartHeader;
exports._fluidSmartTokens4 = _fluidSmartTokens4;
exports._fluidSmartTokens6 = _fluidSmartTokens6;
exports._fluidSmartAmounts4 = _fluidSmartAmounts4;
exports._fluidSmartAmounts6 = _fluidSmartAmounts6;
exports.encodeFluidSmartOperateT2 = encodeFluidSmartOperateT2;
exports.encodeFluidSmartOperateT3 = encodeFluidSmartOperateT3;
exports.encodeFluidSmartOperateT4 = encodeFluidSmartOperateT4;
exports.encodeFluidSmartOperatePerfectT2 = encodeFluidSmartOperatePerfectT2;
exports.encodeFluidSmartOperatePerfectT3 = encodeFluidSmartOperatePerfectT3;
exports.encodeFluidSmartOperatePerfectT4 = encodeFluidSmartOperatePerfectT4;
exports.encodeFluidFTokenDeposit = encodeFluidFTokenDeposit;
exports.encodeFluidFTokenWithdraw = encodeFluidFTokenWithdraw;
exports.encodeGearboxV3Supply = encodeGearboxV3Supply;
exports.encodeGearboxV3Borrow = encodeGearboxV3Borrow;
exports.encodeGearboxV3RepayPartial = encodeGearboxV3RepayPartial;
exports.encodeGearboxV3RepayAll = encodeGearboxV3RepayAll;
exports.encodeGearboxV3RepayPartialMax = encodeGearboxV3RepayPartialMax;
exports.encodeGearboxV3Withdraw = encodeGearboxV3Withdraw;
exports.encodeGearboxV3FacadeCall = encodeGearboxV3FacadeCall;
exports.encodeGearboxV3BotMulticall = encodeGearboxV3BotMulticall;
exports.encodeGearboxV3OpenCreditAccount = encodeGearboxV3OpenCreditAccount;
// @ts-nocheck
const viem_1 = require("viem");
const utils_js_1 = require("./utils.js");
var SweepType;
(function (SweepType) {
    SweepType[SweepType["VALIDATE"] = 0] = "VALIDATE";
    SweepType[SweepType["AMOUNT"] = 1] = "AMOUNT";
})(SweepType || (exports.SweepType = SweepType = {}));
var TransferIds;
(function (TransferIds) {
    TransferIds[TransferIds["TRANSFER_FROM"] = 0] = "TRANSFER_FROM";
    TransferIds[TransferIds["SWEEP"] = 1] = "SWEEP";
    TransferIds[TransferIds["WRAP_NATIVE"] = 2] = "WRAP_NATIVE";
    TransferIds[TransferIds["UNWRAP_WNATIVE"] = 3] = "UNWRAP_WNATIVE";
    TransferIds[TransferIds["PERMIT2_TRANSFER_FROM"] = 4] = "PERMIT2_TRANSFER_FROM";
    TransferIds[TransferIds["APPROVE"] = 5] = "APPROVE";
    TransferIds[TransferIds["WRAP"] = 6] = "WRAP";
    TransferIds[TransferIds["SWEEP_NFT"] = 7] = "SWEEP_NFT";
})(TransferIds || (exports.TransferIds = TransferIds = {}));
var PermitIds;
(function (PermitIds) {
    PermitIds[PermitIds["TOKEN_PERMIT"] = 0] = "TOKEN_PERMIT";
    PermitIds[PermitIds["AAVE_V3_CREDIT_PERMIT"] = 1] = "AAVE_V3_CREDIT_PERMIT";
    PermitIds[PermitIds["ALLOW_CREDIT_PERMIT"] = 2] = "ALLOW_CREDIT_PERMIT";
    PermitIds[PermitIds["AAVE_V4_BORROW_PERMIT"] = 3] = "AAVE_V4_BORROW_PERMIT";
    PermitIds[PermitIds["AAVE_V4_WITHDRAW_PERMIT"] = 4] = "AAVE_V4_WITHDRAW_PERMIT";
    PermitIds[PermitIds["AAVE_V4_CONFIG_PERMIT"] = 5] = "AAVE_V4_CONFIG_PERMIT";
    PermitIds[PermitIds["AAVE_V4_PMS_BATCH_PERMIT"] = 6] = "AAVE_V4_PMS_BATCH_PERMIT";
})(PermitIds || (exports.PermitIds = PermitIds = {}));
var LenderIds;
(function (LenderIds) {
    LenderIds[LenderIds["UP_TO_AAVE_V3"] = 1000] = "UP_TO_AAVE_V3";
    LenderIds[LenderIds["UP_TO_AAVE_V2"] = 2000] = "UP_TO_AAVE_V2";
    LenderIds[LenderIds["UP_TO_COMPOUND_V3"] = 3000] = "UP_TO_COMPOUND_V3";
    LenderIds[LenderIds["UP_TO_COMPOUND_V2"] = 4000] = "UP_TO_COMPOUND_V2";
    LenderIds[LenderIds["UP_TO_MORPHO"] = 5000] = "UP_TO_MORPHO";
    LenderIds[LenderIds["UP_TO_SILO_V2"] = 6000] = "UP_TO_SILO_V2";
    LenderIds[LenderIds["UP_TO_AAVE_V4"] = 7000] = "UP_TO_AAVE_V4";
    LenderIds[LenderIds["UP_TO_FLUID"] = 8000] = "UP_TO_FLUID";
    LenderIds[LenderIds["UP_TO_FLUID_SMART"] = 9000] = "UP_TO_FLUID_SMART";
    LenderIds[LenderIds["UP_TO_GEARBOX_V3"] = 10000] = "UP_TO_GEARBOX_V3";
})(LenderIds || (exports.LenderIds = LenderIds = {}));
var LenderOps;
(function (LenderOps) {
    LenderOps[LenderOps["DEPOSIT"] = 0] = "DEPOSIT";
    LenderOps[LenderOps["BORROW"] = 1] = "BORROW";
    LenderOps[LenderOps["REPAY"] = 2] = "REPAY";
    LenderOps[LenderOps["WITHDRAW"] = 3] = "WITHDRAW";
    LenderOps[LenderOps["DEPOSIT_LENDING_TOKEN"] = 4] = "DEPOSIT_LENDING_TOKEN";
    LenderOps[LenderOps["WITHDRAW_LENDING_TOKEN"] = 5] = "WITHDRAW_LENDING_TOKEN";
    LenderOps[LenderOps["SET_COLLATERAL"] = 6] = "SET_COLLATERAL";
    LenderOps[LenderOps["FLUID_OPERATE"] = 10] = "FLUID_OPERATE";
    LenderOps[LenderOps["FLUID_OPERATE_PERFECT"] = 11] = "FLUID_OPERATE_PERFECT";
    LenderOps[LenderOps["FLUID_OPERATE_T1"] = 12] = "FLUID_OPERATE_T1";
    LenderOps[LenderOps["GEARBOX_MULTICALL"] = 13] = "GEARBOX_MULTICALL";
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
    CompoundV2Selector[CompoundV2Selector["MINT_ITOKEN"] = 2] = "MINT_ITOKEN";
    CompoundV2Selector[CompoundV2Selector["REDEEM"] = 0] = "REDEEM";
    CompoundV2Selector[CompoundV2Selector["REDEEM_BEHALF"] = 1] = "REDEEM_BEHALF";
    CompoundV2Selector[CompoundV2Selector["REDEEM_ITOKEN"] = 2] = "REDEEM_ITOKEN";
})(CompoundV2Selector || (exports.CompoundV2Selector = CompoundV2Selector = {}));
var SiloV2CollateralType;
(function (SiloV2CollateralType) {
    SiloV2CollateralType[SiloV2CollateralType["PROTECTED"] = 0] = "PROTECTED";
    SiloV2CollateralType[SiloV2CollateralType["COLLATERAL"] = 1] = "COLLATERAL";
})(SiloV2CollateralType || (exports.SiloV2CollateralType = SiloV2CollateralType = {}));
exports.NATIVE_FLAG = 1n << 127n;
exports.USE_SHARES_FLAG = 1n << 126n;
exports.UPPER_128BITS = 120n;
exports.FLUID_ALL = -(1n << 127n);
exports.FLUID_USE_BALANCE = (1n << 128n) - 1n;
exports.FLUID_MAX_AMOUNT = (1n << 112n) - 1n;
exports.FLUID_SMART_USE_BALANCE = (1n << 256n) - 1n;
exports.GEARBOX_REPAY_ALL = (1n << 112n) - 1n;
exports.GEARBOX_WITHDRAW_ALL = (1n << 112n) - 1n;
exports.GEARBOX_ADD_COLLATERAL_PERMISSION = 1n << 0n;
exports.GEARBOX_INCREASE_DEBT_PERMISSION = 1n << 1n;
exports.GEARBOX_DECREASE_DEBT_PERMISSION = 1n << 2n;
exports.GEARBOX_WITHDRAW_COLLATERAL_PERMISSION = 1n << 5n;
exports.GEARBOX_UPDATE_QUOTA_PERMISSION = 1n << 6n;
exports.TRANSFER_FROM = 0n;
exports.SWEEP = 1n;
exports.WRAP_NATIVE = 2n;
exports.UNWRAP_WNATIVE = 3n;
exports.PERMIT2_TRANSFER_FROM = 4n;
exports.APPROVE = 5n;
exports.WRAP = 6n;
exports.SWEEP_NFT = 7n;
exports.TOKEN_PERMIT = 0n;
exports.AAVE_V3_CREDIT_PERMIT = 1n;
exports.ALLOW_CREDIT_PERMIT = 2n;
exports.AAVE_V4_BORROW_PERMIT = 3n;
exports.AAVE_V4_WITHDRAW_PERMIT = 4n;
exports.AAVE_V4_CONFIG_PERMIT = 5n;
exports.AAVE_V4_PMS_BATCH_PERMIT = 6n;
exports.UP_TO_AAVE_V3 = 1000n;
exports.UP_TO_AAVE_V2 = 2000n;
exports.UP_TO_COMPOUND_V3 = 3000n;
exports.UP_TO_COMPOUND_V2 = 4000n;
exports.UP_TO_MORPHO = 5000n;
exports.UP_TO_SILO_V2 = 6000n;
exports.UP_TO_AAVE_V4 = 7000n;
exports.UP_TO_FLUID = 8000n;
exports.UP_TO_FLUID_SMART = 9000n;
exports.UP_TO_GEARBOX_V3 = 10000n;
exports.DEPOSIT = 0n;
exports.BORROW = 1n;
exports.REPAY = 2n;
exports.WITHDRAW = 3n;
exports.DEPOSIT_LENDING_TOKEN = 4n;
exports.WITHDRAW_LENDING_TOKEN = 5n;
exports.SET_COLLATERAL = 6n;
exports.FLUID_OPERATE = 10n;
exports.FLUID_OPERATE_PERFECT = 11n;
exports.FLUID_OPERATE_T1 = 12n;
exports.GEARBOX_MULTICALL = 13n;
exports.MORPHO = 0n;
exports.BALANCER_V2 = 1n;
exports.AAVE_V3 = 2n;
exports.AAVE_V2 = 3n;
exports.UNLOCK = 0n;
exports.UNI_V4_TAKE = 1n;
exports.UNI_V4_SETTLE = 2n;
exports.UNI_V4_SYNC = 3n;
exports.BAL_V3_TAKE = 4n;
exports.BAL_V3_SETTLE = 5n;
exports.EXT_CALL = 0x20n;
exports.EXT_TRY_CALL = 0x21n;
exports.EXT_CALL_WITH_REPLACE = 0x22n;
exports.EXT_TRY_CALL_WITH_REPLACE = 0x23n;
exports.LENDING = 0x30n;
exports.TRANSFERS = 0x40n;
exports.PERMIT = 0x50n;
exports.FLASH_LOAN = 0x60n;
exports.ERC4626 = 0x70n;
exports.GEN_2025_SINGELTONS = 0x80n;
exports.BRIDGING = 0x90n;
exports.STARGATE_V2 = 0x00n;
exports.ACROSS = 0x0an;
exports.SQUID_ROUTER = 0x14n;
exports.GASZIP = 0x1en;
exports.MINT_BEHALF = 0n;
exports.MINT = 1n;
exports.MINT_ITOKEN = 2n;
exports.REDEEM = 0n;
exports.REDEEM_BEHALF = 1n;
exports.REDEEM_ITOKEN = 2n;
exports.PROTECTED = 0n;
exports.COLLATERAL = 1n;
function encodeExternalCall(target, value, useSelfBalance, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'address', 'uint128', 'uint16', 'bytes'], [
        (0, utils_js_1.uint8)(ComposerCommands.EXT_CALL),
        target,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance),
        (0, utils_js_1.uint16)(data.length / 2 - 1),
        data,
    ]);
}
function encodeTryExternalCall(target, value, useSelfBalance, rOnFailure, data, catchData) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'address',
        'uint128',
        'uint16',
        'bytes',
        'uint8',
        'uint16',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.EXT_TRY_CALL),
        target,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance),
        (0, utils_js_1.uint16)(data.length / 2 - 1),
        data,
        (0, utils_js_1.uint8)(rOnFailure ? 0 : 1),
        (0, utils_js_1.uint16)(catchData.length / 2 - 1),
        catchData,
    ]);
}
function encodeExternalCallWithReplace(target, value, useSelfBalance, token, replaceOffset, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'address', 'uint128', 'address', 'uint16', 'uint16', 'bytes'], [
        (0, utils_js_1.uint8)(ComposerCommands.EXT_CALL_WITH_REPLACE),
        target,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance),
        token,
        replaceOffset,
        (0, utils_js_1.uint16)(data.length / 2 - 1),
        data,
    ]);
}
function encodeTryExternalCallWithReplace(target, value, useSelfBalance, token, replaceOffset, data, rOnFailure, catchData) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'address',
        'uint128',
        'address',
        'uint16',
        'uint16',
        'uint8',
        'uint16',
        'bytes',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.EXT_TRY_CALL_WITH_REPLACE),
        target,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(value), false, useSelfBalance),
        token,
        replaceOffset,
        (0, utils_js_1.uint16)(data.length / 2 - 1),
        (0, utils_js_1.uint8)(rOnFailure ? 0 : 1),
        (0, utils_js_1.uint16)(catchData.length / 2 - 1),
        data,
        catchData,
    ]);
}
function encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions) {
    const partialData = encodeStargateV2BridgePartial(amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions);
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'address',
        'address',
        'uint32',
        'bytes32',
        'address',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.BRIDGING),
        (0, utils_js_1.uint8)(BridgeIds.STARGATE_V2),
        asset,
        stargatePool,
        dstEid,
        receiver,
        refundReceiver,
        partialData,
    ]);
}
function encodePermit(permitId, target, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint16', 'bytes'], [
        (0, utils_js_1.uint8)(ComposerCommands.PERMIT),
        (0, utils_js_1.uint8)(permitId),
        target,
        (0, utils_js_1.uint16)(data.length / 2 - 1),
        data,
    ]);
}
function encodeStargateV2BridgePartial(amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions) {
    return (0, utils_js_1.encodePacked)([
        'uint128',
        'uint32',
        'uint128',
        'uint8',
        'uint16',
        'uint16',
        'bytes',
        'bytes',
    ], [
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(amount), false, isNative),
        slippage,
        (0, utils_js_1.uint128)(fee),
        (0, utils_js_1.uint8)(isBusMode ? 1 : 0),
        (0, utils_js_1.uint16)(composeMsg.length / 2 - 1),
        (0, utils_js_1.uint16)(extraOptions.length / 2 - 1),
        composeMsg,
        extraOptions,
    ]);
}
function encodeStargateV2BridgeSimpleTaxi(asset, stargatePool, dstEid, receiver, refundReceiver, amount, isNative, slippage, fee) {
    return encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, false, isNative, (0, utils_js_1.newbytes)(0), (0, utils_js_1.newbytes)(0));
}
function encodeStargateV2BridgeSimpleBus(asset, stargatePool, dstEid, receiver, refundReceiver, amount, isNative, slippage, fee) {
    return encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, true, isNative, (0, utils_js_1.newbytes)(0), (0, utils_js_1.newbytes)(0));
}
function encodeAcrossBridgeToken(spokePool, depositor, sendingAssetId, receivingAssetId, amount, fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes'], [
        encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, false),
        encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message),
    ]);
}
function encodeAcrossBridgeNative(spokePool, depositor, sendingAssetId, receivingAssetId, amount, fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes'], [
        encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, true),
        encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message),
    ]);
}
function encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, isNative) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'address', 'bytes32', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.BRIDGING),
        (0, utils_js_1.uint8)(BridgeIds.ACROSS),
        spokePool,
        depositor,
        sendingAssetId,
        receivingAssetId,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(amount), false, isNative),
    ]);
}
function encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return (0, utils_js_1.encodePacked)([
        'uint128',
        'uint32',
        'uint32',
        'uint8',
        'uint8',
        'bytes32',
        'uint32',
        'uint16',
        'bytes',
    ], [
        fixedFee,
        feePercentage,
        destinationChainId,
        fromTokenDecimals,
        toTokenDecimals,
        receiver,
        deadline,
        (0, utils_js_1.uint16)(message.length / 2 - 1),
        message,
    ]);
}
function encodeSquidRouterCall(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload, gasRefundRecipient, enableExpress, nativeAmount) {
    const partialData = encodeSquidRouterCallPartial(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload);
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint128',
        'address',
        'uint8',
        'bytes',
        'bytes',
        'bytes',
        'bytes',
    ], [
        partialData,
        (0, utils_js_1.uint128)(nativeAmount),
        gasRefundRecipient,
        (0, utils_js_1.uint8)(enableExpress ? 1 : 0),
        bridgedTokenSymbol,
        destinationChain,
        destinationAddress,
        payload,
    ]);
}
function encodeSquidRouterCallPartial(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'address',
        'address',
        'uint16',
        'uint16',
        'uint16',
        'uint16',
        'uint128',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.BRIDGING),
        (0, utils_js_1.uint8)(BridgeIds.SQUID_ROUTER),
        gateway,
        asset,
        (0, utils_js_1.uint16)(bridgedTokenSymbol.length / 2 - 1),
        (0, utils_js_1.uint16)(destinationChain.length / 2 - 1),
        (0, utils_js_1.uint16)(destinationAddress.length / 2 - 1),
        (0, utils_js_1.uint16)(payload.length / 2 - 1),
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeGasZipBridge(gasZipRouter, receiver, amount, destinationChainId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'], [
        (0, utils_js_1.uint8)(ComposerCommands.BRIDGING),
        (0, utils_js_1.uint8)(BridgeIds.GASZIP),
        gasZipRouter,
        receiver,
        (0, utils_js_1.uint128)(amount),
        destinationChainId,
    ]);
}
function encodeGasZipEvmBridge(gasZipRouter, receiver, amount, destinationChainId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'], [
        (0, utils_js_1.uint8)(ComposerCommands.BRIDGING),
        (0, utils_js_1.uint8)(BridgeIds.GASZIP),
        gasZipRouter,
        (0, utils_js_1.rightPadZero)(receiver),
        (0, utils_js_1.uint128)(amount),
        destinationChainId,
    ]);
}
function encodePermit2TransferFrom(token, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.PERMIT2_TRANSFER_FROM),
        token,
        receiver,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeNextGenDexUnlock(singleton, id, d) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint16', 'uint8', 'bytes'], [
        (0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS),
        (0, utils_js_1.uint8)(Gen2025ActionIds.UNLOCK),
        singleton,
        (0, utils_js_1.uint16)(d.length / 2 - 1 + 1),
        (0, utils_js_1.uint8)(id),
        d,
    ]);
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
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS),
        (0, utils_js_1.uint8)(Gen2025ActionIds.BAL_V3_TAKE),
        singleton,
        asset,
        receiver,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeUniswapV4Sync(singleton, asset) {
    if (asset === viem_1.zeroAddress)
        return `0x0`;
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS),
        (0, utils_js_1.uint8)(Gen2025ActionIds.UNI_V4_SYNC),
        singleton,
        asset,
    ]);
}
function encodeUniswapV4Take(singleton, asset, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS),
        (0, utils_js_1.uint8)(Gen2025ActionIds.UNI_V4_TAKE),
        singleton,
        asset,
        receiver,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeNextGenDexSettle(singleton, nativeAmount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS),
        (0, utils_js_1.uint8)(Gen2025ActionIds.UNI_V4_SETTLE),
        singleton,
        (0, utils_js_1.uint128)(nativeAmount),
    ]);
}
function encodeNextGenDexSettleBalancer(singleton, asset, amountHint) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.GEN_2025_SINGELTONS),
        (0, utils_js_1.uint8)(Gen2025ActionIds.BAL_V3_SETTLE),
        singleton,
        asset,
        (0, utils_js_1.uint128)(amountHint >= (1n << 120n) - 1n ? (1n << 120n) - 1n : amountHint),
    ]);
}
function encodeTransferIn(asset, receiver, amount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.TRANSFER_FROM),
        asset,
        receiver,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeSweep(asset, receiver, amount, sweepType) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.SWEEP),
        asset,
        receiver,
        sweepType,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeWrap(amount, wrapTarget) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.SWEEP),
        viem_1.zeroAddress,
        wrapTarget,
        (0, utils_js_1.uint8)(SweepType.AMOUNT),
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeWrapWithReceiver(amount, weth, receiver) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.WRAP),
        weth,
        receiver,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeApprove(asset, target) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.APPROVE),
        asset,
        target,
    ]);
}
function encodeSweepNft(collection, receiver, tokenId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint256'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.SWEEP_NFT),
        collection,
        receiver,
        tokenId,
    ]);
}
function encodeUnwrap(target, receiver, amount, sweepType) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [
        (0, utils_js_1.uint8)(ComposerCommands.TRANSFERS),
        (0, utils_js_1.uint8)(TransferIds.UNWRAP_WNATIVE),
        target,
        receiver,
        sweepType,
        (0, utils_js_1.uint128)(amount),
    ]);
}
function encodeBalancerV2FlashLoan(asset, amount, poolId, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint128', 'uint16', 'bytes'], [
        (0, utils_js_1.uint8)(ComposerCommands.FLASH_LOAN),
        (0, utils_js_1.uint8)(FlashLoanIds.BALANCER_V2),
        asset,
        (0, utils_js_1.uint128)(amount),
        (0, utils_js_1.uint16)(data.length / 2 - 1 + 1),
        encodeUint8AndBytes(poolId, data),
    ]);
}
function encodeFlashLoan(asset, amount, pool, poolType, poolId, data) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'address',
        'address',
        'uint128',
        'uint16',
        'bytes',
    ], [
        encodeApprove(asset, pool),
        (0, utils_js_1.uint8)(ComposerCommands.FLASH_LOAN),
        poolType,
        asset,
        pool,
        (0, utils_js_1.uint128)(amount),
        (0, utils_js_1.uint16)(data.length / 2 - 1 + 1),
        encodeUint8AndBytes(poolId, data),
    ]);
}
function encodeUint8AndBytes(poolId, data) {
    return (0, utils_js_1.encodePacked)(['uint8', 'bytes'], [(0, utils_js_1.uint8)(poolId), data]);
}
function encodeMorphoMarket(loanToken, collateralToken, oracle, irm, lltv) {
    return (0, utils_js_1.encodePacked)(['address', 'address', 'address', 'address', 'uint128'], [loanToken, collateralToken, oracle, irm, (0, utils_js_1.uint128)(lltv)]);
}
function encodeMorphoDepositCollateral(market, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'bytes',
        'uint128',
        'address',
        'address',
        'uint16',
        'bytes',
    ], [
        encodeApprove((0, utils_js_1.getMorphoCollateral)(market), morphoB),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.uint128)(assets),
        receiver,
        morphoB,
        (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
        data.length / 2 - 1 === 0
            ? (0, utils_js_1.newbytes)(0)
            : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data),
    ]);
}
function encodeListaSupplyCollateralViaProvider(market, assets, receiver, data, provider, pId) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'bytes',
        'uint128',
        'address',
        'address',
        'uint16',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), false, true),
        receiver,
        provider,
        (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
        data.length / 2 - 1 === 0
            ? (0, utils_js_1.newbytes)(0)
            : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data),
    ]);
}
function encodeMorphoDeposit(market, isShares, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'bytes',
        'uint128',
        'address',
        'address',
        'uint16',
        'bytes',
    ], [
        encodeApprove((0, utils_js_1.getMorphoLoanAsset)(market), morphoB),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT_LENDING_TOKEN),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false),
        receiver,
        morphoB,
        (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
        data.length / 2 - 1 === 0
            ? (0, utils_js_1.newbytes)(0)
            : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data),
    ]);
}
function encodeErc4626Deposit(asset, vault, isShares, assets, receiver) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'address', 'address', 'uint128', 'address'], [
        encodeApprove(asset, vault),
        (0, utils_js_1.uint8)(ComposerCommands.ERC4626),
        (0, utils_js_1.uint8)(0),
        asset,
        vault,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false),
        receiver,
    ]);
}
function encodeErc4646Withdraw(vault, isShares, assets, receiver) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'address', 'uint128', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.ERC4626),
        (0, utils_js_1.uint8)(1),
        vault,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false),
        receiver,
    ]);
}
function encodeMorphoWithdraw(market, isShares, assets, receiver, morphoB) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW_LENDING_TOKEN),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false),
        receiver,
        morphoB,
    ]);
}
function encodeMorphoWithdrawCollateral(market, assets, receiver, morphoB) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.uint128)(assets),
        receiver,
        morphoB,
    ]);
}
function encodeListaWithdrawCollateralViaProvider(market, assets, receiver, provider) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), false, true),
        receiver,
        provider,
    ]);
}
function encodeMorphoBorrow(market, isShares, assets, receiver, morphoB) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false),
        receiver,
        morphoB,
    ]);
}
function encodeMorphoRepay(market, isShares, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'bytes',
        'uint128',
        'address',
        'address',
        'uint16',
        'bytes',
    ], [
        encodeApprove((0, utils_js_1.getMorphoLoanAsset)(market), morphoB),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, false),
        receiver,
        morphoB,
        (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
        data.length / 2 - 1 === 0
            ? (0, utils_js_1.newbytes)(0)
            : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data),
    ]);
}
function encodeListaRepayViaProvider(market, isShares, assets, receiver, data, morphoB, pId) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'bytes',
        'uint128',
        'address',
        'address',
        'uint16',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_MORPHO - 1),
        market,
        (0, utils_js_1.generateAmountBitmap)((0, utils_js_1.uint128)(assets), isShares, true),
        receiver,
        morphoB,
        (0, utils_js_1.uint16)(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
        data.length / 2 - 1 === 0
            ? (0, utils_js_1.newbytes)(0)
            : encodeUint8AndBytes((0, utils_js_1.uint8)(pId), data),
    ]);
}
function encodeAaveDeposit(token, amount, receiver, pool) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        encodeApprove(token, pool),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        pool,
    ]);
}
function encodeAaveBorrow(token, amount, receiver, mode, pool) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        (0, utils_js_1.uint8)(mode),
        pool,
    ]);
}
function encodeAaveRepay(token, amount, receiver, mode, dToken, pool) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
        'address',
        'address',
    ], [
        encodeApprove(token, pool),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        (0, utils_js_1.uint8)(mode),
        dToken,
        pool,
    ]);
}
function encodeAaveWithdraw(token, amount, receiver, aToken, pool) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        aToken,
        pool,
    ]);
}
function encodeAaveV2Deposit(token, amount, receiver, pool) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        encodeApprove(token, pool),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        pool,
    ]);
}
function encodeAaveV2Borrow(token, amount, receiver, mode, pool) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        (0, utils_js_1.uint8)(mode),
        pool,
    ]);
}
function encodeAaveV2Repay(token, amount, receiver, mode, dToken, pool) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
        'address',
        'address',
    ], [
        encodeApprove(token, pool),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        (0, utils_js_1.uint8)(mode),
        dToken,
        pool,
    ]);
}
function encodeAaveV2Withdraw(token, amount, receiver, aToken, pool) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        aToken,
        pool,
    ]);
}
function encodeCompoundV3Deposit(token, amount, receiver, comet) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        encodeApprove(token, comet),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        comet,
    ]);
}
function encodeCompoundV3Borrow(token, amount, receiver, comet) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        comet,
    ]);
}
function encodeCompoundV3Repay(token, amount, receiver, comet) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        encodeApprove(token, comet),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        comet,
    ]);
}
function encodeCompoundV3Withdraw(token, amount, receiver, comet, isBase) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V3 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        isBase ? (0, utils_js_1.uint8)(1) : (0, utils_js_1.uint8)(0),
        comet,
    ]);
}
function encodeCompoundV2Deposit(token, amount, receiver, cToken, selectorId) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, cToken),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1),
        token,
        (0, utils_js_1.encodeCompoundV2SelectorId)((0, utils_js_1.uint128)(amount), selectorId),
        receiver,
        cToken,
    ]);
}
function encodeSiloV2Deposit(token, amount, receiver, silo, collateralMode) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, silo),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1),
        token,
        (0, utils_js_1.encodeSiloV2CollateralMode)((0, utils_js_1.uint128)(amount), collateralMode),
        receiver,
        silo,
    ]);
}
function encodeSiloV2Borrow(amount, receiver, silo) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1),
        (0, utils_js_1.uint128)(amount),
        receiver,
        silo,
    ]);
}
function encodeCompoundV2Borrow(token, amount, receiver, cToken) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        cToken,
    ]);
}
function encodeCompoundV2Repay(token, amount, receiver, cToken) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, cToken),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        cToken,
    ]);
}
function encodeCompoundV2Withdraw(token, amount, receiver, cToken, selectorId) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_COMPOUND_V2 - 1),
        token,
        (0, utils_js_1.encodeCompoundV2SelectorId)((0, utils_js_1.uint128)(amount), selectorId),
        receiver,
        cToken,
    ]);
}
function encodeSiloV2Withdraw(amount, receiver, silo, collateralMode) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1),
        (0, utils_js_1.encodeSiloV2CollateralMode)((0, utils_js_1.uint128)(amount), collateralMode),
        receiver,
        silo,
    ]);
}
function encodeSiloV2Repay(token, amount, receiver, silo) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        token === viem_1.zeroAddress ? (0, utils_js_1.newbytes)(0) : encodeApprove(token, silo),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_SILO_V2 - 1),
        token,
        (0, utils_js_1.uint128)(amount),
        receiver,
        silo,
    ]);
}
function encodeAaveV4Deposit(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint256',
        'address',
        'address',
    ], [
        encodeApprove(underlying, positionManager),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V4 - 1),
        underlying,
        (0, utils_js_1.uint128)(amount),
        receiver,
        reserveId,
        spoke,
        positionManager,
    ]);
}
function encodeAaveV4Borrow(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint256',
        'address',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V4 - 1),
        underlying,
        (0, utils_js_1.uint128)(amount),
        receiver,
        reserveId,
        spoke,
        positionManager,
    ]);
}
function encodeAaveV4Repay(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint256',
        'address',
        'address',
    ], [
        encodeApprove(underlying, positionManager),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V4 - 1),
        underlying,
        (0, utils_js_1.uint128)(amount),
        receiver,
        reserveId,
        spoke,
        positionManager,
    ]);
}
function encodeAaveV4Withdraw(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint256',
        'address',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V4 - 1),
        underlying,
        (0, utils_js_1.uint128)(amount),
        receiver,
        reserveId,
        spoke,
        positionManager,
    ]);
}
function encodeAaveV4SetCollateral(reserveId, enable, spoke, configPositionManager) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'uint256', 'uint8', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.SET_COLLATERAL),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_AAVE_V4 - 1),
        reserveId,
        (0, utils_js_1.uint8)(enable ? 1 : 0),
        spoke,
        configPositionManager,
    ]);
}
function encodeAaveV4BorrowPermit(takerPM, spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs) {
    const data = (0, utils_js_1.encodePacked)([
        'address',
        'uint256',
        'uint256',
        'uint256',
        'uint32',
        'bytes32',
        'bytes32',
    ], [spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs]);
    return encodePermit(PermitIds.AAVE_V4_BORROW_PERMIT, takerPM, data);
}
function encodeAaveV4WithdrawPermit(takerPM, spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs) {
    const data = (0, utils_js_1.encodePacked)([
        'address',
        'uint256',
        'uint256',
        'uint256',
        'uint32',
        'bytes32',
        'bytes32',
    ], [spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs]);
    return encodePermit(PermitIds.AAVE_V4_WITHDRAW_PERMIT, takerPM, data);
}
function encodeAaveV4ConfigPermit(configPM, spoke, status, nonce, deadlinePlusOne, r, vs) {
    const data = (0, utils_js_1.encodePacked)(['address', 'uint8', 'uint256', 'uint32', 'bytes32', 'bytes32'], [spoke, (0, utils_js_1.uint8)(status ? 1 : 0), nonce, deadlinePlusOne, r, vs]);
    return encodePermit(PermitIds.AAVE_V4_CONFIG_PERMIT, configPM, data);
}
function encodeFluidT1Operate(colUnderlying, debtUnderlying, colAmount, debtAmount, nftId, receiver, nftReceiver, vault) {
    let approvals = '0x';
    if (colUnderlying !== viem_1.zeroAddress && _fluidIsDepositAmount(colAmount)) {
        approvals = (0, utils_js_1.encodePacked)(['bytes', 'bytes'], [approvals, encodeApprove(colUnderlying, vault)]);
    }
    if (debtUnderlying !== viem_1.zeroAddress && _fluidIsRepayAmount(debtAmount)) {
        approvals = (0, utils_js_1.encodePacked)(['bytes', 'bytes'], [approvals, encodeApprove(debtUnderlying, vault)]);
    }
    const body = (0, utils_js_1.encodePacked)([
        'address',
        'address',
        'int128',
        'int128',
        'uint256',
        'address',
        'address',
        'address',
    ], [
        colUnderlying,
        debtUnderlying,
        colAmount,
        debtAmount,
        nftId,
        receiver,
        nftReceiver,
        vault,
    ]);
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'bytes'], [
        approvals,
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.FLUID_OPERATE_T1),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_FLUID - 1),
        body,
    ]);
}
function _fluidIsDepositAmount(a) {
    return a > 0;
}
function _fluidIsRepayAmount(a) {
    return a < 0;
}
function encodeFluidDeposit(underlying, amount, nftId, receiver, vault) {
    let colAmount = amount === 0n ? (1n << 127n) - 1n : (0, utils_js_1.int128)(amount);
    return encodeFluidT1Operate(underlying, viem_1.zeroAddress, colAmount, 0, nftId, receiver, viem_1.zeroAddress, vault);
}
function encodeFluidBorrow(underlying, amount, nftId, receiver, vault) {
    return encodeFluidT1Operate(viem_1.zeroAddress, underlying, 0, (0, utils_js_1.int128)(amount), nftId, receiver, viem_1.zeroAddress, vault);
}
function encodeFluidRepay(underlying, amount, nftId, receiver, vault) {
    let debtAmount = amount === 0n || amount === (1n << 112n) - 1n
        ? -(1n << 127n)
        : -(0, utils_js_1.int128)(amount);
    return encodeFluidT1Operate(viem_1.zeroAddress, underlying, 0, debtAmount, nftId, receiver, viem_1.zeroAddress, vault);
}
function encodeFluidWithdraw(underlying, amount, nftId, receiver, vault) {
    let colAmount = amount === (1n << 112n) - 1n ? -(1n << 127n) : -(0, utils_js_1.int128)(amount);
    return encodeFluidT1Operate(underlying, viem_1.zeroAddress, colAmount, 0, nftId, receiver, viem_1.zeroAddress, vault);
}
function _fluidSmartHeader(vaultType, callValue, nftId, receiver, nftReceiver, vault, isPerfect) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'uint8',
        'uint128',
        'uint256',
        'address',
        'address',
        'address',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        isPerfect
            ? (0, utils_js_1.uint8)(LenderOps.FLUID_OPERATE_PERFECT)
            : (0, utils_js_1.uint8)(LenderOps.FLUID_OPERATE),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_FLUID_SMART - 1),
        vaultType,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
    ]);
}
function _fluidSmartTokens4(t) {
    return (0, utils_js_1.encodePacked)(['address', 'address', 'address', 'address'], [t[0], t[1], t[2], t[3]]);
}
function _fluidSmartTokens6(t) {
    return (0, utils_js_1.encodePacked)(['address', 'address', 'address', 'address', 'address', 'address'], [t[0], t[1], t[2], t[3], t[4], t[5]]);
}
function _fluidSmartAmounts4(a) {
    return (0, utils_js_1.encodePacked)(['int256', 'int256', 'int256', 'int256'], [a[0], a[1], a[2], a[3]]);
}
function _fluidSmartAmounts6(a) {
    return (0, utils_js_1.encodePacked)(['int256', 'int256', 'int256', 'int256', 'int256', 'int256'], [a[0], a[1], a[2], a[3], a[4], a[5]]);
}
function encodeFluidSmartOperateT2(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [
        _fluidSmartHeader(2, callValue, nftId, receiver, nftReceiver, vault, false),
        _fluidSmartTokens4(tokens),
        _fluidSmartAmounts4(amounts),
    ]);
}
function encodeFluidSmartOperateT3(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [
        _fluidSmartHeader(3, callValue, nftId, receiver, nftReceiver, vault, false),
        _fluidSmartTokens4(tokens),
        _fluidSmartAmounts4(amounts),
    ]);
}
function encodeFluidSmartOperateT4(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [
        _fluidSmartHeader(4, callValue, nftId, receiver, nftReceiver, vault, false),
        _fluidSmartTokens6(tokens),
        _fluidSmartAmounts6(amounts),
    ]);
}
function encodeFluidSmartOperatePerfectT2(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [
        _fluidSmartHeader(2, callValue, nftId, receiver, nftReceiver, vault, true),
        _fluidSmartTokens4(tokens),
        _fluidSmartAmounts4(amounts),
    ]);
}
function encodeFluidSmartOperatePerfectT3(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [
        _fluidSmartHeader(3, callValue, nftId, receiver, nftReceiver, vault, true),
        _fluidSmartTokens4(tokens),
        _fluidSmartAmounts4(amounts),
    ]);
}
function encodeFluidSmartOperatePerfectT4(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return (0, utils_js_1.encodePacked)(['bytes', 'bytes', 'bytes'], [
        _fluidSmartHeader(4, callValue, nftId, receiver, nftReceiver, vault, true),
        _fluidSmartTokens6(tokens),
        _fluidSmartAmounts6(amounts),
    ]);
}
function encodeFluidFTokenDeposit(underlying, amount, receiver, fToken) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'address',
    ], [
        encodeApprove(underlying, fToken),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT_LENDING_TOKEN),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_FLUID - 1),
        underlying,
        amount,
        receiver,
        fToken,
    ]);
}
function encodeFluidFTokenWithdraw(underlying, amount, receiver, fToken) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW_LENDING_TOKEN),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_FLUID - 1),
        underlying,
        amount,
        receiver,
        fToken,
    ]);
}
function encodeGearboxV3Supply(token, amount, creditAccount, creditManager) {
    return (0, utils_js_1.encodePacked)(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address'], [
        encodeApprove(token, creditManager),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.DEPOSIT),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        token,
        amount,
        creditAccount,
    ]);
}
function encodeGearboxV3Borrow(underlying, amount, receiver, creditAccount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.BORROW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        underlying,
        amount,
        receiver,
        creditAccount,
    ]);
}
function encodeGearboxV3RepayPartial(underlying, amount, creditAccount, creditManager) {
    if (amount === 0n || amount === exports.GEARBOX_REPAY_ALL)
        throw new Error('CL:gearboxpartialrepayneedsliteralamount');
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
    ], [
        encodeApprove(underlying, creditManager),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        underlying,
        amount,
        creditAccount,
        (0, utils_js_1.uint8)(0),
    ]);
}
function encodeGearboxV3RepayAll(underlying, creditAccount, creditManager, quotedTokens) {
    if (quotedTokens.length > 255)
        throw new Error('CL:gearboxtoomanyquotedtokens');
    let quotedBlob = '0x';
    for (let i = 0n; i < quotedTokens.length; i++) {
        quotedBlob = (0, utils_js_1.encodePacked)(['bytes', 'address'], [quotedBlob, quotedTokens[i]]);
    }
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
        'bytes',
    ], [
        encodeApprove(underlying, creditManager),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        underlying,
        exports.GEARBOX_REPAY_ALL,
        creditAccount,
        (0, utils_js_1.uint8)(quotedTokens.length),
        quotedBlob,
    ]);
}
function encodeGearboxV3RepayPartialMax(underlying, creditAccount, creditManager) {
    return (0, utils_js_1.encodePacked)([
        'bytes',
        'uint8',
        'uint8',
        'uint16',
        'address',
        'uint128',
        'address',
        'uint8',
    ], [
        encodeApprove(underlying, creditManager),
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.REPAY),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        underlying,
        exports.GEARBOX_REPAY_ALL,
        creditAccount,
        (0, utils_js_1.uint8)(0),
    ]);
}
function encodeGearboxV3Withdraw(token, amount, receiver, creditAccount) {
    return (0, utils_js_1.encodePacked)(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.WITHDRAW),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        token,
        amount,
        receiver,
        creditAccount,
    ]);
}
function encodeGearboxV3FacadeCall(innerCallData) {
    if (innerCallData.length / 2 - 1 > (1n << 16n) - 1n)
        throw new Error('CL:gearboxsub-calltoolong');
    return (0, utils_js_1.encodePacked)(['uint16', 'bytes'], [(0, utils_js_1.uint16)(innerCallData.length / 2 - 1), innerCallData]);
}
function encodeGearboxV3BotMulticall(creditAccount, numCalls, calls) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'uint8',
        'address',
        'address',
        'bytes32',
        'uint16',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.GEARBOX_MULTICALL),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        (0, utils_js_1.uint8)(0),
        creditAccount,
        viem_1.zeroAddress,
        ('0x' + '0'.repeat(64)),
        numCalls,
        calls,
    ]);
}
function encodeGearboxV3OpenCreditAccount(creditFacade, referralCode, numCalls, calls) {
    return (0, utils_js_1.encodePacked)([
        'uint8',
        'uint8',
        'uint16',
        'uint8',
        'address',
        'address',
        'uint256',
        'uint16',
        'bytes',
    ], [
        (0, utils_js_1.uint8)(ComposerCommands.LENDING),
        (0, utils_js_1.uint8)(LenderOps.GEARBOX_MULTICALL),
        (0, utils_js_1.uint16)(LenderIds.UP_TO_GEARBOX_V3 - 1),
        (0, utils_js_1.uint8)(1),
        creditFacade,
        viem_1.zeroAddress,
        referralCode,
        numCalls,
        calls,
    ]);
}
