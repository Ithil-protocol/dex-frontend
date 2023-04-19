// Generated by @wagmi/cli@0.1.14 on 4/19/2023 at 12:48:09 PM
import {
  useContract,
  UseContractConfig,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from "wagmi";
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from "wagmi/actions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_underlying", internalType: "address", type: "address" },
      { name: "_accounting", internalType: "address", type: "address" },
      { name: "_tick", internalType: "uint16", type: "uint16" },
    ],
  },
  { type: "error", inputs: [], name: "AmountOutTooLow" },
  { type: "error", inputs: [], name: "AmountTooHigh" },
  { type: "error", inputs: [], name: "IncorrectTickSpacing" },
  { type: "error", inputs: [], name: "NullAmount" },
  { type: "error", inputs: [], name: "PriceTooHigh" },
  { type: "error", inputs: [], name: "RestrictedToOwner" },
  { type: "error", inputs: [], name: "StaleOrder" },
  { type: "error", inputs: [], name: "WrongIndex" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "offerer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "price",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "underlyingToTransfer",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrderCancelled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "offerer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "price",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "index",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "underlyingAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "staked",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "previous",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "next",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrderCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "offerer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "fulfiller",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "price",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "totalFill", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "OrderFulfilled",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "accounting",
    outputs: [{ name: "", internalType: "contract IERC20", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "index", internalType: "uint256", type: "uint256" },
      { name: "price", internalType: "uint256", type: "uint256" },
    ],
    name: "cancelOrder",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "underlyingAmount", internalType: "uint256", type: "uint256" },
      { name: "price", internalType: "uint256", type: "uint256" },
    ],
    name: "convertToAccounting",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "accountingAmount", internalType: "uint256", type: "uint256" },
      { name: "price", internalType: "uint256", type: "uint256" },
    ],
    name: "convertToUnderlying",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "price", internalType: "uint256", type: "uint256" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "createOrder",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "minAmountOut", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "fulfillOrder",
    outputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "price", internalType: "uint256", type: "uint256" }],
    name: "getNextPriceLevel",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "price", internalType: "uint256", type: "uint256" },
      { name: "index", internalType: "uint256", type: "uint256" },
    ],
    name: "getOrder",
    outputs: [
      {
        name: "",
        internalType: "struct IPool.Order",
        type: "tuple",
        components: [
          { name: "offerer", internalType: "address", type: "address" },
          { name: "recipient", internalType: "address", type: "address" },
          {
            name: "underlyingAmount",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "staked", internalType: "uint256", type: "uint256" },
          { name: "previous", internalType: "uint256", type: "uint256" },
          { name: "next", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "id",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "maximumAmount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "maximumPrice",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "price", internalType: "uint256", type: "uint256" },
      { name: "staked", internalType: "uint256", type: "uint256" },
    ],
    name: "previewOrder",
    outputs: [
      { name: "prev", internalType: "uint256", type: "uint256" },
      { name: "next", internalType: "uint256", type: "uint256" },
      { name: "position", internalType: "uint256", type: "uint256" },
      { name: "cumulativeUndAmount", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "index", internalType: "uint256", type: "uint256" },
      { name: "price", internalType: "uint256", type: "uint256" },
    ],
    name: "previewRedeem",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "previewTake",
    outputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "priceResolution",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "tick",
    outputs: [{ name: "", internalType: "uint16", type: "uint16" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "underlying",
    outputs: [{ name: "", internalType: "contract IERC20", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "startPrice", internalType: "uint256", type: "uint256" },
      { name: "minPrice", internalType: "uint256", type: "uint256" },
      { name: "maxLength", internalType: "uint256", type: "uint256" },
    ],
    name: "volumes",
    outputs: [
      {
        name: "",
        internalType: "struct IPool.Volume[]",
        type: "tuple[]",
        components: [
          { name: "price", internalType: "uint256", type: "uint256" },
          { name: "volume", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link poolABI}__.
 */
export function usePool(config: Omit<UseContractConfig, "abi"> = {} as any) {
  return useContract({ abi: poolABI, ...config });
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__.
 */
export function usePoolRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any
) {
  return useContractRead({ abi: poolABI, ...config } as UseContractReadConfig<
    typeof poolABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"accounting"`.
 */
export function usePoolAccounting<
  TSelectData = ReadContractResult<typeof poolABI, "accounting">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "accounting", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "accounting",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "accounting", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"convertToAccounting"`.
 */
export function usePoolConvertToAccounting<
  TSelectData = ReadContractResult<typeof poolABI, "convertToAccounting">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "convertToAccounting", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "convertToAccounting",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "convertToAccounting", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"convertToUnderlying"`.
 */
export function usePoolConvertToUnderlying<
  TSelectData = ReadContractResult<typeof poolABI, "convertToUnderlying">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "convertToUnderlying", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "convertToUnderlying",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "convertToUnderlying", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"factory"`.
 */
export function usePoolFactory<
  TSelectData = ReadContractResult<typeof poolABI, "factory">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "factory", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "factory",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "factory", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"getNextPriceLevel"`.
 */
export function usePoolGetNextPriceLevel<
  TSelectData = ReadContractResult<typeof poolABI, "getNextPriceLevel">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "getNextPriceLevel", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "getNextPriceLevel",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "getNextPriceLevel", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"getOrder"`.
 */
export function usePoolGetOrder<
  TSelectData = ReadContractResult<typeof poolABI, "getOrder">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "getOrder", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "getOrder",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "getOrder", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"id"`.
 */
export function usePoolId<
  TSelectData = ReadContractResult<typeof poolABI, "id">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "id", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "id",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "id", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"maximumAmount"`.
 */
export function usePoolMaximumAmount<
  TSelectData = ReadContractResult<typeof poolABI, "maximumAmount">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "maximumAmount", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "maximumAmount",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "maximumAmount", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"maximumPrice"`.
 */
export function usePoolMaximumPrice<
  TSelectData = ReadContractResult<typeof poolABI, "maximumPrice">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "maximumPrice", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "maximumPrice",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "maximumPrice", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"previewOrder"`.
 */
export function usePoolPreviewOrder<
  TSelectData = ReadContractResult<typeof poolABI, "previewOrder">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "previewOrder", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "previewOrder",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "previewOrder", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"previewRedeem"`.
 */
export function usePoolPreviewRedeem<
  TSelectData = ReadContractResult<typeof poolABI, "previewRedeem">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "previewRedeem", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "previewRedeem",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "previewRedeem", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"previewTake"`.
 */
export function usePoolPreviewTake<
  TSelectData = ReadContractResult<typeof poolABI, "previewTake">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "previewTake", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "previewTake",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "previewTake", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"priceResolution"`.
 */
export function usePoolPriceResolution<
  TSelectData = ReadContractResult<typeof poolABI, "priceResolution">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "priceResolution", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "priceResolution",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "priceResolution", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"tick"`.
 */
export function usePoolTick<
  TSelectData = ReadContractResult<typeof poolABI, "tick">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "tick", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "tick",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "tick", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"underlying"`.
 */
export function usePoolUnderlying<
  TSelectData = ReadContractResult<typeof poolABI, "underlying">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "underlying", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "underlying",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "underlying", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"volumes"`.
 */
export function usePoolVolumes<
  TSelectData = ReadContractResult<typeof poolABI, "volumes">
>(
  config: Omit<
    UseContractReadConfig<typeof poolABI, "volumes", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: poolABI,
    functionName: "volumes",
    ...config,
  } as UseContractReadConfig<typeof poolABI, "volumes", TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__.
 */
export function usePoolWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof poolABI, string>["abi"],
        TFunctionName
      >
    : UseContractWriteConfig<TMode, typeof poolABI, TFunctionName> & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<TMode, typeof poolABI, TFunctionName>({
    abi: poolABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"cancelOrder"`.
 */
export function usePoolCancelOrder<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof poolABI, "cancelOrder">["abi"],
        "cancelOrder"
      > & { functionName?: "cancelOrder" }
    : UseContractWriteConfig<TMode, typeof poolABI, "cancelOrder"> & {
        abi?: never;
        functionName?: "cancelOrder";
      } = {} as any
) {
  return useContractWrite<TMode, typeof poolABI, "cancelOrder">({
    abi: poolABI,
    functionName: "cancelOrder",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"createOrder"`.
 */
export function usePoolCreateOrder<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof poolABI, "createOrder">["abi"],
        "createOrder"
      > & { functionName?: "createOrder" }
    : UseContractWriteConfig<TMode, typeof poolABI, "createOrder"> & {
        abi?: never;
        functionName?: "createOrder";
      } = {} as any
) {
  return useContractWrite<TMode, typeof poolABI, "createOrder">({
    abi: poolABI,
    functionName: "createOrder",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"fulfillOrder"`.
 */
export function usePoolFulfillOrder<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof poolABI, "fulfillOrder">["abi"],
        "fulfillOrder"
      > & { functionName?: "fulfillOrder" }
    : UseContractWriteConfig<TMode, typeof poolABI, "fulfillOrder"> & {
        abi?: never;
        functionName?: "fulfillOrder";
      } = {} as any
) {
  return useContractWrite<TMode, typeof poolABI, "fulfillOrder">({
    abi: poolABI,
    functionName: "fulfillOrder",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__.
 */
export function usePreparePoolWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, TFunctionName>,
    "abi"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"cancelOrder"`.
 */
export function usePreparePoolCancelOrder(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, "cancelOrder">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    functionName: "cancelOrder",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, "cancelOrder">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"createOrder"`.
 */
export function usePreparePoolCreateOrder(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, "createOrder">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    functionName: "createOrder",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, "createOrder">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolABI}__ and `functionName` set to `"fulfillOrder"`.
 */
export function usePreparePoolFulfillOrder(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolABI, "fulfillOrder">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: poolABI,
    functionName: "fulfillOrder",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolABI, "fulfillOrder">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolABI}__.
 */
export function usePoolEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof poolABI, TEventName>,
    "abi"
  > = {} as any
) {
  return useContractEvent({ abi: poolABI, ...config } as UseContractEventConfig<
    typeof poolABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolABI}__ and `eventName` set to `"OrderCancelled"`.
 */
export function usePoolOrderCancelledEvent(
  config: Omit<
    UseContractEventConfig<typeof poolABI, "OrderCancelled">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: poolABI,
    eventName: "OrderCancelled",
    ...config,
  } as UseContractEventConfig<typeof poolABI, "OrderCancelled">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolABI}__ and `eventName` set to `"OrderCreated"`.
 */
export function usePoolOrderCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof poolABI, "OrderCreated">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: poolABI,
    eventName: "OrderCreated",
    ...config,
  } as UseContractEventConfig<typeof poolABI, "OrderCreated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolABI}__ and `eventName` set to `"OrderFulfilled"`.
 */
export function usePoolOrderFulfilledEvent(
  config: Omit<
    UseContractEventConfig<typeof poolABI, "OrderFulfilled">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: poolABI,
    eventName: "OrderFulfilled",
    ...config,
  } as UseContractEventConfig<typeof poolABI, "OrderFulfilled">);
}
