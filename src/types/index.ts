import {
  Abi,
  AbiConstructor,
  AbiError,
  AbiEvent,
  AbiFunction,
  Narrow,
} from "abitype";
import { poolABI } from "hooks/contracts/pool";

export interface Pool {
  underlyingLabel: string;
  underlyingIcon: JSX.Element;
  accountingLabel: string;
  accountingIcon: JSX.Element;
  value: string;
}

export interface PoolState {
  pool: string;
  updatePool: (newPool: string) => void;
}

export interface Order {
  id: string;
  value: number;
  volume: number;
  time: number;
  type: "maker" | "taker";
}
export interface OrderObj {
  [index: string]: Order;
}

export type ContractInputs =
  | (
      | {
          abi?:
            | readonly Narrow<
                AbiFunction | AbiEvent | AbiError | AbiConstructor
              >[]
            | undefined;
          address?: `0x${string}` | undefined;
          functionName?: string | undefined;
          args?: readonly unknown[] | undefined;
          chainId?: number | undefined;
        }
      | undefined
    )
  | undefined;

export type CustomContractConfig = readonly ({
  abi: typeof poolABI;
  address: `0x${string}`;
  functionName: string;
} & {
  args?: readonly unknown[] | undefined;
} & {
  chainId?: number | undefined;
})[];
