// @ts-nocheck
import { type Hex, type Address, zeroAddress } from 'viem'
import {
  encodePacked,
  uint128,
  uint8,
  uint112,
  uint16,
  uint256,
  int8,
  int16,
  int32,
  int64,
  int128,
  int256,
  _SHARES_MASK,
  _UNSAFE_AMOUNT,
  generateAmountBitmap,
  newbytes,
  bytes,
  getMorphoCollateral,
  getMorphoLoanAsset,
  rightPadZero,
  encodeCompoundV2SelectorId,
  encodeSiloV2CollateralMode,
  encodeAaveV4PmsBatchPermit,
} from './utils.js'
export enum SweepType {
  VALIDATE = 0,
  AMOUNT = 1,
}

export enum TransferIds {
  TRANSFER_FROM = 0,
  SWEEP = 1,
  WRAP_NATIVE = 2,
  UNWRAP_WNATIVE = 3,
  PERMIT2_TRANSFER_FROM = 4,
  APPROVE = 5,
  WRAP = 6,
  SWEEP_NFT = 7,
}

export enum PermitIds {
  TOKEN_PERMIT = 0,
  AAVE_V3_CREDIT_PERMIT = 1,
  ALLOW_CREDIT_PERMIT = 2,
  AAVE_V4_BORROW_PERMIT = 3,
  AAVE_V4_WITHDRAW_PERMIT = 4,
  AAVE_V4_CONFIG_PERMIT = 5,
  AAVE_V4_PMS_BATCH_PERMIT = 6,
}

export enum LenderIds {
  UP_TO_AAVE_V3 = 1000,
  UP_TO_AAVE_V2 = 2000,
  UP_TO_COMPOUND_V3 = 3000,
  UP_TO_COMPOUND_V2 = 4000,
  UP_TO_MORPHO = 5000,
  UP_TO_SILO_V2 = 6000,
  UP_TO_AAVE_V4 = 7000,
  UP_TO_FLUID = 8000,
  UP_TO_FLUID_SMART = 9000,
  UP_TO_GEARBOX_V3 = 10000,
}

export enum LenderOps {
  DEPOSIT = 0,
  BORROW = 1,
  REPAY = 2,
  WITHDRAW = 3,
  DEPOSIT_LENDING_TOKEN = 4,
  WITHDRAW_LENDING_TOKEN = 5,
  SET_COLLATERAL = 6,
  LISTA_BROKER_BORROW = 7,
  LISTA_BROKER_REPAY = 8,
  FLUID_OPERATE = 10,
  FLUID_OPERATE_PERFECT = 11,
  FLUID_OPERATE_T1 = 12,
  GEARBOX_MULTICALL = 13,
}

export enum FlashLoanIds {
  MORPHO = 0,
  AAVE_V3 = 2,
  AAVE_V2 = 3,
}

export enum ERC4626Ids {
  DEPOSIT = 0,
  WITHDRAW = 1,
}

export enum Gen2025ActionIds {
  UNLOCK = 0,
  UNI_V4_TAKE = 1,
  UNI_V4_SETTLE = 2,
  UNI_V4_SYNC = 3,
  BAL_V3_TAKE = 4,
  BAL_V3_SETTLE = 5,
}

export enum ComposerCommands {
  EXT_CALL = 0x20,
  EXT_TRY_CALL = 0x21,
  EXT_CALL_WITH_REPLACE = 0x22,
  EXT_TRY_CALL_WITH_REPLACE = 0x23,
  LENDING = 0x30,
  TRANSFERS = 0x40,
  PERMIT = 0x50,
  FLASH_LOAN = 0x60,
  ERC4626 = 0x70,
  GEN_2025_SINGELTONS = 0x80,
  BRIDGING = 0x90,
}

export enum BridgeIds {
  STARGATE_V2 = 0x00,
  ACROSS = 0x0a,
  SQUID_ROUTER = 0x14,
  GASZIP = 0x1e,
}

export enum CompoundV2Selector {
  MINT_BEHALF = 0,
  MINT = 1,
  MINT_ITOKEN = 2,
  REDEEM = 0,
  REDEEM_BEHALF = 1,
  REDEEM_ITOKEN = 2,
}

export enum SiloV2CollateralType {
  PROTECTED = 0,
  COLLATERAL = 1,
}

export const LISTA_BROKER_DYNAMIC_LOAN: bigint = (1n << 128n) - 1n

export const NATIVE_FLAG: bigint = 1n << 127n

export const USE_SHARES_FLAG: bigint = 1n << 126n

export const UPPER_128BITS: bigint = 120n

export const FLUID_ALL: bigint = -(1n << 127n)

export const FLUID_USE_BALANCE: bigint = (1n << 128n) - 1n

export const FLUID_MAX_AMOUNT: bigint = (1n << 112n) - 1n

export const FLUID_SMART_USE_BALANCE: bigint = (1n << 256n) - 1n

export const GEARBOX_REPAY_ALL: bigint = (1n << 112n) - 1n

export const GEARBOX_WITHDRAW_ALL: bigint = (1n << 112n) - 1n

export const GEARBOX_ADD_COLLATERAL_PERMISSION: bigint = 1n << 0n

export const GEARBOX_INCREASE_DEBT_PERMISSION: bigint = 1n << 1n

export const GEARBOX_DECREASE_DEBT_PERMISSION: bigint = 1n << 2n

export const GEARBOX_WITHDRAW_COLLATERAL_PERMISSION: bigint = 1n << 5n

export const GEARBOX_UPDATE_QUOTA_PERMISSION: bigint = 1n << 6n

export const TRANSFER_FROM: bigint = 0n

export const SWEEP: bigint = 1n

export const WRAP_NATIVE: bigint = 2n

export const UNWRAP_WNATIVE: bigint = 3n

export const PERMIT2_TRANSFER_FROM: bigint = 4n

export const APPROVE: bigint = 5n

export const WRAP: bigint = 6n

export const SWEEP_NFT: bigint = 7n

export const TOKEN_PERMIT: bigint = 0n

export const AAVE_V3_CREDIT_PERMIT: bigint = 1n

export const ALLOW_CREDIT_PERMIT: bigint = 2n

export const AAVE_V4_BORROW_PERMIT: bigint = 3n

export const AAVE_V4_WITHDRAW_PERMIT: bigint = 4n

export const AAVE_V4_CONFIG_PERMIT: bigint = 5n

export const AAVE_V4_PMS_BATCH_PERMIT: bigint = 6n

export const UP_TO_AAVE_V3: bigint = 1000n

export const UP_TO_AAVE_V2: bigint = 2000n

