import { pairs } from "data/pools";
import { PoolState } from "types";
import { create } from "zustand";

export const usePoolStore = create<PoolState>((set) => ({
  pair: pairs[0],
  pairValue: 0,
  side: "sell",
  pool: pairs[0]["sell"],
  updateSide: (side) => {
    set((state) => {
      console.log("state", state.side);
      return {
        side,
        pool: pairs[state.pairValue][side],
      };
    });
  },
  updatePair: (pair) => {
    set({
      pair,
      pairValue: pair.value,
    });
  },
}));
