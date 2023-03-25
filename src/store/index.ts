import { PoolState } from "types";
import { create } from "zustand";

export const usePoolStore = create<PoolState>((set) => ({
  pool: "1",
  updatePool: (newPool) => set(() => ({ pool: newPool })),
}));
