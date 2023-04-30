import { BigNumber, utils } from "ethers";
import { Pool } from "types";

export const buyPriceConverter = (price: BigNumber, pool: Pool) => {
  // pool is equal to buyPool
  return Number(utils.formatUnits(price, pool.underlying.decimals));
};

export const buyAmountConverter = (
  amount: BigNumber,
  price: BigNumber,
  pool: Pool
) => {
  // pool is equal to buyPool
  return (
    Number(utils.formatUnits(amount, pool.underlying.decimals)) /
    Number(utils.formatUnits(price, pool.underlying.decimals))
  );
};

export const sellPriceConverter = (price: BigNumber, pool: Pool) => {
  // pool is equal to sellPool
  return 1 / Number(utils.formatUnits(price, pool.underlying.decimals));
};

export const sellAmountConverter = (amount: BigNumber, pool: Pool) => {
  // pool is equal to sellPool
  return utils.formatUnits(amount, pool.underlying.decimals);
};
// toFixed can be called here if needed

//TODO: Add (buy|sell) convertor for staked

// fixing precision manually
export const fixPrecision = (value: number, precision: number) => {
  value = value * Math.pow(10, precision);
  value = Math.round(value);
  value = value / Math.pow(10, precision);

  return value;
};
