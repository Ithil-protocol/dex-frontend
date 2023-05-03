import { usePoolStore } from "store";
import { BigNumber, utils } from "ethers";
import { fixPrecision } from "utility/converters";

export const useSellPriceConverter = () => {
  const sellPool = usePoolStore((store) => store.sellPool);
  return (price: BigNumber) => {
    const formattedPrice = Number(
      utils.formatUnits(price, sellPool.underlying.decimals)
    );
    const value = formattedPrice !== 0 ? 1 / formattedPrice : 0;

    return fixPrecision(value, sellPool.accounting.displayPrecision);
  };
};
