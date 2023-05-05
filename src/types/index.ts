/* eslint-disable no-use-before-define */
import {
  AbiConstructor,
  AbiError,
  AbiEvent,
  AbiFunction,
  Narrow,
} from "abitype";
import { BigNumber } from "ethers";
import { poolABI } from "@/hooks/contracts/pool";

export type CustomInputEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

export type Status =
  | "canceled"
  | "canceling"
  | "error"
  | "fulfilled"
  | "open"
  | "pending";

export interface HistoryEvent {
  amount: number;
  price: number;
  rawAmount: BigNumber;
  rawPrice: BigNumber;
  rawStaked: BigNumber;
  side: Side;
  staked: number;
  status: Status;
  transactionHash: string;
  timestamp: number;
}

export interface OpenOrderEvent {
  address: string;
  amount: number;
  index: BigNumber;
  price: number;
  rawAmount: BigNumber;
  rawPrice: BigNumber;
  rawStaked: BigNumber;
  side: Side;
  staked: number;
  transactionHash: string;
  timestamp: number;
  status: Status;
}

export interface MarketEvent {
  price: number;
  amount: number;
  side: Side;
  timestamp: number;
}

export interface StringMap {
  [prop: string]: any;
}

export interface Token {
  icon: any;
  address: `0x${string}`;
  decimals: number;
  displayPrecision: number;
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
  tick: number;
  base: number;
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
  // originalPrice: BigNumber;
  value: BigNumber;
  volume: BigNumber;
  type: "buy" | "sell";
}

export interface FormattedOrderBook {
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

export interface LimitFinalValues {
  amount: BigNumber;
  price: BigNumber;
  boost: BigNumber;
  pool: Pool;
  actualPrice: BigNumber;
  position: BigNumber;
  cumulativeUndAmount: BigNumber;
}

export interface MarketSellFinalValues {
  amount: BigNumber;
  price: BigNumber;
  minReceived: BigNumber;
  maxPaid: BigNumber;
  pool: Pool;
  totalToTake: number;
  inputAmount: number;
}
export interface MarketBuyFinalValues {
  amount: BigNumber;
  minReceived: BigNumber;
  maxPaid: BigNumber;
  pool: Pool;
  totalToPay: number;
}
