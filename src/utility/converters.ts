import { BigNumber, utils } from "ethers";
import { Pool } from "@/types";

export const buyPriceConverter = (price: BigNumber, pool: Pool) => {
  return Number(utils.formatUnits(price, pool.underlying.decimals));
};

export const buyAmountConverter = (
  amount: BigNumber,
  price: BigNumber,
  buyPool: Pool
) => {
  return (
    Number(utils.formatUnits(amount, buyPool.underlying.decimals)) /
    Number(utils.formatUnits(price, buyPool.underlying.decimals))
  );
};

export const sellPriceConverter = (price: BigNumber, pool: Pool) => {
  return 1 / Number(utils.formatUnits(price, pool.underlying.decimals));
};

export const sellAmountConverter = (amount: BigNumber, pool: Pool) => {
  return utils.formatUnits(amount, pool.underlying.decimals);
};

export const fixPrecision = (value: number, precision: number) => {
  value = value * Math.pow(10, precision);
  value = Math.round(value);
  value = value / Math.pow(10, precision);

  return value;
};
