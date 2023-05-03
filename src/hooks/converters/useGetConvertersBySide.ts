import { Side } from "types";
import { useGetConverters } from "./useGetConverters";

export const useGetConvertersBySide = (side: Side) => {
  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
    stakedConverter,
  } = useGetConverters();

  const converters = {
    buy: {
      amountConverter: buyAmountConverter,
      priceConverter: buyPriceConverter,
      stakedConverter,
    },
    sell: {
      amountConverter: sellAmountConverter,
      priceConverter: sellPriceConverter,
      stakedConverter,
    },
  };

  return converters[side];
};
