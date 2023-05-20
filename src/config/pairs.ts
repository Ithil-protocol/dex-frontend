import { PairInitial } from "@/types";

export const pairs: PairInitial[] = [
  {
    tick: 1,
    undToAccBase: 10,
    accToUndBase: 20000,
    undToAccChartUrl: "UNISWAP3ETH:USDCUSDT",
    accToUndChartUrl: "UNISWAP3ETH:USDTUSDC",
    underlying: {
      label: "USDC",
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      displayPrecision: 6,
    },
    accounting: {
      label: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      displayPrecision: 6,
    },
  },
];
