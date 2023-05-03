import { usePoolStore } from "@/store";
import { BigNumber, utils } from "ethers";
import { fixPrecision } from "@/utility/converters";

export const useSellAmountConverter = () => {
  const sellPool = usePoolStore((store) => store.sellPool);
  return (amount: BigNumber) => {
    const value = Number(
      utils.formatUnits(amount, sellPool.underlying.decimals)
    );
    return fixPrecision(value, sellPool.underlying.displayPrecision);
  };
};
