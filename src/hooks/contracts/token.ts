// Generated by @wagmi/cli@0.1.14 on 4/2/2023 at 6:45:10 PM
import {
  UseContractConfig,
  UseContractEventConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
  UsePrepareContractWriteConfig,
  useContract,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  PrepareWriteContractResult,
  ReadContractResult,
  WriteContractMode,
} from "wagmi/actions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenABI = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link tokenABI}__.
 */
export function useToken(config: Omit<UseContractConfig, "abi"> = {} as any) {
  return useContract({ abi: tokenABI, ...config });
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__.
 */
export function useTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any
) {
  return useContractRead({ abi: tokenABI, ...config } as UseContractReadConfig<
    typeof tokenABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"allowance"`.
 */
export function useTokenAllowance<
  TSelectData = ReadContractResult<typeof tokenABI, "allowance">
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, "allowance", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "allowance",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "allowance", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useTokenBalanceOf<
  TSelectData = ReadContractResult<typeof tokenABI, "balanceOf">
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, "balanceOf", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "balanceOf", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"decimals"`.
 */
export function useTokenDecimals<
  TSelectData = ReadContractResult<typeof tokenABI, "decimals">
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, "decimals", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "decimals",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "decimals", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"name"`.
 */
export function useTokenName<
  TSelectData = ReadContractResult<typeof tokenABI, "name">
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, "name", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "name",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "name", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useTokenSymbol<
  TSelectData = ReadContractResult<typeof tokenABI, "symbol">
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, "symbol", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "symbol",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "symbol", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useTokenTotalSupply<
  TSelectData = ReadContractResult<typeof tokenABI, "totalSupply">
>(
  config: Omit<
    UseContractReadConfig<typeof tokenABI, "totalSupply", TSelectData>,
    "abi" | "functionName"
  > = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "totalSupply",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "totalSupply", TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__.
 */
export function useTokenWrite<
  TMode extends WriteContractMode,
  TFunctionName extends string
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof tokenABI, string>["abi"],
        TFunctionName
      >
    : UseContractWriteConfig<TMode, typeof tokenABI, TFunctionName> & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<TMode, typeof tokenABI, TFunctionName>({
    abi: tokenABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"approve"`.
 */
export function useTokenApprove<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof tokenABI, "approve">["abi"],
        "approve"
      > & { functionName?: "approve" }
    : UseContractWriteConfig<TMode, typeof tokenABI, "approve"> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any
) {
  return useContractWrite<TMode, typeof tokenABI, "approve">({
    abi: tokenABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transfer"`.
 */
export function useTokenTransfer<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof tokenABI, "transfer">["abi"],
        "transfer"
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<TMode, typeof tokenABI, "transfer"> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any
) {
  return useContractWrite<TMode, typeof tokenABI, "transfer">({
    abi: tokenABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useTokenTransferFrom<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        TMode,
        PrepareWriteContractResult<typeof tokenABI, "transferFrom">["abi"],
        "transferFrom"
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<TMode, typeof tokenABI, "transferFrom"> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any
) {
  return useContractWrite<TMode, typeof tokenABI, "transferFrom">({
    abi: tokenABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__.
 */
export function usePrepareTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, TFunctionName>,
    "abi"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, "approve">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, "transfer">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link tokenABI}__.
 */
export function useTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof tokenABI, TEventName>,
    "abi"
  > = {} as any
) {
  return useContractEvent({
    abi: tokenABI,
    ...config,
  } as UseContractEventConfig<typeof tokenABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link tokenABI}__ and `eventName` set to `"Approval"`.
 */
export function useTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof tokenABI, "Approval">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: tokenABI,
    eventName: "Approval",
    ...config,
  } as UseContractEventConfig<typeof tokenABI, "Approval">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link tokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof tokenABI, "Transfer">,
    "abi" | "eventName"
  > = {} as any
) {
  return useContractEvent({
    abi: tokenABI,
    eventName: "Transfer",
    ...config,
  } as UseContractEventConfig<typeof tokenABI, "Transfer">);
}