export const UP_TO_COMPOUND_V3: bigint = 3000n

export const UP_TO_COMPOUND_V2: bigint = 4000n

export const UP_TO_MORPHO: bigint = 5000n

export const UP_TO_SILO_V2: bigint = 6000n

export const UP_TO_AAVE_V4: bigint = 7000n

export const UP_TO_FLUID: bigint = 8000n

export const UP_TO_FLUID_SMART: bigint = 9000n

export const UP_TO_GEARBOX_V3: bigint = 10000n

export const DEPOSIT: bigint = 0n

export const BORROW: bigint = 1n

export const REPAY: bigint = 2n

export const WITHDRAW: bigint = 3n

export const DEPOSIT_LENDING_TOKEN: bigint = 4n

export const WITHDRAW_LENDING_TOKEN: bigint = 5n

export const SET_COLLATERAL: bigint = 6n

export const LISTA_BROKER_BORROW: bigint = 7n

export const LISTA_BROKER_REPAY: bigint = 8n

export const FLUID_OPERATE: bigint = 10n

export const FLUID_OPERATE_PERFECT: bigint = 11n

export const FLUID_OPERATE_T1: bigint = 12n

export const GEARBOX_MULTICALL: bigint = 13n

export const MORPHO: bigint = 0n

export const AAVE_V3: bigint = 2n

export const AAVE_V2: bigint = 3n

export const UNLOCK: bigint = 0n

export const UNI_V4_TAKE: bigint = 1n

export const UNI_V4_SETTLE: bigint = 2n

export const UNI_V4_SYNC: bigint = 3n

export const BAL_V3_TAKE: bigint = 4n

export const BAL_V3_SETTLE: bigint = 5n

export const EXT_CALL: bigint = 0x20n

export const EXT_TRY_CALL: bigint = 0x21n

export const EXT_CALL_WITH_REPLACE: bigint = 0x22n

export const EXT_TRY_CALL_WITH_REPLACE: bigint = 0x23n

export const LENDING: bigint = 0x30n

export const TRANSFERS: bigint = 0x40n

export const PERMIT: bigint = 0x50n

export const FLASH_LOAN: bigint = 0x60n

export const ERC4626: bigint = 0x70n

export const GEN_2025_SINGELTONS: bigint = 0x80n

export const BRIDGING: bigint = 0x90n

export const STARGATE_V2: bigint = 0x00n

export const ACROSS: bigint = 0x0an

export const SQUID_ROUTER: bigint = 0x14n

export const GASZIP: bigint = 0x1en

export const MINT_BEHALF: bigint = 0n

export const MINT: bigint = 1n

export const MINT_ITOKEN: bigint = 2n

export const REDEEM: bigint = 0n

export const REDEEM_BEHALF: bigint = 1n

export const REDEEM_ITOKEN: bigint = 2n

export const PROTECTED: bigint = 0n

export const COLLATERAL: bigint = 1n

export function encodeExternalCall(
  target: Address,
  value: bigint,
  useSelfBalance: boolean,
  data: Hex,
): Hex {
  return encodePacked(
    ['uint8', 'address', 'uint128', 'uint16', 'bytes'],
    [
      uint8(ComposerCommands.EXT_CALL),
      target,
      generateAmountBitmap(uint128(value), false, useSelfBalance),
      uint16(data.length / 2 - 1),
      data,
    ],
  )
}

export function encodeTryExternalCall(
  target: Address,
  value: bigint,
  useSelfBalance: boolean,
  rOnFailure: boolean,
  data: Hex,
  catchData: Hex,
): Hex {
  return encodePacked(
    [
      'uint8',
      'address',
      'uint128',
      'uint16',
      'bytes',
      'uint8',
      'uint16',
      'bytes',
    ],
    [
      uint8(ComposerCommands.EXT_TRY_CALL),
      target,
      generateAmountBitmap(uint128(value), false, useSelfBalance),
      uint16(data.length / 2 - 1),
      data,
      uint8(rOnFailure ? 0 : 1),
      uint16(catchData.length / 2 - 1),
      catchData,
    ],
  )
}

export function encodeExternalCallWithReplace(
  target: Address,
  value: bigint,
  useSelfBalance: boolean,
  token: Address,
  replaceOffset: number,
  data: Hex,
): Hex {
  return encodePacked(
    ['uint8', 'address', 'uint128', 'address', 'uint16', 'uint16', 'bytes'],
    [
      uint8(ComposerCommands.EXT_CALL_WITH_REPLACE),
      target,
      generateAmountBitmap(uint128(value), false, useSelfBalance),
      token,
      replaceOffset,
      uint16(data.length / 2 - 1),
      data,
    ],
  )
}

export function encodeTryExternalCallWithReplace(
  target: Address,
  value: bigint,
  useSelfBalance: boolean,
  token: Address,
  replaceOffset: number,
  data: Hex,
  rOnFailure: boolean,
  catchData: Hex,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      uint8(ComposerCommands.EXT_TRY_CALL_WITH_REPLACE),
      target,
      generateAmountBitmap(uint128(value), false, useSelfBalance),
      token,
      replaceOffset,
      uint16(data.length / 2 - 1),
      uint8(rOnFailure ? 0 : 1),
      uint16(catchData.length / 2 - 1),
      data,
      catchData,
    ],
  )
}

export function encodeStargateV2Bridge(
  asset: Address,
  stargatePool: Address,
  dstEid: number,
  receiver: Hex,
  refundReceiver: Address,
  amount: bigint,
  slippage: number,
  fee: bigint,
  isBusMode: boolean,
  isNative: boolean,
  composeMsg: Hex,
  extraOptions: Hex,
): Hex {
  const partialData = encodeStargateV2BridgePartial(
    amount,
    slippage,
    fee,
    isBusMode,
    isNative,
    composeMsg,
    extraOptions,
  )
  return encodePacked(
    [
      'uint8',
      'uint8',
      'address',
      'address',
      'uint32',
      'bytes32',
      'address',
      'bytes',
    ],
    [
      uint8(ComposerCommands.BRIDGING),
      uint8(BridgeIds.STARGATE_V2),
      asset,
      stargatePool,
      dstEid,
      receiver,
      refundReceiver,
      partialData,
    ],
  )
}

export function encodePermit(
  permitId: bigint,
  target: Address,
  data: Hex,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'uint16', 'bytes'],
    [
      uint8(ComposerCommands.PERMIT),
      uint8(permitId),
      target,
      uint16(data.length / 2 - 1),
      data,
    ],
  )
}

