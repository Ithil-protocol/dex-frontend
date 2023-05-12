const SLIPPAGE = 0.001;

interface AppConfig {
  slippage: (tick: number) => number;
}

export const appConfig: AppConfig = {
  slippage: (tick) => tick * SLIPPAGE,
};
