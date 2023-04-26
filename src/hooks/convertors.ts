import { usePoolStore } from "store";
import { BigNumber, utils } from "ethers";
import round from "lodash/round";

export const useBuyPriceConverter = () => {
  const pool = usePoolStore((store) => store.buyPool);

  return (price: BigNumber) =>
    round(Number(utils.formatUnits(price, pool.underlying.decimals)), 5);
};

export const useSellPriceConverter = () => {
  const pool = usePoolStore((store) => store.sellPool);
  return (price: BigNumber) =>
    round(Number(utils.formatUnits(price, pool.underlying.decimals)), 5);
};