export function encodeStargateV2BridgePartial(
  amount: bigint,
  slippage: number,
  fee: bigint,
  isBusMode: boolean,
  isNative: boolean,
  composeMsg: Hex,
  extraOptions: Hex,
): Hex {
  return encodePacked(
    [
      'uint128',
      'uint32',
      'uint128',
      'uint8',
      'uint16',
      'uint16',
      'bytes',
      'bytes',
    ],
    [
      generateAmountBitmap(uint128(amount), false, isNative),
      slippage,
      uint128(fee),
      uint8(isBusMode ? 1 : 0),
      uint16(composeMsg.length / 2 - 1),
      uint16(extraOptions.length / 2 - 1),
      composeMsg,
      extraOptions,
    ],
  )
}

export function encodeStargateV2BridgeSimpleTaxi(
  asset: Address,
  stargatePool: Address,
  dstEid: number,
  receiver: Hex,
  refundReceiver: Address,
  amount: bigint,
  isNative: boolean,
  slippage: number,
  fee: bigint,
): Hex {
  return encodeStargateV2Bridge(
    asset,
    stargatePool,
    dstEid,
    receiver,
    refundReceiver,
    amount,
    slippage,
    fee,
    false,
    isNative,
    newbytes(0),
    newbytes(0),
  )
}

export function encodeStargateV2BridgeSimpleBus(
  asset: Address,
  stargatePool: Address,
  dstEid: number,
  receiver: Hex,
  refundReceiver: Address,
  amount: bigint,
  isNative: boolean,
  slippage: number,
  fee: bigint,
): Hex {
  return encodeStargateV2Bridge(
    asset,
    stargatePool,
    dstEid,
    receiver,
    refundReceiver,
    amount,
    slippage,
    fee,
    true,
    isNative,
    newbytes(0),
    newbytes(0),
  )
}

export function encodeAcrossBridgeToken(
  spokePool: Address,
  depositor: Address,
  sendingAssetId: Address,
  receivingAssetId: Hex,
  amount: bigint,
  fixedFee: bigint,
  feePercentage: number,
  destinationChainId: number,
  fromTokenDecimals: number,
  toTokenDecimals: number,
  receiver: Hex,
  deadline: number,
  message: Hex,
): Hex {
  return encodePacked(
    ['bytes', 'bytes'],
    [
      encodeAcrossHeader(
        spokePool,
        depositor,
        sendingAssetId,
        receivingAssetId,
        amount,
        false,
      ),
      encodeAcrossParams(
        fixedFee,
        feePercentage,
        destinationChainId,
        fromTokenDecimals,
        toTokenDecimals,
        receiver,
        deadline,
        message,
      ),
    ],
  )
}

export function encodeAcrossBridgeNative(
  spokePool: Address,
  depositor: Address,
  sendingAssetId: Address,
  receivingAssetId: Hex,
  amount: bigint,
  fixedFee: bigint,
  feePercentage: number,
  destinationChainId: number,
  fromTokenDecimals: number,
  toTokenDecimals: number,
  receiver: Hex,
  deadline: number,
  message: Hex,
): Hex {
  return encodePacked(
    ['bytes', 'bytes'],
    [
      encodeAcrossHeader(
        spokePool,
        depositor,
        sendingAssetId,
        receivingAssetId,
        amount,
        true,
      ),
      encodeAcrossParams(
        fixedFee,
        feePercentage,
        destinationChainId,
        fromTokenDecimals,
        toTokenDecimals,
        receiver,
        deadline,
        message,
      ),
    ],
  )
}

export function encodeAcrossHeader(
  spokePool: Address,
  depositor: Address,
  sendingAssetId: Address,
  receivingAssetId: Hex,
  amount: bigint,
  isNative: boolean,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'address', 'bytes32', 'uint128'],
    [
      uint8(ComposerCommands.BRIDGING),
      uint8(BridgeIds.ACROSS),
      spokePool,
      depositor,
      sendingAssetId,
      receivingAssetId,
      generateAmountBitmap(uint128(amount), false, isNative),
    ],
  )
}

export function encodeAcrossParams(
  fixedFee: bigint,
  feePercentage: number,
  destinationChainId: number,
  fromTokenDecimals: number,
  toTokenDecimals: number,
  receiver: Hex,
  deadline: number,
  message: Hex,
): Hex {
  return encodePacked(
    [
      'uint128',
      'uint32',
      'uint32',
      'uint8',
      'uint8',
      'bytes32',
      'uint32',
      'uint16',
      'bytes',
    ],
    [
      fixedFee,
      feePercentage,
      destinationChainId,
      fromTokenDecimals,
      toTokenDecimals,
      receiver,
      deadline,
      uint16(message.length / 2 - 1),
      message,
    ],
  )
}

export function encodeSquidRouterCall(
  asset: Address,
  gateway: Address,
  bridgedTokenSymbol: Hex,
  amount: bigint,
  destinationChain: Hex,
  destinationAddress: Hex,
  payload: Hex,
  gasRefundRecipient: Address,
  enableExpress: boolean,
  nativeAmount: bigint,
): Hex {
  const partialData = encodeSquidRouterCallPartial(
    asset,
    gateway,
    bridgedTokenSymbol,
    amount,
    destinationChain,
    destinationAddress,
    payload,
  )
  return encodePacked(
    [
      'bytes',
      'uint128',
      'address',
      'uint8',
      'bytes',
      'bytes',
      'bytes',
      'bytes',
    ],
    [
      partialData,
      uint128(nativeAmount),
      gasRefundRecipient,
      uint8(enableExpress ? 1 : 0),
      bridgedTokenSymbol,
      destinationChain,
      destinationAddress,
      payload,
    ],
  )
}

export function encodeSquidRouterCallPartial(
  asset: Address,
  gateway: Address,
  bridgedTokenSymbol: Hex,
  amount: bigint,
  destinationChain: Hex,
  destinationAddress: Hex,
  payload: Hex,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'address',
      'address',
      'uint16',
      'uint16',
      'uint16',
      'uint16',
      'uint128',
    ],
    [
      uint8(ComposerCommands.BRIDGING),
      uint8(BridgeIds.SQUID_ROUTER),
      gateway,
      asset,
      uint16(bridgedTokenSymbol.length / 2 - 1),
      uint16(destinationChain.length / 2 - 1),
      uint16(destinationAddress.length / 2 - 1),
      uint16(payload.length / 2 - 1),
      uint128(amount),
    ],
  )
}

