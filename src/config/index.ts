import { SLIPPAGE } from "./constants";

interface AppConfig {
  slippage: (tick: number) => number;
}

export const appConfig: AppConfig = {
  slippage: (tick) => tick * SLIPPAGE,
};
