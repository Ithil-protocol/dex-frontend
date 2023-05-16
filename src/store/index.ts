import { pairs } from "@/data/pools";
import { LimitMarket, PoolState, Side } from "@/types";
import { create } from "zustand";

type Key = `${LimitMarket}-${Side}`;
type TypeObj = {
  [P in Key]: Side;
};

const typeObj: TypeObj = {
  "limit-sell": "sell",
  "limit-buy": "buy",
  "market-sell": "buy",
  "market-buy": "sell",
};

export const usePoolStore = create<PoolState>((set) => ({
  pair: pairs[0],
  pairValue: 0,
  side: "sell",
  pool: pairs[0]["sell"],
  type: "limit",
  default: pairs[0]["sell"],
  sellPool: pairs[0]["sell"],
  buyPool: pairs[0]["buy"],
  updateSide: (side) => {
    set((state) => {
      const key = (state.type + "-" + side) as Key;
      return {
        side,
        pool: pairs[state.pairValue][typeObj[key]],
      };
    });
  },
  updatePair: (pair) => {
    set(() => ({
      pair,
      pairValue: pair.value,
      default: pairs[pair.value]["sell"],
      sellPool: pairs[pair.value]["sell"],
      buyPool: pairs[pair.value]["buy"],
    }));
  },
  updateType: (type) => {
    set((state) => {
      const key = (type + "-" + state.side) as Key;
      return {
        type,
        pool: pairs[state.pairValue][typeObj[key]],
      };
    });
  },
}));
