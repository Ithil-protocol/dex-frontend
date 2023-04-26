import { usePoolStore } from "store";
import { BigNumber, utils } from "ethers";
import round from "lodash/round";

export const useBuyPriceConverter = () => {
  const pool = usePoolStore((store) => store.buyPool);
  return (price: BigNumber) =>
    Number(utils.formatUnits(price, pool.underlying.decimals));
};

export const useSellPriceConverter = () => {
  const pool = usePoolStore((store) => store.sellPool);
  return (price: BigNumber) =>
    Number(utils.formatUnits(price, pool.underlying.decimals));
};
