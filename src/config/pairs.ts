import { PairInitial } from "@/types";

export const pairs: PairInitial[] = [
  {
    tick: 1,
    undToAccBase: 20000,
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
  {
    tick: 5,
    undToAccBase: 10,
    accToUndBase: 20000,
    undToAccChartUrl: "UNISWAP3ARBITRUM:WETHUSDC",
    accToUndChartUrl: "UNISWAP3ARBITRUM:USDCWETH",
    underlying: {
      label: "WETH",
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      displayPrecision: 6,
    },
    accounting: {
      label: "USDC",
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      displayPrecision: 2,
    },
  },
  {
    tick: 10,
    undToAccBase: 10,
    accToUndBase: 10,
    undToAccChartUrl: "UNISWAP3ARBITRUM:WETHARB",
    accToUndChartUrl: "UNISWAP3ARBITRUM:ARBWETH",
    underlying: {
      label: "WETH",
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      displayPrecision: 2,
    },
    accounting: {
      label: "ARB",
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      displayPrecision: 4,
    },
  },
];
