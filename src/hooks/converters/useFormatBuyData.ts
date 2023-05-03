import { FormattedOrderBook } from "@/types";
import { useBuyVolumes } from "@/hooks/contract";
import { useBuyPriceConverter } from "./useBuyPriceConverter";
import { useBuyAmountConverter } from "./useBuyAmountConverter";

export const useFormatBuyData = () => {
  const result = useBuyVolumes();

  const priceConverter = useBuyPriceConverter();
  const amountConverter = useBuyAmountConverter();

  const formattedData: FormattedOrderBook[] = [];

  result.data?.forEach((item) => {
    const formattedValue = priceConverter(item.value);
    const formattedAmount = amountConverter(item.volume, item.value);

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