export function encodeGasZipBridge(
  gasZipRouter: Address,
  receiver: Hex,
  amount: bigint,
  destinationChainId: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'],
    [
      uint8(ComposerCommands.BRIDGING),
      uint8(BridgeIds.GASZIP),
      gasZipRouter,
      receiver,
      uint128(amount),
      destinationChainId,
    ],
  )
}

export function encodeGasZipEvmBridge(
  gasZipRouter: Address,
  receiver: Address,
  amount: bigint,
  destinationChainId: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'bytes32', 'uint128', 'uint256'],
    [
      uint8(ComposerCommands.BRIDGING),
      uint8(BridgeIds.GASZIP),
      gasZipRouter,
      rightPadZero(receiver),
      uint128(amount),
      destinationChainId,
    ],
  )
}

export function encodePermit2TransferFrom(
  token: Address,
  receiver: Address,
  amount: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.PERMIT2_TRANSFER_FROM),
      token,
      receiver,
      uint128(amount),
    ],
  )
}

export function encodeNextGenDexUnlock(
  singleton: Address,
  id: bigint,
  d: Hex,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'uint16', 'uint8', 'bytes'],
    [
      uint8(ComposerCommands.GEN_2025_SINGELTONS),
      uint8(Gen2025ActionIds.UNLOCK),
      singleton,
      uint16(d.length / 2 - 1 + 1),
      uint8(id),
      d,
    ],
  )
}

export function encodeBalancerV3FlashLoan(
  singleton: Address,
  poolId: bigint,
  asset: Address,
  receiver: Address,
  amount: bigint,
  flashData: Hex,
): Hex {
  const take = encodeBalancerV3Take(singleton, asset, receiver, amount)
  const settle = encodeNextGenDexSettleBalancer(singleton, asset, amount)
  return encodeNextGenDexUnlock(
    singleton,
    poolId,
    encodeBalancerV3FlashLoanData(take, flashData, settle),
  )
}

export function encodeBalancerV3FlashLoanData(
  take: Hex,
  flashData: Hex,
  settle: Hex,
): Hex {
  return encodePacked(['bytes', 'bytes', 'bytes'], [take, flashData, settle])
}

export function encodeUniswapV4FlashLoan(
  singleton: Address,
  poolId: bigint,
  asset: Address,
  receiver: Address,
  amount: bigint,
  flashData: Hex,
): Hex {
  const take = encodeUniswapV4Take(singleton, asset, receiver, amount)
  const settle = encodeNextGenDexSettle(
    singleton,
    asset === zeroAddress ? amount : 0,
  )
  const sync = encodeUniswapV4Sync(singleton, asset)
  return encodeNextGenDexUnlock(
    singleton,
    poolId,
    encodeUniswapV4FlashLoanData(take, sync, flashData, settle),
  )
}

export function encodeUniswapV4FlashLoanData(
  take: Hex,
  sync: Hex,
  flashData: Hex,
  settle: Hex,
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes', 'bytes'],
    [take, sync, flashData, settle],
  )
}

export function encodeBalancerV3Take(
  singleton: Address,
  asset: Address,
  receiver: Address,
  amount: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.GEN_2025_SINGELTONS),
      uint8(Gen2025ActionIds.BAL_V3_TAKE),
      singleton,
      asset,
      receiver,
      uint128(amount),
    ],
  )
}

export function encodeUniswapV4Sync(singleton: Address, asset: Address): Hex {
  if (asset === zeroAddress) return `0x0` as Hex
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address'],
    [
      uint8(ComposerCommands.GEN_2025_SINGELTONS),
      uint8(Gen2025ActionIds.UNI_V4_SYNC),
      singleton,
      asset,
    ],
  )
}

export function encodeUniswapV4Take(
  singleton: Address,
  asset: Address,
  receiver: Address,
  amount: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.GEN_2025_SINGELTONS),
      uint8(Gen2025ActionIds.UNI_V4_TAKE),
      singleton,
      asset,
      receiver,
      uint128(amount),
    ],
  )
}

export function encodeNextGenDexSettle(
  singleton: Address,
  nativeAmount: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'uint128'],
    [
      uint8(ComposerCommands.GEN_2025_SINGELTONS),
      uint8(Gen2025ActionIds.UNI_V4_SETTLE),
      singleton,
      uint128(nativeAmount),
    ],
  )
}

export function encodeNextGenDexSettleBalancer(
  singleton: Address,
  asset: Address,
  amountHint: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.GEN_2025_SINGELTONS),
      uint8(Gen2025ActionIds.BAL_V3_SETTLE),
      singleton,
      asset,
      uint128(amountHint >= (1n << 120n) - 1n ? (1n << 120n) - 1n : amountHint),
    ],
  )
}

export function encodeTransferIn(
  asset: Address,
  receiver: Address,
  amount: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.TRANSFER_FROM),
      asset,
      receiver,
      uint128(amount),
    ],
  )
}

export function encodeSweep(
  asset: Address,
  receiver: Address,
  amount: bigint,
  sweepType: any,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.SWEEP),
      asset,
      receiver,
      sweepType,
      uint128(amount),
    ],
  )
}

export function encodeWrap(amount: bigint, wrapTarget: Address): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.SWEEP),
      zeroAddress,
      wrapTarget,
      uint8(SweepType.AMOUNT),
      uint128(amount),
    ],
  )
}

export function encodeWrapWithReceiver(
  amount: bigint,
  weth: Address,
  receiver: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.WRAP),
      weth,
      receiver,
      uint128(amount),
    ],
  )
}

export function encodeApprove(asset: Address, target: Address): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.APPROVE),
      asset,
      target,
    ],
  )
}

export function encodeSweepNft(
  collection: Address,
  receiver: Address,
  tokenId: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint256'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.SWEEP_NFT),
      collection,
      receiver,
      tokenId,
    ],
  )
}

export function encodeUnwrap(
  target: Address,
  receiver: Address,
  amount: bigint,
  sweepType: any,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'address', 'uint8', 'uint128'],
    [
      uint8(ComposerCommands.TRANSFERS),
      uint8(TransferIds.UNWRAP_WNATIVE),
      target,
      receiver,
      sweepType,
      uint128(amount),
    ],
  )
}

export function encodeFlashLoan(
  asset: Address,
  amount: bigint,
  pool: Address,
  poolType: number,
  poolId: number,
  data: Hex,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'address',
      'address',
      'uint128',
      'uint16',
      'bytes',
    ],
    [
      encodeApprove(asset, pool),
      uint8(ComposerCommands.FLASH_LOAN),
      poolType,
      asset,
      pool,
      uint128(amount),
      uint16(data.length / 2 - 1 + 1),
      encodeUint8AndBytes(poolId, data),
    ],
  )
}

