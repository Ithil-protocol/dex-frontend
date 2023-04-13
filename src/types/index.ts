import {
  AbiConstructor,
  AbiError,
  AbiEvent,
  AbiFunction,
  Narrow,
} from "abitype";
import { poolABI } from "hooks/contracts/pool";

export type CustomInputEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

export interface StringMap {
  [prop: string]: any;
}

export interface OpenOrder {
  address: string;
  amount: string;
  price: string;
  side: string;
  staked: string;
  status: string;
  total: string;
  blockNumber: number;
  fullDate: string;
}

export interface Token {
  label: string;
  icon: JSX.Element;
  address: string;
  decimals: number;
}

export interface Side {
  underlying: Token;
  accounting: Token;
}

export type SideKey = "sell" | "buy";

export interface Pool {
  sell: Side;
  buy: Side;
  value: string;
  address: string;
}

export interface PoolState {
  pool: Pool;
  poolValue: string;
  sideKey: SideKey;
  side: Side;
  updateSide: (side: SideKey) => void;
  updatePool: (newPool: Pool) => void;
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

type FuncName = Extract<(typeof poolABI)[number], { type: "function" }>["name"];

export type CustomContractConfig = ({
  abi: typeof poolABI;
  address: `0x${string}`;
  functionName: FuncName;
} & {
  args?: readonly unknown[] | undefined;
} & {
  chainId?: number | undefined;
})[];
