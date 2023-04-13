import { pairs } from "data/pools";
import { PoolState } from "types";
import { useContractRead } from "wagmi";
import { create } from "zustand";
import { contractABI } from "./abi";
import { readContracts } from "wagmi";

export const usePoolStore = create<PoolState>((set) => ({
  pair: pairs[0],
  pairValue: "1",
  side: "sell",
  pool: pairs[0]["sell"],
  updateSide: (side) => {
    set((state) => ({
      side,
      pool: pairs[state.side],
    }));
  },
  updatePair: (pair) => {
    set({
      pair,
      pairValue: pair.value,
    });
  },
}));