export function encodeUint8AndBytes(poolId: number, data: Hex): Hex {
  return encodePacked(['uint8', 'bytes'], [uint8(poolId), data])
}

export function encodeMorphoMarket(
  loanToken: Address,
  collateralToken: Address,
  oracle: Address,
  irm: Address,
  lltv: bigint,
): Hex {
  return encodePacked(
    ['address', 'address', 'address', 'address', 'uint128'],
    [loanToken, collateralToken, oracle, irm, uint128(lltv)],
  )
}

export function encodeMorphoDepositCollateral(
  market: Hex,
  assets: bigint,
  receiver: Address,
  data: Hex,
  morphoB: Address,
  pId: bigint,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(getMorphoCollateral(market), morphoB),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      uint128(assets),
      receiver,
      morphoB,
      uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
      data.length / 2 - 1 === 0
        ? newbytes(0)
        : encodeUint8AndBytes(uint8(pId), data),
    ],
  )
}

export function encodeListaSupplyCollateralViaProvider(
  market: Hex,
  assets: bigint,
  receiver: Address,
  data: Hex,
  provider: Address,
  pId: bigint,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'bytes',
      'uint128',
      'address',
      'address',
      'uint16',
      'bytes',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), false, true),
      receiver,
      provider,
      uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
      data.length / 2 - 1 === 0
        ? newbytes(0)
        : encodeUint8AndBytes(uint8(pId), data),
    ],
  )
}

export function encodeMorphoDeposit(
  market: Hex,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
  data: Hex,
  morphoB: Address,
  pId: bigint,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(getMorphoLoanAsset(market), morphoB),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT_LENDING_TOKEN),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), isShares, false),
      receiver,
      morphoB,
      uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
      data.length / 2 - 1 === 0
        ? newbytes(0)
        : encodeUint8AndBytes(uint8(pId), data),
    ],
  )
}

export function encodeErc4626Deposit(
  asset: Address,
  vault: Address,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
): Hex {
  return encodePacked(
    ['bytes', 'uint8', 'uint8', 'address', 'address', 'uint128', 'address'],
    [
      encodeApprove(asset, vault),
      uint8(ComposerCommands.ERC4626),
      uint8(0),
      asset,
      vault,
      generateAmountBitmap(uint128(assets), isShares, false),
      receiver,
    ],
  )
}

export function encodeErc4646Withdraw(
  vault: Address,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'address', 'uint128', 'address'],
    [
      uint8(ComposerCommands.ERC4626),
      uint8(1),
      vault,
      generateAmountBitmap(uint128(assets), isShares, false),
      receiver,
    ],
  )
}

export function encodeMorphoWithdraw(
  market: Hex,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
  morphoB: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW_LENDING_TOKEN),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), isShares, false),
      receiver,
      morphoB,
    ],
  )
}

export function encodeMorphoWithdrawCollateral(
  market: Hex,
  assets: bigint,
  receiver: Address,
  morphoB: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      uint128(assets),
      receiver,
      morphoB,
    ],
  )
}

export function encodeListaWithdrawCollateralViaProvider(
  market: Hex,
  assets: bigint,
  receiver: Address,
  provider: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), false, true),
      receiver,
      provider,
    ],
  )
}

export function encodeMorphoBorrow(
  market: Hex,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
  morphoB: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'bytes', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), isShares, false),
      receiver,
      morphoB,
    ],
  )
}

export function encodeMorphoRepay(
  market: Hex,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
  data: Hex,
  morphoB: Address,
  pId: bigint,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(getMorphoLoanAsset(market), morphoB),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), isShares, false),
      receiver,
      morphoB,
      uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
      data.length / 2 - 1 === 0
        ? newbytes(0)
        : encodeUint8AndBytes(uint8(pId), data),
    ],
  )
}

export function encodeListaRepayViaProvider(
  market: Hex,
  isShares: boolean,
  assets: bigint,
  receiver: Address,
  data: Hex,
  morphoB: Address,
  pId: bigint,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'bytes',
      'uint128',
      'address',
      'address',
      'uint16',
      'bytes',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      market,
      generateAmountBitmap(uint128(assets), isShares, true),
      receiver,
      morphoB,
      uint16(data.length / 2 - 1 > 0 ? data.length / 2 - 1 + 1 : 0),
      data.length / 2 - 1 === 0
        ? newbytes(0)
        : encodeUint8AndBytes(uint8(pId), data),
    ],
  )
}

export function encodeListaBrokerBorrow(
  assets: bigint,
  broker: Address,
  receiver: Address,
  termId: bigint,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address', 'uint128'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.LISTA_BROKER_BORROW),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      uint128(assets),
      broker,
      receiver,
      uint128(termId),
    ],
  )
}

export function encodeListaBrokerRepay(
  loanToken: Address,
  assets: bigint,
  native: boolean,
  broker: Address,
  loanId: bigint,
  onBehalf: Address,
): Hex {
  let amountWord = uint128(assets)
  if (native) amountWord = amountWord | NATIVE_FLAG
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint128',
      'address',
    ],
    [
      native ? newbytes(0) : encodeApprove(loanToken, broker),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.LISTA_BROKER_REPAY),
      uint16(LenderIds.UP_TO_MORPHO - 1),
      loanToken,
      amountWord,
      broker,
      uint128(loanId),
      onBehalf,
    ],
  )
}

export function encodeAaveDeposit(
  token: Address,
  amount: bigint,
  receiver: Address,
  pool: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      encodeApprove(token, pool),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_AAVE_V3 - 1),
      token,
      uint128(amount),
      receiver,
      pool,
    ],
  )
}

export function encodeAaveBorrow(
  token: Address,
  amount: bigint,
  receiver: Address,
  mode: bigint,
  pool: Address,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint8',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_AAVE_V3 - 1),
      token,
      uint128(amount),
      receiver,
      uint8(mode),
      pool,
    ],
  )
}

export function encodeAaveRepay(
  token: Address,
  amount: bigint,
  receiver: Address,
  mode: bigint,
  dToken: Address,
  pool: Address,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(token, pool),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_AAVE_V3 - 1),
      token,
      uint128(amount),
      receiver,
      uint8(mode),
      dToken,
      pool,
    ],
  )
}

export function encodeAaveWithdraw(
  token: Address,
  amount: bigint,
  receiver: Address,
  aToken: Address,
  pool: Address,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_AAVE_V3 - 1),
      token,
      uint128(amount),
      receiver,
      aToken,
      pool,
    ],
  )
}

