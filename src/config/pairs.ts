import { PairInitial } from "@/types";

export const pairs: PairInitial[] = [
  {
    tick: 1,
    undToAccBase: 0.5,
    accToUndBase: 50,
    undToAccChartUrl: "UNISWAP3ARBITRUM:WETHDAI",
    accToUndChartUrl: "UNISWAP3ARBITRUM:WETHDAIXX",
    underlying: {
      label: "WETH",
      address: "0x710BC8FcE37189b3E0B7bc0581966CAa48f86E7b",
      displayPrecision: 6,
    },
    accounting: {
      label: "DAI",
      address: "0x450637ab161716238e39272da1a3c2ccfc15c9a2",
      displayPrecision: 2,
    },
  },
  {
    tick: 5,
    undToAccBase: 10,
    accToUndBase: 10,
    undToAccChartUrl: "UNISWAP3ARBITRUM:WETHDAI",
    accToUndChartUrl: "UNISWAP3ARBITRUM:DAIWETH",
    underlying: {
      label: "WBTC",
      address: "0x6a9783Fc3397cF904d7225C99D2f679f6f5E4858",
      displayPrecision: 6,
    },
    accounting: {
      label: "DAI",
      address: "0x450637ab161716238e39272da1a3c2ccfc15c9a2",
      displayPrecision: 2,
    },
  },
  {
    tick: 10,
    undToAccBase: 10,
    accToUndBase: 10,
    undToAccChartUrl: "UNISWAP3ARBITRUM:WETHDAI",
    accToUndChartUrl: "UNISWAP3ARBITRUM:WETHDAIXX3",
    underlying: {
      label: "WBTC",
      address: "0x6a9783Fc3397cF904d7225C99D2f679f6f5E4858",
      displayPrecision: 6,
    },
    accounting: {
      label: "WETH",
      address: "0x710BC8FcE37189b3E0B7bc0581966CAa48f86E7b",
      displayPrecision: 6,
    },
  },
];
