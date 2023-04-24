import { BigNumber, utils } from "ethers";
import { Pool } from "types";

export const buyPriceConverter = (price: BigNumber, pool: Pool) => {
  // pool is equal to buyPool
  return Number(utils.formatUnits(price, pool.underlying.decimals));
};

export const buyAmountConverter = (amount: BigNumber, pool: Pool) => {
  // pool is equal to buyPool
  return Number(utils.formatUnits(amount, pool.underlying.decimals));
};
