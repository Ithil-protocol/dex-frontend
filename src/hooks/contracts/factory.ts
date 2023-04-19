// Generated by @wagmi/cli@0.1.14 on 4/19/2023 at 12:48:10 PM
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
// factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const factoryABI = [
  { stateMutability: "nonpayable", type: "constructor", inputs: [] },
  { type: "error", inputs: [], name: "TokenMismatch" },
  { type: "error", inputs: [], name: "UnsupportedTick" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "underlying",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "accounting",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tickSpacing",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "NewPool",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "tick", internalType: "uint16", type: "uint16", indexed: false },
      { name: "status", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "TickToggled",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "underlying", internalType: "address", type: "address" },
      { name: "accounting", internalType: "address", type: "address" },
      { name: "tickSpacing", internalType: "uint16", type: "uint16" },
    ],
    name: "createPool",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "pools",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "sweep",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint16", type: "uint16" }],
    name: "tickSupported",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "tick", internalType: "uint16", type: "uint16" }],
    name: "toggleSupportedTick",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  { stateMutability: "payable", type: "receive" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link factoryABI}__.
 */
export function useFactory(config: Omit<UseContractConfig, "abi"> = {} as any) {
  return useContract({ abi: factoryABI, ...config });
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link factoryABI}__.
 */
