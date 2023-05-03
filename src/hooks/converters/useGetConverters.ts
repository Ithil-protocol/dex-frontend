import { useBuyAmountConverter } from "./useBuyAmountConverter";
import { useBuyPriceConverter } from "./useBuyPriceConverter";
import { useSellAmountConverter } from "./useSellAmountConverter";
import { useSellPriceConverter } from "./useSellPriceConverters";
import { useStakedConverter } from "./useStakedConverter";

export const useGetConverters = () => {
  return {
    buyAmountConverter: useBuyAmountConverter(),
    buyPriceConverter: useBuyPriceConverter(),
    sellAmountConverter: useSellAmountConverter(),
    sellPriceConverter: useSellPriceConverter(),
    stakedConverter: useStakedConverter(),
  };
};
