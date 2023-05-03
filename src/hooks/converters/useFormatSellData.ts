import { FormattedOrderBook } from "types";
import { useSellVolumes } from "../contract";
import { useSellPriceConverter } from "./useSellPriceConverters";
import { useSellAmountConverter } from "./useSellAmountConverter";

export const useFormatSellData = () => {
  const result = useSellVolumes();

  const priceConverter = useSellPriceConverter();
  const amountConverter = useSellAmountConverter();

  const formattedData: FormattedOrderBook[] = [];

  result.data?.forEach((item) => {
    const formattedValue = priceConverter(item.value);
    const formattedAmount = amountConverter(item.volume);

    if (!item.volume.isZero()) {
      formattedData.push({
        ...item,
        value: formattedValue,
        volume: formattedAmount,
      });
    }
  });

  return {
    ...result,
    data: formattedData,
  };
};