export function encodeAaveV2Deposit(
  token: Address,
  amount: bigint,
  receiver: Address,
  pool: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      encodeApprove(token, pool),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_AAVE_V2 - 1),
      token,
      uint128(amount),
      receiver,
      pool,
    ],
  )
}

export function encodeAaveV2Borrow(
  token: Address,
  amount: bigint,
  receiver: Address,
  mode: bigint,
  pool: Address,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint8',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_AAVE_V2 - 1),
      token,
      uint128(amount),
      receiver,
      uint8(mode),
      pool,
    ],
  )
}

export function encodeAaveV2Repay(
  token: Address,
  amount: bigint,
  receiver: Address,
  mode: bigint,
  dToken: Address,
  pool: Address,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(token, pool),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_AAVE_V2 - 1),
      token,
      uint128(amount),
      receiver,
      uint8(mode),
      dToken,
      pool,
    ],
  )
}

export function encodeAaveV2Withdraw(
  token: Address,
  amount: bigint,
  receiver: Address,
  aToken: Address,
  pool: Address,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_AAVE_V2 - 1),
      token,
      uint128(amount),
      receiver,
      aToken,
      pool,
    ],
  )
}

export function encodeCompoundV3Deposit(
  token: Address,
  amount: bigint,
  receiver: Address,
  comet: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      encodeApprove(token, comet),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_COMPOUND_V3 - 1),
      token,
      uint128(amount),
      receiver,
      comet,
    ],
  )
}

export function encodeCompoundV3Borrow(
  token: Address,
  amount: bigint,
  receiver: Address,
  comet: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_COMPOUND_V3 - 1),
      token,
      uint128(amount),
      receiver,
      comet,
    ],
  )
}

export function encodeCompoundV3Repay(
  token: Address,
  amount: bigint,
  receiver: Address,
  comet: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      encodeApprove(token, comet),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_COMPOUND_V3 - 1),
      token,
      uint128(amount),
      receiver,
      comet,
    ],
  )
}

export function encodeCompoundV3Withdraw(
  token: Address,
  amount: bigint,
  receiver: Address,
  comet: Address,
  isBase: boolean,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint8',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_COMPOUND_V3 - 1),
      token,
      uint128(amount),
      receiver,
      isBase ? uint8(1) : uint8(0),
      comet,
    ],
  )
}

export function encodeCompoundV2Deposit(
  token: Address,
  amount: bigint,
  receiver: Address,
  cToken: Address,
  selectorId: number,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      token === zeroAddress ? newbytes(0) : encodeApprove(token, cToken),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_COMPOUND_V2 - 1),
      token,
      encodeCompoundV2SelectorId(uint128(amount), selectorId),
      receiver,
      cToken,
    ],
  )
}

export function encodeSiloV2Deposit(
  token: Address,
  amount: bigint,
  receiver: Address,
  silo: Address,
  collateralMode: number,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      token === zeroAddress ? newbytes(0) : encodeApprove(token, silo),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_SILO_V2 - 1),
      token,
      encodeSiloV2CollateralMode(uint128(amount), collateralMode),
      receiver,
      silo,
    ],
  )
}

export function encodeSiloV2Borrow(
  amount: bigint,
  receiver: Address,
  silo: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_SILO_V2 - 1),
      uint128(amount),
      receiver,
      silo,
    ],
  )
}

export function encodeCompoundV2Borrow(
  token: Address,
  amount: bigint,
  receiver: Address,
  cToken: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_COMPOUND_V2 - 1),
      token,
      uint128(amount),
      receiver,
      cToken,
    ],
  )
}

export function encodeCompoundV2Repay(
  token: Address,
  amount: bigint,
  receiver: Address,
  cToken: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      token === zeroAddress ? newbytes(0) : encodeApprove(token, cToken),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_COMPOUND_V2 - 1),
      token,
      uint128(amount),
      receiver,
      cToken,
    ],
  )
}

export function encodeCompoundV2Withdraw(
  token: Address,
  amount: bigint,
  receiver: Address,
  cToken: Address,
  selectorId: number,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_COMPOUND_V2 - 1),
      token,
      encodeCompoundV2SelectorId(uint128(amount), selectorId),
      receiver,
      cToken,
    ],
  )
}

export function encodeSiloV2Withdraw(
  amount: bigint,
  receiver: Address,
  silo: Address,
  collateralMode: number,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_SILO_V2 - 1),
      encodeSiloV2CollateralMode(uint128(amount), collateralMode),
      receiver,
      silo,
    ],
  )
}

export function encodeSiloV2Repay(
  token: Address,
  amount: bigint,
  receiver: Address,
  silo: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      token === zeroAddress ? newbytes(0) : encodeApprove(token, silo),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_SILO_V2 - 1),
      token,
      uint128(amount),
      receiver,
      silo,
    ],
  )
}

export function encodeAaveV4Deposit(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  reserveId: bigint,
  spoke: Address,
  positionManager: Address,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(underlying, positionManager),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_AAVE_V4 - 1),
      underlying,
      uint128(amount),
      receiver,
      reserveId,
      spoke,
      positionManager,
    ],
  )
}

export function encodeAaveV4Borrow(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  reserveId: bigint,
  spoke: Address,
  positionManager: Address,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint256',
      'address',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_AAVE_V4 - 1),
      underlying,
      uint128(amount),
      receiver,
      reserveId,
      spoke,
      positionManager,
    ],
  )
}

export function encodeAaveV4Repay(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  reserveId: bigint,
  spoke: Address,
  positionManager: Address,
): Hex {
  return encodePacked(
    [
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
    ],
    [
      encodeApprove(underlying, positionManager),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_AAVE_V4 - 1),
      underlying,
      uint128(amount),
      receiver,
      reserveId,
      spoke,
      positionManager,
    ],
  )
}

export function encodeAaveV4Withdraw(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  reserveId: bigint,
  spoke: Address,
  positionManager: Address,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint256',
      'address',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_AAVE_V4 - 1),
      underlying,
      uint128(amount),
      receiver,
      reserveId,
      spoke,
      positionManager,
    ],
  )
}

export function encodeAaveV4SetCollateral(
  reserveId: bigint,
  enable: boolean,
  spoke: Address,
  configPositionManager: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'uint256', 'uint8', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.SET_COLLATERAL),
      uint16(LenderIds.UP_TO_AAVE_V4 - 1),
      reserveId,
      uint8(enable ? 1 : 0),
      spoke,
      configPositionManager,
    ],
  )
}

