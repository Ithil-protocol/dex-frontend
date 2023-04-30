import { pairs } from "data/pools";
import { PoolState } from "types";
import { create } from "zustand";

const typeObj = {
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
      return {
        side,
        pool: pairs[state.pairValue][typeObj[state.type + "-" + side]],
      };
    });
  },
  updatePair: (pair) => {
    set((state) => ({
      pair,
      pairValue: pair.value,
      default: pairs[pair.value]["sell"],
      sellPool: pairs[pair.value]["sell"],
      buyPool: pairs[pair.value]["buy"],
    }));
  },
  updateType: (type) => {
    set((state) => ({
      type,
      pool: pairs[state.pairValue][typeObj[type + "-" + state.side]],
    }));
  },
}));
