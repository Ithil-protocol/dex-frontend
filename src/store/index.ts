import { pools } from "data/pools";
import { PoolState } from "types";
import { create } from "zustand";

export const usePoolStore = create<PoolState>((set) => ({
  pool: pools[0],
  poolValue: "1",
  updatePool: (newPool) => {
    set({
      pool: newPool,
      poolValue: newPool.value,
    });
  },
}));
