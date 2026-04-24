// @ts-nocheck
import { zeroAddress } from "viem";
import { encodePacked, uint128, uint8, uint16, int128, generateAmountBitmap, newbytes, getMorphoCollateral, getMorphoLoanAsset, rightPadZero, encodeCompoundV2SelectorId, encodeSiloV2CollateralMode } from "./utils.js";
export var SweepType;
(function (SweepType) {
    SweepType[SweepType["VALIDATE"] = 0] = "VALIDATE";
    SweepType[SweepType["AMOUNT"] = 1] = "AMOUNT";
})(SweepType || (SweepType = {}));
export var TransferIds;
(function (TransferIds) {
    TransferIds[TransferIds["TRANSFER_FROM"] = 0] = "TRANSFER_FROM";
    TransferIds[TransferIds["SWEEP"] = 1] = "SWEEP";
    TransferIds[TransferIds["WRAP_NATIVE"] = 2] = "WRAP_NATIVE";
    TransferIds[TransferIds["UNWRAP_WNATIVE"] = 3] = "UNWRAP_WNATIVE";
    TransferIds[TransferIds["PERMIT2_TRANSFER_FROM"] = 4] = "PERMIT2_TRANSFER_FROM";
    TransferIds[TransferIds["APPROVE"] = 5] = "APPROVE";
    TransferIds[TransferIds["WRAP"] = 6] = "WRAP";
    TransferIds[TransferIds["SWEEP_NFT"] = 7] = "SWEEP_NFT";
})(TransferIds || (TransferIds = {}));
export var PermitIds;
(function (PermitIds) {
    PermitIds[PermitIds["TOKEN_PERMIT"] = 0] = "TOKEN_PERMIT";
    PermitIds[PermitIds["AAVE_V3_CREDIT_PERMIT"] = 1] = "AAVE_V3_CREDIT_PERMIT";
    PermitIds[PermitIds["ALLOW_CREDIT_PERMIT"] = 2] = "ALLOW_CREDIT_PERMIT";
    PermitIds[PermitIds["AAVE_V4_BORROW_PERMIT"] = 3] = "AAVE_V4_BORROW_PERMIT";
    PermitIds[PermitIds["AAVE_V4_WITHDRAW_PERMIT"] = 4] = "AAVE_V4_WITHDRAW_PERMIT";
    PermitIds[PermitIds["AAVE_V4_CONFIG_PERMIT"] = 5] = "AAVE_V4_CONFIG_PERMIT";
    PermitIds[PermitIds["AAVE_V4_PMS_BATCH_PERMIT"] = 6] = "AAVE_V4_PMS_BATCH_PERMIT";
})(PermitIds || (PermitIds = {}));
export var LenderIds;
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
})(LenderIds || (LenderIds = {}));
export var LenderOps;
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
})(LenderOps || (LenderOps = {}));
export var FlashLoanIds;
(function (FlashLoanIds) {
    FlashLoanIds[FlashLoanIds["MORPHO"] = 0] = "MORPHO";
    FlashLoanIds[FlashLoanIds["BALANCER_V2"] = 1] = "BALANCER_V2";
    FlashLoanIds[FlashLoanIds["AAVE_V3"] = 2] = "AAVE_V3";
    FlashLoanIds[FlashLoanIds["AAVE_V2"] = 3] = "AAVE_V2";
})(FlashLoanIds || (FlashLoanIds = {}));
export var ERC4626Ids;
(function (ERC4626Ids) {
    ERC4626Ids[ERC4626Ids["DEPOSIT"] = 0] = "DEPOSIT";
    ERC4626Ids[ERC4626Ids["WITHDRAW"] = 1] = "WITHDRAW";
})(ERC4626Ids || (ERC4626Ids = {}));
export var Gen2025ActionIds;
(function (Gen2025ActionIds) {
    Gen2025ActionIds[Gen2025ActionIds["UNLOCK"] = 0] = "UNLOCK";
    Gen2025ActionIds[Gen2025ActionIds["UNI_V4_TAKE"] = 1] = "UNI_V4_TAKE";
    Gen2025ActionIds[Gen2025ActionIds["UNI_V4_SETTLE"] = 2] = "UNI_V4_SETTLE";
    Gen2025ActionIds[Gen2025ActionIds["UNI_V4_SYNC"] = 3] = "UNI_V4_SYNC";
    Gen2025ActionIds[Gen2025ActionIds["BAL_V3_TAKE"] = 4] = "BAL_V3_TAKE";
    Gen2025ActionIds[Gen2025ActionIds["BAL_V3_SETTLE"] = 5] = "BAL_V3_SETTLE";
})(Gen2025ActionIds || (Gen2025ActionIds = {}));
export var ComposerCommands;
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
})(ComposerCommands || (ComposerCommands = {}));
export var BridgeIds;
(function (BridgeIds) {
    BridgeIds[BridgeIds["STARGATE_V2"] = 0] = "STARGATE_V2";
    BridgeIds[BridgeIds["ACROSS"] = 10] = "ACROSS";
    BridgeIds[BridgeIds["SQUID_ROUTER"] = 20] = "SQUID_ROUTER";
    BridgeIds[BridgeIds["GASZIP"] = 30] = "GASZIP";
})(BridgeIds || (BridgeIds = {}));
export var CompoundV2Selector;
(function (CompoundV2Selector) {
    CompoundV2Selector[CompoundV2Selector["MINT_BEHALF"] = 0] = "MINT_BEHALF";
    CompoundV2Selector[CompoundV2Selector["MINT"] = 1] = "MINT";
    CompoundV2Selector[CompoundV2Selector["MINT_ITOKEN"] = 2] = "MINT_ITOKEN";
    CompoundV2Selector[CompoundV2Selector["REDEEM"] = 0] = "REDEEM";
    CompoundV2Selector[CompoundV2Selector["REDEEM_BEHALF"] = 1] = "REDEEM_BEHALF";
    CompoundV2Selector[CompoundV2Selector["REDEEM_ITOKEN"] = 2] = "REDEEM_ITOKEN";
})(CompoundV2Selector || (CompoundV2Selector = {}));
export var SiloV2CollateralType;
(function (SiloV2CollateralType) {
    SiloV2CollateralType[SiloV2CollateralType["PROTECTED"] = 0] = "PROTECTED";
    SiloV2CollateralType[SiloV2CollateralType["COLLATERAL"] = 1] = "COLLATERAL";
})(SiloV2CollateralType || (SiloV2CollateralType = {}));
export function encodeExternalCall(target, value, useSelfBalance, data) {
    return encodePacked(['uint8', 'address', 'uint128', 'uint16', 'bytes'], [uint8(ComposerCommands.EXT_CALL), target, generateAmountBitmap(uint128(value), false, useSelfBalance), uint16(data.length / 2 - 1), data]);
}
export function encodeTryExternalCall(target, value, useSelfBalance, rOnFailure, data, catchData) {
    return encodePacked(['uint8', 'address', 'uint128', 'uint16', 'bytes', 'uint8', 'uint16', 'bytes'], [uint8(ComposerCommands.EXT_TRY_CALL), target, generateAmountBitmap(uint128(value), false, useSelfBalance), uint16(data.length / 2 - 1), data, uint8(rOnFailure ? 0 : 1), uint16(catchData.length / 2 - 1), catchData]);
}
export function encodeExternalCallWithReplace(target, value, useSelfBalance, token, replaceOffset, data) {
    return encodePacked(['uint8', 'address', 'uint128', 'address', 'uint16', 'uint16', 'bytes'], [uint8(ComposerCommands.EXT_CALL_WITH_REPLACE), target, generateAmountBitmap(uint128(value), false, useSelfBalance), token, replaceOffset, uint16(data.length / 2 - 1), data]);
}
export function encodeTryExternalCallWithReplace(target, value, useSelfBalance, token, replaceOffset, data, rOnFailure, catchData) {
    return encodePacked(['uint8', 'address', 'uint128', 'address', 'uint16', 'uint16', 'uint8', 'uint16', 'bytes', 'bytes'], [uint8(ComposerCommands.EXT_TRY_CALL_WITH_REPLACE), target, generateAmountBitmap(uint128(value), false, useSelfBalance), token, replaceOffset, uint16(data.length / 2 - 1), uint8(rOnFailure ? 0 : 1), uint16(catchData.length / 2 - 1), data, catchData]);
}
export function encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions) {
    const partialData = encodeStargateV2BridgePartial(amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions);
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint32', 'bytes32', 'address', 'bytes'], [uint8(ComposerCommands.BRIDGING), uint8(BridgeIds.STARGATE_V2), asset, stargatePool, dstEid, receiver, refundReceiver, partialData]);
}
export function encodePermit(permitId, target, data) {
    return encodePacked(['uint8', 'uint8', 'address', 'uint16', 'bytes'], [uint8(ComposerCommands.PERMIT), uint8(permitId), target, uint16(data.length / 2 - 1), data]);
}
export function encodeStargateV2BridgePartial(amount, slippage, fee, isBusMode, isNative, composeMsg, extraOptions) {
    return encodePacked(['uint128', 'uint32', 'uint128', 'uint8', 'uint16', 'uint16', 'bytes', 'bytes'], [generateAmountBitmap(uint128(amount), false, isNative), slippage, uint128(fee), uint8(isBusMode ? 1 : 0), uint16(composeMsg.length / 2 - 1), uint16(extraOptions.length / 2 - 1), composeMsg, extraOptions]);
}
export function encodeStargateV2BridgeSimpleTaxi(asset, stargatePool, dstEid, receiver, refundReceiver, amount, isNative, slippage, fee) {
    return encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, false, isNative, newbytes(0), newbytes(0));
}
export function encodeStargateV2BridgeSimpleBus(asset, stargatePool, dstEid, receiver, refundReceiver, amount, isNative, slippage, fee) {
    return encodeStargateV2Bridge(asset, stargatePool, dstEid, receiver, refundReceiver, amount, slippage, fee, true, isNative, newbytes(0), newbytes(0));
}
export function encodeAcrossBridgeToken(spokePool, depositor, sendingAssetId, receivingAssetId, amount, fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return encodePacked(['bytes', 'bytes'], [encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, false), encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message)]);
}
export function encodeAcrossBridgeNative(spokePool, depositor, sendingAssetId, receivingAssetId, amount, fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return encodePacked(['bytes', 'bytes'], [encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, true), encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message)]);
}
export function encodeAcrossHeader(spokePool, depositor, sendingAssetId, receivingAssetId, amount, isNative) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'address', 'bytes32', 'uint128'], [uint8(ComposerCommands.BRIDGING), uint8(BridgeIds.ACROSS), spokePool, depositor, sendingAssetId, receivingAssetId, generateAmountBitmap(uint128(amount), false, isNative)]);
}
export function encodeAcrossParams(fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, message) {
    return encodePacked(['uint128', 'uint32', 'uint32', 'uint8', 'uint8', 'bytes32', 'uint32', 'uint16', 'bytes'], [fixedFee, feePercentage, destinationChainId, fromTokenDecimals, toTokenDecimals, receiver, deadline, uint16(message.length / 2 - 1), message]);
}
export function encodeSquidRouterCall(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload, gasRefundRecipient, enableExpress, nativeAmount) {
    const partialData = encodeSquidRouterCallPartial(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload);
    return encodePacked(['bytes', 'uint128', 'address', 'uint8', 'bytes', 'bytes', 'bytes', 'bytes'], [partialData, uint128(nativeAmount), gasRefundRecipient, uint8(enableExpress ? 1 : 0), bridgedTokenSymbol, destinationChain, destinationAddress, payload]);
}
export function encodeSquidRouterCallPartial(asset, gateway, bridgedTokenSymbol, amount, destinationChain, destinationAddress, payload) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint16', 'uint16', 'uint16', 'uint16', 'uint128'], [uint8(ComposerCommands.BRIDGING), uint8(BridgeIds.SQUID_ROUTER), gateway, asset, uint16(bridgedTokenSymbol.length / 2 - 1), uint16(destinationChain.length / 2 - 1), uint16(destinationAddress.length / 2 - 1), uint16(payload.length / 2 - 1), uint128(amount)]);
}
export function encodeGasZipBridge(gasZipRouter, receiver, amount, destinationChainId) {
    return encodePacked(['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'], [uint8(ComposerCommands.BRIDGING), uint8(BridgeIds.GASZIP), gasZipRouter, receiver, uint128(amount), destinationChainId]);
}
export function encodeGasZipEvmBridge(gasZipRouter, receiver, amount, destinationChainId) {
    return encodePacked(['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'], [uint8(ComposerCommands.BRIDGING), uint8(BridgeIds.GASZIP), gasZipRouter, rightPadZero(receiver), uint128(amount), destinationChainId]);
}
export function encodePermit2TransferFrom(token, receiver, amount) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint128'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.PERMIT2_TRANSFER_FROM), token, receiver, uint128(amount)]);
}
export function encodeNextGenDexUnlock(singleton, id, d) {
    return encodePacked(['uint8', 'uint8', 'address', 'uint16', 'uint8', 'bytes'], [uint8(ComposerCommands.GEN_2025_SINGELTONS), uint8(Gen2025ActionIds.UNLOCK), singleton, uint16(d.length / 2 - 1 + 1), uint8(id), d]);
}
export function encodeBalancerV3FlashLoan(singleton, poolId, asset, receiver, amount, flashData) {
    const take = encodeBalancerV3Take(singleton, asset, receiver, amount);
    const settle = encodeNextGenDexSettleBalancer(singleton, asset, amount);
    return encodeNextGenDexUnlock(singleton, poolId, encodeBalancerV3FlashLoanData(take, flashData, settle));
}
export function encodeBalancerV3FlashLoanData(take, flashData, settle) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [take, flashData, settle]);
}
export function encodeUniswapV4FlashLoan(singleton, poolId, asset, receiver, amount, flashData) {
    const take = encodeUniswapV4Take(singleton, asset, receiver, amount);
    const settle = encodeNextGenDexSettle(singleton, asset === zeroAddress ? amount : 0);
    const sync = encodeUniswapV4Sync(singleton, asset);
    return encodeNextGenDexUnlock(singleton, poolId, encodeUniswapV4FlashLoanData(take, sync, flashData, settle));
}
export function encodeUniswapV4FlashLoanData(take, sync, flashData, settle) {
    return encodePacked(['bytes', 'bytes', 'bytes', 'bytes'], [take, sync, flashData, settle]);
}
export function encodeBalancerV3Take(singleton, asset, receiver, amount) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'address', 'uint128'], [uint8(ComposerCommands.GEN_2025_SINGELTONS), uint8(Gen2025ActionIds.BAL_V3_TAKE), singleton, asset, receiver, uint128(amount)]);
}
export function encodeUniswapV4Sync(singleton, asset) {
    if (asset === zeroAddress)
        return `0x0`;
    ;
    return encodePacked(['uint8', 'uint8', 'address', 'address'], [uint8(ComposerCommands.GEN_2025_SINGELTONS), uint8(Gen2025ActionIds.UNI_V4_SYNC), singleton, asset]);
}
export function encodeUniswapV4Take(singleton, asset, receiver, amount) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'address', 'uint128'], [uint8(ComposerCommands.GEN_2025_SINGELTONS), uint8(Gen2025ActionIds.UNI_V4_TAKE), singleton, asset, receiver, uint128(amount)]);
}
export function encodeNextGenDexSettle(singleton, nativeAmount) {
    return encodePacked(['uint8', 'uint8', 'address', 'uint128'], [uint8(ComposerCommands.GEN_2025_SINGELTONS), uint8(Gen2025ActionIds.UNI_V4_SETTLE), singleton, uint128(nativeAmount)]);
}
export function encodeNextGenDexSettleBalancer(singleton, asset, amountHint) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint128'], [uint8(ComposerCommands.GEN_2025_SINGELTONS), uint8(Gen2025ActionIds.BAL_V3_SETTLE), singleton, asset, uint128(amountHint >= 0xffffffffffffffffffffffffffffffn ? 0xffffffffffffffffffffffffffffffn : amountHint)]);
}
export function encodeTransferIn(asset, receiver, amount) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint128'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.TRANSFER_FROM), asset, receiver, uint128(amount)]);
}
export function encodeSweep(asset, receiver, amount, sweepType) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.SWEEP), asset, receiver, sweepType, uint128(amount)]);
}
export function encodeWrap(amount, wrapTarget) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.SWEEP), zeroAddress, wrapTarget, uint8(SweepType.AMOUNT), uint128(amount)]);
}
export function encodeWrapWithReceiver(amount, weth, receiver) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint128'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.WRAP), weth, receiver, uint128(amount)]);
}
export function encodeApprove(asset, target) {
    return encodePacked(['uint8', 'uint8', 'address', 'address'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.APPROVE), asset, target]);
}
export function encodeSweepNft(collection, receiver, tokenId) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint256'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.SWEEP_NFT), collection, receiver, tokenId]);
}
export function encodeUnwrap(target, receiver, amount, sweepType) {
    return encodePacked(['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'], [uint8(ComposerCommands.TRANSFERS), uint8(TransferIds.UNWRAP_WNATIVE), target, receiver, sweepType, uint128(amount)]);
}
export function encodeBalancerV2FlashLoan(asset, amount, poolId, data) {
    return encodePacked(['uint8', 'uint8', 'address', 'uint128', 'uint16', 'bytes'], [uint8(ComposerCommands.FLASH_LOAN), uint8(FlashLoanIds.BALANCER_V2), asset, uint128(amount), uint16(data.length / 2 - 1 + 1), encodeUint8AndBytes(poolId, data)]);
}
export function encodeFlashLoan(asset, amount, pool, poolType, poolId, data) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'address', 'address', 'uint128', 'uint16', 'bytes'], [encodeApprove(asset, pool), uint8(ComposerCommands.FLASH_LOAN), poolType, asset, pool, uint128(amount), uint16(data.length / 2 - 1 + 1), encodeUint8AndBytes(poolId, data)]);
}
export function encodeUint8AndBytes(poolId, data) {
    return encodePacked(['uint8', 'bytes'], [uint8(poolId), data]);
}
export function encodeMorphoMarket(loanToken, collateralToken, oracle, irm, lltv) {
    return encodePacked(['address', 'address', 'address', 'address', 'uint128'], [loanToken, collateralToken, oracle, irm, uint128(lltv)]);
}
export function encodeMorphoDepositCollateral(market, assets, receiver, data, morphoB, pId) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [encodeApprove(getMorphoCollateral(market), morphoB), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_MORPHO - 1), market, uint128(assets), receiver, morphoB, uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? newbytes(0) : encodeUint8AndBytes(uint8(pId), data)]);
}
export function encodeListaSupplyCollateralViaProvider(market, assets, receiver, data, provider, pId) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), false, true), receiver, provider, uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? newbytes(0) : encodeUint8AndBytes(uint8(pId), data)]);
}
export function encodeMorphoDeposit(market, isShares, assets, receiver, data, morphoB, pId) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [encodeApprove(getMorphoLoanAsset(market), morphoB), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT_LENDING_TOKEN), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), isShares, false), receiver, morphoB, uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? newbytes(0) : encodeUint8AndBytes(uint8(pId), data)]);
}
export function encodeErc4626Deposit(asset, vault, isShares, assets, receiver) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'address', 'address', 'uint128', 'address'], [encodeApprove(asset, vault), uint8(ComposerCommands.ERC4626), uint8(0), asset, vault, generateAmountBitmap(uint128(assets), isShares, false), receiver]);
}
export function encodeErc4646Withdraw(vault, isShares, assets, receiver) {
    return encodePacked(['uint8', 'uint8', 'address', 'uint128', 'address'], [uint8(ComposerCommands.ERC4626), uint8(1), vault, generateAmountBitmap(uint128(assets), isShares, false), receiver]);
}
export function encodeMorphoWithdraw(market, isShares, assets, receiver, morphoB) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW_LENDING_TOKEN), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), isShares, false), receiver, morphoB]);
}
export function encodeMorphoWithdrawCollateral(market, assets, receiver, morphoB) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_MORPHO - 1), market, uint128(assets), receiver, morphoB]);
}
export function encodeListaWithdrawCollateralViaProvider(market, assets, receiver, provider) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), false, true), receiver, provider]);
}
export function encodeMorphoBorrow(market, isShares, assets, receiver, morphoB) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), isShares, false), receiver, morphoB]);
}
export function encodeMorphoRepay(market, isShares, assets, receiver, data, morphoB, pId) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [encodeApprove(getMorphoLoanAsset(market), morphoB), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), isShares, false), receiver, morphoB, uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? newbytes(0) : encodeUint8AndBytes(uint8(pId), data)]);
}
export function encodeListaRepayViaProvider(market, isShares, assets, receiver, data, morphoB, pId) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address', 'uint16', 'bytes'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_MORPHO - 1), market, generateAmountBitmap(uint128(assets), isShares, true), receiver, morphoB, uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0), data.length / 2 - 1 === 0 ? newbytes(0) : encodeUint8AndBytes(uint8(pId), data)]);
}
export function encodeAaveDeposit(token, amount, receiver, pool) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, pool), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_AAVE_V3 - 1), token, uint128(amount), receiver, pool]);
}
export function encodeAaveBorrow(token, amount, receiver, mode, pool) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_AAVE_V3 - 1), token, uint128(amount), receiver, uint8(mode), pool]);
}
export function encodeAaveRepay(token, amount, receiver, mode, dToken, pool) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address', 'address'], [encodeApprove(token, pool), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_AAVE_V3 - 1), token, uint128(amount), receiver, uint8(mode), dToken, pool]);
}
export function encodeAaveWithdraw(token, amount, receiver, aToken, pool) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_AAVE_V3 - 1), token, uint128(amount), receiver, aToken, pool]);
}
export function encodeAaveV2Deposit(token, amount, receiver, pool) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, pool), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_AAVE_V2 - 1), token, uint128(amount), receiver, pool]);
}
export function encodeAaveV2Borrow(token, amount, receiver, mode, pool) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_AAVE_V2 - 1), token, uint128(amount), receiver, uint8(mode), pool]);
}
export function encodeAaveV2Repay(token, amount, receiver, mode, dToken, pool) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address', 'address'], [encodeApprove(token, pool), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_AAVE_V2 - 1), token, uint128(amount), receiver, uint8(mode), dToken, pool]);
}
export function encodeAaveV2Withdraw(token, amount, receiver, aToken, pool) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_AAVE_V2 - 1), token, uint128(amount), receiver, aToken, pool]);
}
export function encodeCompoundV3Deposit(token, amount, receiver, comet) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, comet), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_COMPOUND_V3 - 1), token, uint128(amount), receiver, comet]);
}
export function encodeCompoundV3Borrow(token, amount, receiver, comet) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_COMPOUND_V3 - 1), token, uint128(amount), receiver, comet]);
}
export function encodeCompoundV3Repay(token, amount, receiver, comet) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(token, comet), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_COMPOUND_V3 - 1), token, uint128(amount), receiver, comet]);
}
export function encodeCompoundV3Withdraw(token, amount, receiver, comet, isBase) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_COMPOUND_V3 - 1), token, uint128(amount), receiver, isBase ? uint8(1) : uint8(0), comet]);
}
export function encodeCompoundV2Deposit(token, amount, receiver, cToken, selectorId) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === zeroAddress ? newbytes(0) : encodeApprove(token, cToken), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_COMPOUND_V2 - 1), token, encodeCompoundV2SelectorId(uint128(amount), selectorId), receiver, cToken]);
}
export function encodeSiloV2Deposit(token, amount, receiver, silo, collateralMode) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === zeroAddress ? newbytes(0) : encodeApprove(token, silo), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_SILO_V2 - 1), token, encodeSiloV2CollateralMode(uint128(amount), collateralMode), receiver, silo]);
}
export function encodeSiloV2Borrow(amount, receiver, silo) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_SILO_V2 - 1), uint128(amount), receiver, silo]);
}
export function encodeCompoundV2Borrow(token, amount, receiver, cToken) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_COMPOUND_V2 - 1), token, uint128(amount), receiver, cToken]);
}
export function encodeCompoundV2Repay(token, amount, receiver, cToken) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === zeroAddress ? newbytes(0) : encodeApprove(token, cToken), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_COMPOUND_V2 - 1), token, uint128(amount), receiver, cToken]);
}
export function encodeCompoundV2Withdraw(token, amount, receiver, cToken, selectorId) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_COMPOUND_V2 - 1), token, encodeCompoundV2SelectorId(uint128(amount), selectorId), receiver, cToken]);
}
export function encodeSiloV2Withdraw(amount, receiver, silo, collateralMode) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_SILO_V2 - 1), encodeSiloV2CollateralMode(uint128(amount), collateralMode), receiver, silo]);
}
export function encodeSiloV2Repay(token, amount, receiver, silo) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [token === zeroAddress ? newbytes(0) : encodeApprove(token, silo), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_SILO_V2 - 1), token, uint128(amount), receiver, silo]);
}
export function encodeAaveV4Deposit(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint256', 'address', 'address'], [encodeApprove(underlying, positionManager), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_AAVE_V4 - 1), underlying, uint128(amount), receiver, reserveId, spoke, positionManager]);
}
export function encodeAaveV4Borrow(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint256', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_AAVE_V4 - 1), underlying, uint128(amount), receiver, reserveId, spoke, positionManager]);
}
export function encodeAaveV4Repay(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint256', 'address', 'address'], [encodeApprove(underlying, positionManager), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_AAVE_V4 - 1), underlying, uint128(amount), receiver, reserveId, spoke, positionManager]);
}
export function encodeAaveV4Withdraw(underlying, amount, receiver, reserveId, spoke, positionManager) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint256', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_AAVE_V4 - 1), underlying, uint128(amount), receiver, reserveId, spoke, positionManager]);
}
export function encodeAaveV4SetCollateral(reserveId, enable, spoke, configPositionManager) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'uint256', 'uint8', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.SET_COLLATERAL), uint16(LenderIds.UP_TO_AAVE_V4 - 1), reserveId, uint8(enable ? 1 : 0), spoke, configPositionManager]);
}
export function encodeAaveV4BorrowPermit(takerPM, spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs) {
    const data = encodePacked(['address', 'uint256', 'uint256', 'uint256', 'uint32', 'bytes32', 'bytes32'], [spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs]);
    return encodePermit(PermitIds.AAVE_V4_BORROW_PERMIT, takerPM, data);
}
export function encodeAaveV4WithdrawPermit(takerPM, spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs) {
    const data = encodePacked(['address', 'uint256', 'uint256', 'uint256', 'uint32', 'bytes32', 'bytes32'], [spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs]);
    return encodePermit(PermitIds.AAVE_V4_WITHDRAW_PERMIT, takerPM, data);
}
export function encodeAaveV4ConfigPermit(configPM, spoke, status, nonce, deadlinePlusOne, r, vs) {
    const data = encodePacked(['address', 'uint8', 'uint256', 'uint32', 'bytes32', 'bytes32'], [spoke, uint8(status ? 1 : 0), nonce, deadlinePlusOne, r, vs]);
    return encodePermit(PermitIds.AAVE_V4_CONFIG_PERMIT, configPM, data);
}
export function encodeFluidT1Operate(colUnderlying, debtUnderlying, colAmount, debtAmount, nftId, receiver, nftReceiver, vault) {
    let approvals = "0x";
    if (colUnderlying !== zeroAddress && _fluidIsDepositAmount(colAmount)) {
        approvals = encodePacked(['bytes', 'bytes'], [approvals, encodeApprove(colUnderlying, vault)]);
    }
    if (debtUnderlying !== zeroAddress && _fluidIsRepayAmount(debtAmount)) {
        approvals = encodePacked(['bytes', 'bytes'], [approvals, encodeApprove(debtUnderlying, vault)]);
    }
    const body = encodePacked(['address', 'address', 'int128', 'int128', 'uint256', 'address', 'address', 'address'], [colUnderlying, debtUnderlying, colAmount, debtAmount, nftId, receiver, nftReceiver, vault]);
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'bytes'], [approvals, uint8(ComposerCommands.LENDING), uint8(LenderOps.FLUID_OPERATE_T1), uint16(LenderIds.UP_TO_FLUID - 1), body]);
}
export function _fluidIsDepositAmount(a) {
    return a > 0;
}
export function _fluidIsRepayAmount(a) {
    return a < 0;
}
export function encodeFluidDeposit(underlying, amount, nftId, receiver, vault) {
    let colAmount = amount === 0n ? ((1n << 127n) - 1n) : int128(amount);
    return encodeFluidT1Operate(underlying, zeroAddress, colAmount, 0, nftId, receiver, zeroAddress, vault);
}
export function encodeFluidBorrow(underlying, amount, nftId, receiver, vault) {
    return encodeFluidT1Operate(zeroAddress, underlying, 0, int128(amount), nftId, receiver, zeroAddress, vault);
}
export function encodeFluidRepay(underlying, amount, nftId, receiver, vault) {
    let debtAmount = (amount === 0n || amount === ((1n << 112n) - 1n)) ? (-(1n << 127n)) : -int128(amount);
    return encodeFluidT1Operate(zeroAddress, underlying, 0, debtAmount, nftId, receiver, zeroAddress, vault);
}
export function encodeFluidWithdraw(underlying, amount, nftId, receiver, vault) {
    let colAmount = amount === ((1n << 112n) - 1n) ? (-(1n << 127n)) : -int128(amount);
    return encodeFluidT1Operate(underlying, zeroAddress, colAmount, 0, nftId, receiver, zeroAddress, vault);
}
export function _fluidSmartHeader(vaultType, callValue, nftId, receiver, nftReceiver, vault, isPerfect) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'uint8', 'uint128', 'uint256', 'address', 'address', 'address'], [uint8(ComposerCommands.LENDING), isPerfect ? uint8(LenderOps.FLUID_OPERATE_PERFECT) : uint8(LenderOps.FLUID_OPERATE), uint16(LenderIds.UP_TO_FLUID_SMART - 1), vaultType, callValue, nftId, receiver, nftReceiver, vault]);
}
export function _fluidSmartTokens4(t) {
    return encodePacked(['address', 'address', 'address', 'address'], [t[0], t[1], t[2], t[3]]);
}
export function _fluidSmartTokens6(t) {
    return encodePacked(['address', 'address', 'address', 'address', 'address', 'address'], [t[0], t[1], t[2], t[3], t[4], t[5]]);
}
export function _fluidSmartAmounts4(a) {
    return encodePacked(['int256', 'int256', 'int256', 'int256'], [a[0], a[1], a[2], a[3]]);
}
export function _fluidSmartAmounts6(a) {
    return encodePacked(['int256', 'int256', 'int256', 'int256', 'int256', 'int256'], [a[0], a[1], a[2], a[3], a[4], a[5]]);
}
export function encodeFluidSmartOperateT2(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [_fluidSmartHeader(2, callValue, nftId, receiver, nftReceiver, vault, false), _fluidSmartTokens4(tokens), _fluidSmartAmounts4(amounts)]);
}
export function encodeFluidSmartOperateT3(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [_fluidSmartHeader(3, callValue, nftId, receiver, nftReceiver, vault, false), _fluidSmartTokens4(tokens), _fluidSmartAmounts4(amounts)]);
}
export function encodeFluidSmartOperateT4(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [_fluidSmartHeader(4, callValue, nftId, receiver, nftReceiver, vault, false), _fluidSmartTokens6(tokens), _fluidSmartAmounts6(amounts)]);
}
export function encodeFluidSmartOperatePerfectT2(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [_fluidSmartHeader(2, callValue, nftId, receiver, nftReceiver, vault, true), _fluidSmartTokens4(tokens), _fluidSmartAmounts4(amounts)]);
}
export function encodeFluidSmartOperatePerfectT3(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [_fluidSmartHeader(3, callValue, nftId, receiver, nftReceiver, vault, true), _fluidSmartTokens4(tokens), _fluidSmartAmounts4(amounts)]);
}
export function encodeFluidSmartOperatePerfectT4(callValue, nftId, receiver, nftReceiver, vault, tokens, amounts) {
    return encodePacked(['bytes', 'bytes', 'bytes'], [_fluidSmartHeader(4, callValue, nftId, receiver, nftReceiver, vault, true), _fluidSmartTokens6(tokens), _fluidSmartAmounts6(amounts)]);
}
export function encodeFluidFTokenDeposit(underlying, amount, receiver, fToken) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [encodeApprove(underlying, fToken), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT_LENDING_TOKEN), uint16(LenderIds.UP_TO_FLUID - 1), underlying, amount, receiver, fToken]);
}
export function encodeFluidFTokenWithdraw(underlying, amount, receiver, fToken) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW_LENDING_TOKEN), uint16(LenderIds.UP_TO_FLUID - 1), underlying, amount, receiver, fToken]);
}
export function encodeGearboxV3Supply(token, amount, creditAccount, creditManager) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address'], [encodeApprove(token, creditManager), uint8(ComposerCommands.LENDING), uint8(LenderOps.DEPOSIT), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), token, amount, creditAccount]);
}
export function encodeGearboxV3Borrow(underlying, amount, receiver, creditAccount) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.BORROW), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), underlying, amount, receiver, creditAccount]);
}
export function encodeGearboxV3RepayPartial(underlying, amount, creditAccount, creditManager) {
    if (amount === 0n || amount === GEARBOX_REPAY_ALL)
        throw new Error("CL:gearboxpartialrepayneedsliteralamount");
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'uint8'], [encodeApprove(underlying, creditManager), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), underlying, amount, creditAccount, uint8(0)]);
}
export function encodeGearboxV3RepayAll(underlying, creditAccount, creditManager, quotedTokens) {
    if (quotedTokens.length / 2 - 1 > 255)
        throw new Error("CL:gearboxtoomanyquotedtokens");
    let quotedBlob = "0x";
    for (let i = 0n; i < quotedTokens.length / 2 - 1; i++) {
        quotedBlob = encodePacked(['bytes', 'address'], [quotedBlob, quotedTokens[i]]);
    }
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'bytes', 'address', 'uint8', 'bytes'], [encodeApprove(underlying, creditManager), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), underlying, GEARBOX_REPAY_ALL, creditAccount, uint8(quotedTokens.length / 2 - 1), quotedBlob]);
}
export function encodeGearboxV3RepayPartialMax(underlying, creditAccount, creditManager) {
    return encodePacked(['bytes', 'uint8', 'uint8', 'uint16', 'address', 'bytes', 'address', 'uint8'], [encodeApprove(underlying, creditManager), uint8(ComposerCommands.LENDING), uint8(LenderOps.REPAY), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), underlying, GEARBOX_REPAY_ALL, creditAccount, uint8(0)]);
}
export function encodeGearboxV3Withdraw(token, amount, receiver, creditAccount) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.WITHDRAW), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), token, amount, receiver, creditAccount]);
}
export function encodeGearboxV3FacadeCall(innerCallData) {
    if (innerCallData.length / 2 - 1 > type(uint16).max)
        throw new Error("CL:gearboxsub-calltoolong");
    return encodePacked(['uint16', 'bytes'], [uint16(innerCallData.length / 2 - 1), innerCallData]);
}
export function encodeGearboxV3BotMulticall(creditAccount, numCalls, calls) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'uint8', 'address', 'address', 'bytes32', 'uint16', 'bytes'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.GEARBOX_MULTICALL), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), uint8(0), creditAccount, zeroAddress, bytes32(0), numCalls, calls]);
}
export function encodeGearboxV3OpenCreditAccount(creditFacade, referralCode, numCalls, calls) {
    return encodePacked(['uint8', 'uint8', 'uint16', 'uint8', 'address', 'address', 'uint256', 'uint16', 'bytes'], [uint8(ComposerCommands.LENDING), uint8(LenderOps.GEARBOX_MULTICALL), uint16(LenderIds.UP_TO_GEARBOX_V3 - 1), uint8(1), creditFacade, zeroAddress, referralCode, numCalls, calls]);
}
