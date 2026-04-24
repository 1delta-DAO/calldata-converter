import { type Hex, type Address } from "viem";
export declare enum SweepType {
    VALIDATE = 0,
    AMOUNT = 1
}
export declare enum TransferIds {
    TRANSFER_FROM = 0,
    SWEEP = 1,
    WRAP_NATIVE = 2,
    UNWRAP_WNATIVE = 3,
    PERMIT2_TRANSFER_FROM = 4,
    APPROVE = 5,
    WRAP = 6,
    SWEEP_NFT = 7
}
export declare enum PermitIds {
    TOKEN_PERMIT = 0,
    AAVE_V3_CREDIT_PERMIT = 1,
    ALLOW_CREDIT_PERMIT = 2,
    AAVE_V4_BORROW_PERMIT = 3,
    AAVE_V4_WITHDRAW_PERMIT = 4,
    AAVE_V4_CONFIG_PERMIT = 5,
    AAVE_V4_PMS_BATCH_PERMIT = 6
}
export declare enum LenderIds {
    UP_TO_AAVE_V3 = 1000,
    UP_TO_AAVE_V2 = 2000,
    UP_TO_COMPOUND_V3 = 3000,
    UP_TO_COMPOUND_V2 = 4000,
    UP_TO_MORPHO = 5000,
    UP_TO_SILO_V2 = 6000,
    UP_TO_AAVE_V4 = 7000,
    UP_TO_FLUID = 8000,
    UP_TO_FLUID_SMART = 9000,
    UP_TO_GEARBOX_V3 = 10000
}
export declare enum LenderOps {
    DEPOSIT = 0,
    BORROW = 1,
    REPAY = 2,
    WITHDRAW = 3,
    DEPOSIT_LENDING_TOKEN = 4,
    WITHDRAW_LENDING_TOKEN = 5,
    SET_COLLATERAL = 6,
    FLUID_OPERATE = 10,
    FLUID_OPERATE_PERFECT = 11,
    FLUID_OPERATE_T1 = 12,
    GEARBOX_MULTICALL = 13
}
export declare enum FlashLoanIds {
    MORPHO = 0,
    BALANCER_V2 = 1,
    AAVE_V3 = 2,
    AAVE_V2 = 3
}
export declare enum ERC4626Ids {
    DEPOSIT = 0,
    WITHDRAW = 1
}
export declare enum Gen2025ActionIds {
    UNLOCK = 0,
    UNI_V4_TAKE = 1,
    UNI_V4_SETTLE = 2,
    UNI_V4_SYNC = 3,
    BAL_V3_TAKE = 4,
    BAL_V3_SETTLE = 5
}
export declare enum ComposerCommands {
    EXT_CALL = 32,
    EXT_TRY_CALL = 33,
    EXT_CALL_WITH_REPLACE = 34,
    EXT_TRY_CALL_WITH_REPLACE = 35,
    LENDING = 48,
    TRANSFERS = 64,
    PERMIT = 80,
    FLASH_LOAN = 96,
    ERC4626 = 112,
    GEN_2025_SINGELTONS = 128,
    BRIDGING = 144
}
export declare enum BridgeIds {
    STARGATE_V2 = 0,
    ACROSS = 10,
    SQUID_ROUTER = 20,
    GASZIP = 30
}
export declare enum CompoundV2Selector {
    MINT_BEHALF = 0,
    MINT = 1,
    MINT_ITOKEN = 2,
    REDEEM = 0,
    REDEEM_BEHALF = 1,
    REDEEM_ITOKEN = 2
}
export declare enum SiloV2CollateralType {
    PROTECTED = 0,
    COLLATERAL = 1
}
export declare function encodeExternalCall(target: Address, value: bigint, useSelfBalance: boolean, data: Hex): Hex;
export declare function encodeTryExternalCall(target: Address, value: bigint, useSelfBalance: boolean, rOnFailure: boolean, data: Hex, catchData: Hex): Hex;
export declare function encodeExternalCallWithReplace(target: Address, value: bigint, useSelfBalance: boolean, token: Address, replaceOffset: number, data: Hex): Hex;
export declare function encodeTryExternalCallWithReplace(target: Address, value: bigint, useSelfBalance: boolean, token: Address, replaceOffset: number, data: Hex, rOnFailure: boolean, catchData: Hex): Hex;
export declare function encodeStargateV2Bridge(asset: Address, stargatePool: Address, dstEid: number, receiver: Hex, refundReceiver: Address, amount: bigint, slippage: number, fee: bigint, isBusMode: boolean, isNative: boolean, composeMsg: Hex, extraOptions: Hex): Hex;
export declare function encodePermit(permitId: bigint, target: Address, data: Hex): Hex;
export declare function encodeStargateV2BridgePartial(amount: bigint, slippage: number, fee: bigint, isBusMode: boolean, isNative: boolean, composeMsg: Hex, extraOptions: Hex): Hex;
export declare function encodeStargateV2BridgeSimpleTaxi(asset: Address, stargatePool: Address, dstEid: number, receiver: Hex, refundReceiver: Address, amount: bigint, isNative: boolean, slippage: number, fee: bigint): Hex;
export declare function encodeStargateV2BridgeSimpleBus(asset: Address, stargatePool: Address, dstEid: number, receiver: Hex, refundReceiver: Address, amount: bigint, isNative: boolean, slippage: number, fee: bigint): Hex;
export declare function encodeAcrossBridgeToken(spokePool: Address, depositor: Address, sendingAssetId: Address, receivingAssetId: Hex, amount: bigint, fixedFee: bigint, feePercentage: number, destinationChainId: number, fromTokenDecimals: number, toTokenDecimals: number, receiver: Hex, deadline: number, message: Hex): Hex;
export declare function encodeAcrossBridgeNative(spokePool: Address, depositor: Address, sendingAssetId: Address, receivingAssetId: Hex, amount: bigint, fixedFee: bigint, feePercentage: number, destinationChainId: number, fromTokenDecimals: number, toTokenDecimals: number, receiver: Hex, deadline: number, message: Hex): Hex;
export declare function encodeAcrossHeader(spokePool: Address, depositor: Address, sendingAssetId: Address, receivingAssetId: Hex, amount: bigint, isNative: boolean): Hex;
export declare function encodeAcrossParams(fixedFee: bigint, feePercentage: number, destinationChainId: number, fromTokenDecimals: number, toTokenDecimals: number, receiver: Hex, deadline: number, message: Hex): Hex;
export declare function encodeSquidRouterCall(asset: Address, gateway: Address, bridgedTokenSymbol: Hex, amount: bigint, destinationChain: Hex, destinationAddress: Hex, payload: Hex, gasRefundRecipient: Address, enableExpress: boolean, nativeAmount: bigint): Hex;
export declare function encodeSquidRouterCallPartial(asset: Address, gateway: Address, bridgedTokenSymbol: Hex, amount: bigint, destinationChain: Hex, destinationAddress: Hex, payload: Hex): Hex;
export declare function encodeGasZipBridge(gasZipRouter: Address, receiver: Hex, amount: bigint, destinationChainId: bigint): Hex;
export declare function encodeGasZipEvmBridge(gasZipRouter: Address, receiver: Address, amount: bigint, destinationChainId: bigint): Hex;
export declare function encodePermit2TransferFrom(token: Address, receiver: Address, amount: bigint): Hex;
export declare function encodeNextGenDexUnlock(singleton: Address, id: bigint, d: Hex): Hex;
export declare function encodeBalancerV3FlashLoan(singleton: Address, poolId: bigint, asset: Address, receiver: Address, amount: bigint, flashData: Hex): Hex;
export declare function encodeBalancerV3FlashLoanData(take: Hex, flashData: Hex, settle: Hex): Hex;
export declare function encodeUniswapV4FlashLoan(singleton: Address, poolId: bigint, asset: Address, receiver: Address, amount: bigint, flashData: Hex): Hex;
export declare function encodeUniswapV4FlashLoanData(take: Hex, sync: Hex, flashData: Hex, settle: Hex): Hex;
export declare function encodeBalancerV3Take(singleton: Address, asset: Address, receiver: Address, amount: bigint): Hex;
export declare function encodeUniswapV4Sync(singleton: Address, asset: Address): Hex;
export declare function encodeUniswapV4Take(singleton: Address, asset: Address, receiver: Address, amount: bigint): Hex;
export declare function encodeNextGenDexSettle(singleton: Address, nativeAmount: bigint): Hex;
export declare function encodeNextGenDexSettleBalancer(singleton: Address, asset: Address, amountHint: bigint): Hex;
export declare function encodeTransferIn(asset: Address, receiver: Address, amount: bigint): Hex;
export declare function encodeSweep(asset: Address, receiver: Address, amount: bigint, sweepType: any): Hex;
export declare function encodeWrap(amount: bigint, wrapTarget: Address): Hex;
export declare function encodeWrapWithReceiver(amount: bigint, weth: Address, receiver: Address): Hex;
export declare function encodeApprove(asset: Address, target: Address): Hex;
export declare function encodeSweepNft(collection: Address, receiver: Address, tokenId: bigint): Hex;
export declare function encodeUnwrap(target: Address, receiver: Address, amount: bigint, sweepType: any): Hex;
export declare function encodeBalancerV2FlashLoan(asset: Address, amount: bigint, poolId: number, data: Hex): Hex;
export declare function encodeFlashLoan(asset: Address, amount: bigint, pool: Address, poolType: number, poolId: number, data: Hex): Hex;
export declare function encodeUint8AndBytes(poolId: number, data: Hex): Hex;
export declare function encodeMorphoMarket(loanToken: Address, collateralToken: Address, oracle: Address, irm: Address, lltv: bigint): Hex;
export declare function encodeMorphoDepositCollateral(market: Hex, assets: bigint, receiver: Address, data: Hex, morphoB: Address, pId: bigint): Hex;
export declare function encodeListaSupplyCollateralViaProvider(market: Hex, assets: bigint, receiver: Address, data: Hex, provider: Address, pId: bigint): Hex;
export declare function encodeMorphoDeposit(market: Hex, isShares: boolean, assets: bigint, receiver: Address, data: Hex, morphoB: Address, pId: bigint): Hex;
export declare function encodeErc4626Deposit(asset: Address, vault: Address, isShares: boolean, assets: bigint, receiver: Address): Hex;
export declare function encodeErc4646Withdraw(vault: Address, isShares: boolean, assets: bigint, receiver: Address): Hex;
export declare function encodeMorphoWithdraw(market: Hex, isShares: boolean, assets: bigint, receiver: Address, morphoB: Address): Hex;
export declare function encodeMorphoWithdrawCollateral(market: Hex, assets: bigint, receiver: Address, morphoB: Address): Hex;
export declare function encodeListaWithdrawCollateralViaProvider(market: Hex, assets: bigint, receiver: Address, provider: Address): Hex;
export declare function encodeMorphoBorrow(market: Hex, isShares: boolean, assets: bigint, receiver: Address, morphoB: Address): Hex;
export declare function encodeMorphoRepay(market: Hex, isShares: boolean, assets: bigint, receiver: Address, data: Hex, morphoB: Address, pId: bigint): Hex;
export declare function encodeListaRepayViaProvider(market: Hex, isShares: boolean, assets: bigint, receiver: Address, data: Hex, morphoB: Address, pId: bigint): Hex;
export declare function encodeAaveDeposit(token: Address, amount: bigint, receiver: Address, pool: Address): Hex;
export declare function encodeAaveBorrow(token: Address, amount: bigint, receiver: Address, mode: bigint, pool: Address): Hex;
export declare function encodeAaveRepay(token: Address, amount: bigint, receiver: Address, mode: bigint, dToken: Address, pool: Address): Hex;
export declare function encodeAaveWithdraw(token: Address, amount: bigint, receiver: Address, aToken: Address, pool: Address): Hex;
export declare function encodeAaveV2Deposit(token: Address, amount: bigint, receiver: Address, pool: Address): Hex;
export declare function encodeAaveV2Borrow(token: Address, amount: bigint, receiver: Address, mode: bigint, pool: Address): Hex;
export declare function encodeAaveV2Repay(token: Address, amount: bigint, receiver: Address, mode: bigint, dToken: Address, pool: Address): Hex;
export declare function encodeAaveV2Withdraw(token: Address, amount: bigint, receiver: Address, aToken: Address, pool: Address): Hex;
export declare function encodeCompoundV3Deposit(token: Address, amount: bigint, receiver: Address, comet: Address): Hex;
export declare function encodeCompoundV3Borrow(token: Address, amount: bigint, receiver: Address, comet: Address): Hex;
export declare function encodeCompoundV3Repay(token: Address, amount: bigint, receiver: Address, comet: Address): Hex;
export declare function encodeCompoundV3Withdraw(token: Address, amount: bigint, receiver: Address, comet: Address, isBase: boolean): Hex;
export declare function encodeCompoundV2Deposit(token: Address, amount: bigint, receiver: Address, cToken: Address, selectorId: number): Hex;
export declare function encodeSiloV2Deposit(token: Address, amount: bigint, receiver: Address, silo: Address, collateralMode: number): Hex;
export declare function encodeSiloV2Borrow(amount: bigint, receiver: Address, silo: Address): Hex;
export declare function encodeCompoundV2Borrow(token: Address, amount: bigint, receiver: Address, cToken: Address): Hex;
export declare function encodeCompoundV2Repay(token: Address, amount: bigint, receiver: Address, cToken: Address): Hex;
export declare function encodeCompoundV2Withdraw(token: Address, amount: bigint, receiver: Address, cToken: Address, selectorId: number): Hex;
export declare function encodeSiloV2Withdraw(amount: bigint, receiver: Address, silo: Address, collateralMode: number): Hex;
export declare function encodeSiloV2Repay(token: Address, amount: bigint, receiver: Address, silo: Address): Hex;
export declare function encodeAaveV4Deposit(underlying: Address, amount: bigint, receiver: Address, reserveId: bigint, spoke: Address, positionManager: Address): Hex;
export declare function encodeAaveV4Borrow(underlying: Address, amount: bigint, receiver: Address, reserveId: bigint, spoke: Address, positionManager: Address): Hex;
export declare function encodeAaveV4Repay(underlying: Address, amount: bigint, receiver: Address, reserveId: bigint, spoke: Address, positionManager: Address): Hex;
export declare function encodeAaveV4Withdraw(underlying: Address, amount: bigint, receiver: Address, reserveId: bigint, spoke: Address, positionManager: Address): Hex;
export declare function encodeAaveV4SetCollateral(reserveId: bigint, enable: boolean, spoke: Address, configPositionManager: Address): Hex;
export declare function encodeAaveV4BorrowPermit(takerPM: Address, spoke: Address, reserveId: bigint, amount: bigint, nonce: bigint, deadlinePlusOne: number, r: Hex, vs: Hex): Hex;
export declare function encodeAaveV4WithdrawPermit(takerPM: Address, spoke: Address, reserveId: bigint, amount: bigint, nonce: bigint, deadlinePlusOne: number, r: Hex, vs: Hex): Hex;
export declare function encodeAaveV4ConfigPermit(configPM: Address, spoke: Address, status: boolean, nonce: bigint, deadlinePlusOne: number, r: Hex, vs: Hex): Hex;
export declare function encodeFluidT1Operate(colUnderlying: Address, debtUnderlying: Address, colAmount: bigint, debtAmount: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address): Hex;
export declare function _fluidIsDepositAmount(a: bigint): boolean;
export declare function _fluidIsRepayAmount(a: bigint): boolean;
export declare function encodeFluidDeposit(underlying: Address, amount: bigint, nftId: bigint, receiver: Address, vault: Address): Hex;
export declare function encodeFluidBorrow(underlying: Address, amount: bigint, nftId: bigint, receiver: Address, vault: Address): Hex;
export declare function encodeFluidRepay(underlying: Address, amount: bigint, nftId: bigint, receiver: Address, vault: Address): Hex;
export declare function encodeFluidWithdraw(underlying: Address, amount: bigint, nftId: bigint, receiver: Address, vault: Address): Hex;
export declare function _fluidSmartHeader(vaultType: number, callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, isPerfect: boolean): Hex;
export declare function _fluidSmartTokens4(t: Address[]): Hex;
export declare function _fluidSmartTokens6(t: Address[]): Hex;
export declare function _fluidSmartAmounts4(a: bigint[]): Hex;
export declare function _fluidSmartAmounts6(a: bigint[]): Hex;
export declare function encodeFluidSmartOperateT2(callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, tokens: Address[], amounts: bigint[]): Hex;
export declare function encodeFluidSmartOperateT3(callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, tokens: Address[], amounts: bigint[]): Hex;
export declare function encodeFluidSmartOperateT4(callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, tokens: Address[], amounts: bigint[]): Hex;
export declare function encodeFluidSmartOperatePerfectT2(callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, tokens: Address[], amounts: bigint[]): Hex;
export declare function encodeFluidSmartOperatePerfectT3(callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, tokens: Address[], amounts: bigint[]): Hex;
export declare function encodeFluidSmartOperatePerfectT4(callValue: bigint, nftId: bigint, receiver: Address, nftReceiver: Address, vault: Address, tokens: Address[], amounts: bigint[]): Hex;
export declare function encodeFluidFTokenDeposit(underlying: Address, amount: bigint, receiver: Address, fToken: Address): Hex;
export declare function encodeFluidFTokenWithdraw(underlying: Address, amount: bigint, receiver: Address, fToken: Address): Hex;
export declare function encodeGearboxV3Supply(token: Address, amount: bigint, creditAccount: Address, creditManager: Address): Hex;
export declare function encodeGearboxV3Borrow(underlying: Address, amount: bigint, receiver: Address, creditAccount: Address): Hex;
export declare function encodeGearboxV3RepayPartial(underlying: Address, amount: bigint, creditAccount: Address, creditManager: Address): Hex;
export declare function encodeGearboxV3RepayAll(underlying: Address, creditAccount: Address, creditManager: Address, quotedTokens: Address[]): Hex;
export declare function encodeGearboxV3RepayPartialMax(underlying: Address, creditAccount: Address, creditManager: Address): Hex;
export declare function encodeGearboxV3Withdraw(token: Address, amount: bigint, receiver: Address, creditAccount: Address): Hex;
export declare function encodeGearboxV3FacadeCall(innerCallData: Hex): Hex;
export declare function encodeGearboxV3BotMulticall(creditAccount: Address, numCalls: number, calls: Hex): Hex;
export declare function encodeGearboxV3OpenCreditAccount(creditFacade: Address, referralCode: bigint, numCalls: number, calls: Hex): Hex;
