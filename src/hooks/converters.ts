import { usePoolStore } from "store";
import { BigNumber, utils } from "ethers";
import { FormattedOrderBook, Side } from "types";
import { useBuyVolumes, useSellVolumes } from "./contract";
import { fixPrecision } from "utility/convertors";

export const useBuyAmountConverter = () => {
  const buyPool = usePoolStore((store) => store.buyPool);
  return (amount: BigNumber, price: BigNumber) => {
    const value =
      Number(utils.formatUnits(amount, buyPool.underlying.decimals)) /
      Number(utils.formatUnits(price, buyPool.underlying.decimals));
    return fixPrecision(value, buyPool.accounting.displayPrecision);
  };
};
export const useSellAmountConverter = () => {
  const sellPool = usePoolStore((store) => store.sellPool);
  return (amount: BigNumber) => {
    const value = Number(
      utils.formatUnits(amount, sellPool.underlying.decimals)
    );
    return fixPrecision(value, sellPool.underlying.displayPrecision);
  };
};

export const useBuyPriceConverter = () => {
  const buyPool = usePoolStore((store) => store.buyPool);
  return (price: BigNumber) => {
    const value = Number(utils.formatUnits(price, buyPool.underlying.decimals));
    return fixPrecision(value, buyPool.underlying.displayPrecision);
  };
};
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

export const useStakedConverter = () => {
  return (stake: BigNumber) => {
    const value = Number(utils.formatUnits(stake, 18));
    return fixPrecision(value, 6);
  };
};

export const useGetConverters = () => {
  return {
    buyAmountConverter: useBuyAmountConverter(),
    buyPriceConverter: useBuyPriceConverter(),
    sellAmountConverter: useSellAmountConverter(),
    sellPriceConverter: useSellPriceConverter(),
    stakedConverter: useStakedConverter(),
  };
};

export const useGetConvertersBySide = (side: Side) => {
  const buyAmountConverter = useBuyAmountConverter();
  const buyPriceConverter = useBuyPriceConverter();
  const stakedConverter = useStakedConverter();
  const sellAmountConverter = useSellAmountConverter();
  const sellPriceConverter = useSellPriceConverter();

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
