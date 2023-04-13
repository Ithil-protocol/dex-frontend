import { pools } from "data/pools";
import { PoolState } from "types";
import { useContractRead } from "wagmi";
import { create } from "zustand";
import { contractABI } from "./abi";
import { readContracts } from "wagmi";

export const usePoolStore = create<PoolState>((set) => ({
  pool: pools[0],
  poolValue: "1",
  sideKey: "sell",
  side: pools[0]["sell"],
  updateSide: (sideKey) => {
    set((state) => ({
      // sideKey,
      side: pools[state.sideKey],
    }));
  },
  updatePool: (newPool) => {
    set({
      pool: newPool,
      poolValue: newPool.value,
    });
  },
}));
