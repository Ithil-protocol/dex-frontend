import { usePoolStore } from "@/store";
import { BigNumber } from "ethers";
import { buyAmountConverter, fixPrecision } from "@/utility/converters";

export const useBuyAmountConverter = () => {
  const buyPool = usePoolStore((store) => store.buyPool);
  return (amount: BigNumber, price: BigNumber) => {
    const result = buyAmountConverter(amount, price, buyPool);
    return fixPrecision(result, buyPool.accounting.displayPrecision);
  };
};
