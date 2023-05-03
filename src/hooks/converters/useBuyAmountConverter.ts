import { usePoolStore } from "@/store";
import { BigNumber, utils } from "ethers";
import { fixPrecision } from "@/utility/converters";

export const useBuyAmountConverter = () => {
  const buyPool = usePoolStore((store) => store.buyPool);
  return (amount: BigNumber, price: BigNumber) => {
    const value =
      Number(utils.formatUnits(amount, buyPool.underlying.decimals)) /
      Number(utils.formatUnits(price, buyPool.underlying.decimals));
    return fixPrecision(value, buyPool.accounting.displayPrecision);
  };
};
