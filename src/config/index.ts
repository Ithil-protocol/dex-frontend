import { AppConfig } from "./config.type";
import { SLIPPAGE } from "./constants";

export const appConfig: AppConfig = {
  slippage: (tick) => tick * SLIPPAGE,
};