export function useFactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof factoryABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof factoryABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any
) {
  return useContractRead({
    abi: factoryABI,
    ...config,
  } as UseContractReadConfig<typeof factoryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"owner"`.
 */
export function useFactoryOwner<
  TSelectData = ReadContractResult<typeof factoryABI, "owner">
>(
  config: Omit<
    UseContractReadConfig<typeof factoryABI, "owner", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: factoryABI,
    functionName: "owner",
    ...config,
  } as UseContractReadConfig<typeof factoryABI, "owner", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"pools"`.
 */
export function useFactoryPools<
  TSelectData = ReadContractResult<typeof factoryABI, "pools">
>(
  config: Omit<
    UseContractReadConfig<typeof factoryABI, "pools", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: factoryABI,
    functionName: "pools",
    ...config,
  } as UseContractReadConfig<typeof factoryABI, "pools", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"tickSupported"`.
 */
export function useFactoryTickSupported<
  TSelectData = ReadContractResult<typeof factoryABI, "tickSupported">
>(
  config: Omit<
    UseContractReadConfig<typeof factoryABI, "tickSupported", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: factoryABI,
    functionName: "tickSupported",
    ...config,
  } as UseContractReadConfig<typeof factoryABI, "tickSupported", TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link factoryABI}__.
 */
export function useFactoryWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof factoryABI, string>["abi"],
        TFunctionName
      >
    : UseContractWriteConfig<TMode, typeof factoryABI, TFunctionName> & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<TMode, typeof factoryABI, TFunctionName>({
    abi: factoryABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"createPool"`.
 */
export function useFactoryCreatePool<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof factoryABI, "createPool">["abi"],
        "createPool"
      > & { functionName?: "createPool" }
    : UseContractWriteConfig<TMode, typeof factoryABI, "createPool"> & {
        abi?: never;
        functionName?: "createPool";
      } = {} as any
) {
  return useContractWrite<TMode, typeof factoryABI, "createPool">({
    abi: factoryABI,
    functionName: "createPool",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useFactoryRenounceOwnership<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof factoryABI,
          "renounceOwnership"
        >["abi"],
        "renounceOwnership"
      > & { functionName?: "renounceOwnership" }
    : UseContractWriteConfig<TMode, typeof factoryABI, "renounceOwnership"> & {
        abi?: never;
        functionName?: "renounceOwnership";
      } = {} as any
) {
  return useContractWrite<TMode, typeof factoryABI, "renounceOwnership">({
    abi: factoryABI,
    functionName: "renounceOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"sweep"`.
 */
export function useFactorySweep<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof factoryABI, "sweep">["abi"],
        "sweep"
      > & { functionName?: "sweep" }
    : UseContractWriteConfig<TMode, typeof factoryABI, "sweep"> & {
        abi?: never;
        functionName?: "sweep";
      } = {} as any
) {
  return useContractWrite<TMode, typeof factoryABI, "sweep">({
    abi: factoryABI,
    functionName: "sweep",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"toggleSupportedTick"`.
 */
export function useFactoryToggleSupportedTick<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof factoryABI,
          "toggleSupportedTick"
        >["abi"],
        "toggleSupportedTick"
      > & { functionName?: "toggleSupportedTick" }
    : UseContractWriteConfig<
        TMode,
        typeof factoryABI,
        "toggleSupportedTick"
      > & {
        abi?: never;
        functionName?: "toggleSupportedTick";
      } = {} as any
) {
  return useContractWrite<TMode, typeof factoryABI, "toggleSupportedTick">({
    abi: factoryABI,
    functionName: "toggleSupportedTick",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useFactoryTransferOwnership<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<
          typeof factoryABI,
          "transferOwnership"
        >["abi"],
        "transferOwnership"
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<TMode, typeof factoryABI, "transferOwnership"> & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any
) {
  return useContractWrite<TMode, typeof factoryABI, "transferOwnership">({
    abi: factoryABI,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link factoryABI}__.
 */
export function usePrepareFactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof factoryABI, TFunctionName>,
    "abi"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: factoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof factoryABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"createPool"`.
 */
export function usePrepareFactoryCreatePool(
  config: Omit<
    UsePrepareContractWriteConfig<typeof factoryABI, "createPool">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: factoryABI,
    functionName: "createPool",
    ...config,
  } as UsePrepareContractWriteConfig<typeof factoryABI, "createPool">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareFactoryRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof factoryABI, "renounceOwnership">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: factoryABI,
    functionName: "renounceOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof factoryABI, "renounceOwnership">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"sweep"`.
 */
export function usePrepareFactorySweep(
  config: Omit<
    UsePrepareContractWriteConfig<typeof factoryABI, "sweep">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: factoryABI,
    functionName: "sweep",
    ...config,
  } as UsePrepareContractWriteConfig<typeof factoryABI, "sweep">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"toggleSupportedTick"`.
 */
export function usePrepareFactoryToggleSupportedTick(
  config: Omit<
    UsePrepareContractWriteConfig<typeof factoryABI, "toggleSupportedTick">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: factoryABI,
    functionName: "toggleSupportedTick",
    ...config,
  } as UsePrepareContractWriteConfig<typeof factoryABI, "toggleSupportedTick">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link factoryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareFactoryTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof factoryABI, "transferOwnership">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: factoryABI,
    functionName: "transferOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof factoryABI, "transferOwnership">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link factoryABI}__.
 */
export function useFactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof factoryABI, TEventName>,
    "abi"
  > = {} as any
) {
  return useContractEvent({
    abi: factoryABI,
    ...config,
  } as UseContractEventConfig<typeof factoryABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link factoryABI}__ and `eventName` set to `"NewPool"`.
 */
export function useFactoryNewPoolEvent(
  config: Omit<
    UseContractEventConfig<typeof factoryABI, "NewPool">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: factoryABI,
    eventName: "NewPool",
    ...config,
  } as UseContractEventConfig<typeof factoryABI, "NewPool">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link factoryABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useFactoryOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof factoryABI, "OwnershipTransferred">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: factoryABI,
    eventName: "OwnershipTransferred",
    ...config,
  } as UseContractEventConfig<typeof factoryABI, "OwnershipTransferred">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link factoryABI}__ and `eventName` set to `"TickToggled"`.
 */
export function useFactoryTickToggledEvent(
  config: Omit<
    UseContractEventConfig<typeof factoryABI, "TickToggled">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: factoryABI,
    eventName: "TickToggled",
    ...config,
  } as UseContractEventConfig<typeof factoryABI, "TickToggled">);
}