export function encodeAaveV4BorrowPermit(
  takerPM: Address,
  spoke: Address,
  reserveId: bigint,
  amount: bigint,
  nonce: bigint,
  deadlinePlusOne: number,
  r: Hex,
  vs: Hex,
): Hex {
  const data = encodePacked(
    [
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint32',
      'bytes32',
      'bytes32',
    ],
    [spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs],
  )
  return encodePermit(PermitIds.AAVE_V4_BORROW_PERMIT, takerPM, data)
}

export function encodeAaveV4WithdrawPermit(
  takerPM: Address,
  spoke: Address,
  reserveId: bigint,
  amount: bigint,
  nonce: bigint,
  deadlinePlusOne: number,
  r: Hex,
  vs: Hex,
): Hex {
  const data = encodePacked(
    [
      'address',
      'uint256',
      'uint256',
      'uint256',
      'uint32',
      'bytes32',
      'bytes32',
    ],
    [spoke, reserveId, amount, nonce, deadlinePlusOne, r, vs],
  )
  return encodePermit(PermitIds.AAVE_V4_WITHDRAW_PERMIT, takerPM, data)
}

export function encodeAaveV4ConfigPermit(
  configPM: Address,
  spoke: Address,
  status: boolean,
  nonce: bigint,
  deadlinePlusOne: number,
  r: Hex,
  vs: Hex,
): Hex {
  const data = encodePacked(
    ['address', 'uint8', 'uint256', 'uint32', 'bytes32', 'bytes32'],
    [spoke, uint8(status ? 1 : 0), nonce, deadlinePlusOne, r, vs],
  )
  return encodePermit(PermitIds.AAVE_V4_CONFIG_PERMIT, configPM, data)
}

export function encodeFluidT1Operate(
  colUnderlying: Address,
  debtUnderlying: Address,
  colAmount: bigint,
  debtAmount: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
): Hex {
  let approvals: Hex = '0x'
  if (colUnderlying !== zeroAddress && _fluidIsDepositAmount(colAmount)) {
    approvals = encodePacked(
      ['bytes', 'bytes'],
      [approvals, encodeApprove(colUnderlying, vault)],
    )
  }
  if (debtUnderlying !== zeroAddress && _fluidIsRepayAmount(debtAmount)) {
    approvals = encodePacked(
      ['bytes', 'bytes'],
      [approvals, encodeApprove(debtUnderlying, vault)],
    )
  }
  const body = encodePacked(
    [
      'address',
      'address',
      'int128',
      'int128',
      'uint256',
      'address',
      'address',
      'address',
    ],
    [
      colUnderlying,
      debtUnderlying,
      colAmount,
      debtAmount,
      nftId,
      receiver,
      nftReceiver,
      vault,
    ],
  )
  return encodePacked(
    ['bytes', 'uint8', 'uint8', 'uint16', 'bytes'],
    [
      approvals,
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.FLUID_OPERATE_T1),
      uint16(LenderIds.UP_TO_FLUID - 1),
      body,
    ],
  )
}

export function _fluidIsDepositAmount(a: bigint): boolean {
  return a > 0
}

export function _fluidIsRepayAmount(a: bigint): boolean {
  return a < 0
}

export function encodeFluidDeposit(
  underlying: Address,
  amount: bigint,
  nftId: bigint,
  receiver: Address,
  vault: Address,
): Hex {
  let colAmount = amount === 0n ? (1n << 127n) - 1n : int128(amount)
  return encodeFluidT1Operate(
    underlying,
    zeroAddress,
    colAmount,
    0,
    nftId,
    receiver,
    zeroAddress,
    vault,
  )
}

export function encodeFluidBorrow(
  underlying: Address,
  amount: bigint,
  nftId: bigint,
  receiver: Address,
  vault: Address,
): Hex {
  return encodeFluidT1Operate(
    zeroAddress,
    underlying,
    0,
    int128(amount),
    nftId,
    receiver,
    zeroAddress,
    vault,
  )
}

export function encodeFluidRepay(
  underlying: Address,
  amount: bigint,
  nftId: bigint,
  receiver: Address,
  vault: Address,
): Hex {
  let debtAmount =
    amount === 0n || amount === (1n << 112n) - 1n
      ? -(1n << 127n)
      : -int128(amount)
  return encodeFluidT1Operate(
    zeroAddress,
    underlying,
    0,
    debtAmount,
    nftId,
    receiver,
    zeroAddress,
    vault,
  )
}

export function encodeFluidWithdraw(
  underlying: Address,
  amount: bigint,
  nftId: bigint,
  receiver: Address,
  vault: Address,
): Hex {
  let colAmount = amount === (1n << 112n) - 1n ? -(1n << 127n) : -int128(amount)
  return encodeFluidT1Operate(
    underlying,
    zeroAddress,
    colAmount,
    0,
    nftId,
    receiver,
    zeroAddress,
    vault,
  )
}

export function _fluidSmartHeader(
  vaultType: number,
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  isPerfect: boolean,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'uint8',
      'uint128',
      'uint256',
      'address',
      'address',
      'address',
    ],
    [
      uint8(ComposerCommands.LENDING),
      isPerfect
        ? uint8(LenderOps.FLUID_OPERATE_PERFECT)
        : uint8(LenderOps.FLUID_OPERATE),
      uint16(LenderIds.UP_TO_FLUID_SMART - 1),
      vaultType,
      callValue,
      nftId,
      receiver,
      nftReceiver,
      vault,
    ],
  )
}

export function _fluidSmartTokens4(t: Address[]): Hex {
  return encodePacked(
    ['address', 'address', 'address', 'address'],
    [t[0], t[1], t[2], t[3]],
  )
}

export function _fluidSmartTokens6(t: Address[]): Hex {
  return encodePacked(
    ['address', 'address', 'address', 'address', 'address', 'address'],
    [t[0], t[1], t[2], t[3], t[4], t[5]],
  )
}

export function _fluidSmartAmounts4(a: bigint[]): Hex {
  return encodePacked(
    ['int256', 'int256', 'int256', 'int256'],
    [a[0], a[1], a[2], a[3]],
  )
}

export function _fluidSmartAmounts6(a: bigint[]): Hex {
  return encodePacked(
    ['int256', 'int256', 'int256', 'int256', 'int256', 'int256'],
    [a[0], a[1], a[2], a[3], a[4], a[5]],
  )
}

export function encodeFluidSmartOperateT2(
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  tokens: Address[],
  amounts: bigint[],
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes'],
    [
      _fluidSmartHeader(
        2,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
        false,
      ),
      _fluidSmartTokens4(tokens),
      _fluidSmartAmounts4(amounts),
    ],
  )
}

