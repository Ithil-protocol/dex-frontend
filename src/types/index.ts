/* eslint-disable no-use-before-define */
import {
  AbiConstructor,
  AbiError,
  AbiEvent,
  AbiFunction,
  Narrow,
} from "abitype";
import { BigNumber } from "ethers";
import { poolABI } from "hooks/contracts/pool";

export type CustomInputEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

export type Status = "open" | "fulfilled" | "canceled";

export interface HistoryEvent {
  amount: string;
  getBlock: any;
  pool: Pool;
  price: string;
  rawAmount: BigNumber;
  rawPrice: BigNumber;
  rawStaked: BigNumber;
  side: Side;
  staked: string;
  status: Status;
  transactionHash: string;
}

export interface OpenOrderEvent {
  address: string;
  amount: string;
  getBlock: any;
  index: BigNumber;
  pool: Pool;
  price: string;
  rawAmount: BigNumber;
  rawPrice: BigNumber;
  rawStaked: BigNumber;
  side: Side;
  staked: string;
  transactionHash: string;
}

export interface MarketEvent {
  amount: string;
  getBlock: any;
  pool: Pool;
  price: string;
  rawAmount: BigNumber;
  rawPrice: BigNumber;
}

export interface StringMap {
  [prop: string]: any;
}

export interface Token {
  icon: any;
  address: `0x${string}`;
  decimals: number;
}

export interface Pool {
  underlying: Token;
  accounting: Token;
  address: `0x${string}`;
}

export type Side = "sell" | "buy";
export type LimitMarket = "limit" | "market";

export interface Pair {
  underlyingLabel: string;
  accountingLabel: string;
  sell: Pool;
  buy: Pool;
  value: number;
}

export interface PoolState {
  pair: Pair;
  pairValue: number;
  type: LimitMarket;
  side: Side;
  pool: Pool;
  default: Pool;
  sellPool: Pool;
  buyPool: Pool;
  updateSide: (_: Side) => void;
  updatePair: (_: Pair) => void;
  updateType: (_: LimitMarket) => void;
}

export interface OrderBook {
  originalPrice: BigNumber;
  value: number;
  volume: number;
  type: "buy" | "sell";
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

// Form Type

export interface LimitInputs {
  price: string;
  amount: string;
  boost: string | undefined;
}
export interface FactoryInputs {
  underlyingAddress: string;
  accountingAddress: string;
}

export interface MarketInputs {
  amount: string;
}

export type ThemeColor =
  | "error"
  | "success"
  | "inherit"
  | "info"
  | "primary"
  | "secondary"
  | "warning";
