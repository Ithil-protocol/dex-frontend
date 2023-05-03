import { usePoolStore } from "@/store";
import { BigNumber, utils } from "ethers";
import { fixPrecision } from "@/utility/converters";

export const useBuyPriceConverter = () => {
  const buyPool = usePoolStore((store) => store.buyPool);
  return (price: BigNumber) => {
    const value = Number(utils.formatUnits(price, buyPool.underlying.decimals));
    return fixPrecision(value, buyPool.underlying.displayPrecision);
  };
};