export function encodeFluidSmartOperateT3(
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  tokens: Address[],
  amounts: bigint[],
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes'],
    [
      _fluidSmartHeader(
        3,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
        false,
      ),
      _fluidSmartTokens4(tokens),
      _fluidSmartAmounts4(amounts),
    ],
  )
}

export function encodeFluidSmartOperateT4(
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  tokens: Address[],
  amounts: bigint[],
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes'],
    [
      _fluidSmartHeader(
        4,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
        false,
      ),
      _fluidSmartTokens6(tokens),
      _fluidSmartAmounts6(amounts),
    ],
  )
}

export function encodeFluidSmartOperatePerfectT2(
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  tokens: Address[],
  amounts: bigint[],
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes'],
    [
      _fluidSmartHeader(
        2,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
        true,
      ),
      _fluidSmartTokens4(tokens),
      _fluidSmartAmounts4(amounts),
    ],
  )
}

export function encodeFluidSmartOperatePerfectT3(
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  tokens: Address[],
  amounts: bigint[],
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes'],
    [
      _fluidSmartHeader(
        3,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
        true,
      ),
      _fluidSmartTokens4(tokens),
      _fluidSmartAmounts4(amounts),
    ],
  )
}

export function encodeFluidSmartOperatePerfectT4(
  callValue: bigint,
  nftId: bigint,
  receiver: Address,
  nftReceiver: Address,
  vault: Address,
  tokens: Address[],
  amounts: bigint[],
): Hex {
  return encodePacked(
    ['bytes', 'bytes', 'bytes'],
    [
      _fluidSmartHeader(
        4,
        callValue,
        nftId,
        receiver,
        nftReceiver,
        vault,
        true,
      ),
      _fluidSmartTokens6(tokens),
      _fluidSmartAmounts6(amounts),
    ],
  )
}

export function encodeFluidFTokenDeposit(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  fToken: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'address',
    ],
    [
      encodeApprove(underlying, fToken),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT_LENDING_TOKEN),
      uint16(LenderIds.UP_TO_FLUID - 1),
      underlying,
      amount,
      receiver,
      fToken,
    ],
  )
}

export function encodeFluidFTokenWithdraw(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  fToken: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW_LENDING_TOKEN),
      uint16(LenderIds.UP_TO_FLUID - 1),
      underlying,
      amount,
      receiver,
      fToken,
    ],
  )
}

export function encodeGearboxV3Supply(
  token: Address,
  amount: bigint,
  creditAccount: Address,
  creditManager: Address,
): Hex {
  return encodePacked(
    ['bytes', 'uint8', 'uint8', 'uint16', 'address', 'uint128', 'address'],
    [
      encodeApprove(token, creditManager),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.DEPOSIT),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      token,
      amount,
      creditAccount,
    ],
  )
}

export function encodeGearboxV3Borrow(
  underlying: Address,
  amount: bigint,
  receiver: Address,
  creditAccount: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.BORROW),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      underlying,
      amount,
      receiver,
      creditAccount,
    ],
  )
}

export function encodeGearboxV3RepayPartial(
  underlying: Address,
  amount: bigint,
  creditAccount: Address,
  creditManager: Address,
): Hex {
  if (amount === 0n || amount === GEARBOX_REPAY_ALL)
    throw new Error('CL:gearboxpartialrepayneedsliteralamount')
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint8',
    ],
    [
      encodeApprove(underlying, creditManager),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      underlying,
      amount,
      creditAccount,
      uint8(0),
    ],
  )
}

export function encodeGearboxV3RepayAll(
  underlying: Address,
  creditAccount: Address,
  creditManager: Address,
  quotedTokens: Address[],
): Hex {
  if (quotedTokens.length > 255)
    throw new Error('CL:gearboxtoomanyquotedtokens')
  let quotedBlob: Hex = '0x'
  for (let i = 0n; i < quotedTokens.length; i++) {
    quotedBlob = encodePacked(
      ['bytes', 'address'],
      [quotedBlob, quotedTokens[i]],
    )
  }
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint8',
      'bytes',
    ],
    [
      encodeApprove(underlying, creditManager),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      underlying,
      GEARBOX_REPAY_ALL,
      creditAccount,
      uint8(quotedTokens.length),
      quotedBlob,
    ],
  )
}

export function encodeGearboxV3RepayPartialMax(
  underlying: Address,
  creditAccount: Address,
  creditManager: Address,
): Hex {
  return encodePacked(
    [
      'bytes',
      'uint8',
      'uint8',
      'uint16',
      'address',
      'uint128',
      'address',
      'uint8',
    ],
    [
      encodeApprove(underlying, creditManager),
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.REPAY),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      underlying,
      GEARBOX_REPAY_ALL,
      creditAccount,
      uint8(0),
    ],
  )
}

export function encodeGearboxV3Withdraw(
  token: Address,
  amount: bigint,
  receiver: Address,
  creditAccount: Address,
): Hex {
  return encodePacked(
    ['uint8', 'uint8', 'uint16', 'address', 'uint128', 'address', 'address'],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.WITHDRAW),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      token,
      amount,
      receiver,
      creditAccount,
    ],
  )
}

export function encodeGearboxV3FacadeCall(innerCallData: Hex): Hex {
  if (innerCallData.length / 2 - 1 > (1n << 16n) - 1n)
    throw new Error('CL:gearboxsub-calltoolong')
  return encodePacked(
    ['uint16', 'bytes'],
    [uint16(innerCallData.length / 2 - 1), innerCallData],
  )
}

export function encodeGearboxV3BotMulticall(
  creditAccount: Address,
  numCalls: number,
  calls: Hex,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'uint8',
      'address',
      'address',
      'bytes32',
      'uint16',
      'bytes',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.GEARBOX_MULTICALL),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      uint8(0),
      creditAccount,
      zeroAddress,
      ('0x' + '0'.repeat(64)) as Hex,
      numCalls,
      calls,
    ],
  )
}

export function encodeGearboxV3OpenCreditAccount(
  creditFacade: Address,
  referralCode: bigint,
  numCalls: number,
  calls: Hex,
): Hex {
  return encodePacked(
    [
      'uint8',
      'uint8',
      'uint16',
      'uint8',
      'address',
      'address',
      'uint256',
      'uint16',
      'bytes',
    ],
    [
      uint8(ComposerCommands.LENDING),
      uint8(LenderOps.GEARBOX_MULTICALL),
      uint16(LenderIds.UP_TO_GEARBOX_V3 - 1),
      uint8(1),
      creditFacade,
      zeroAddress,
      referralCode,
      numCalls,
      calls,
    ],
  )
}
