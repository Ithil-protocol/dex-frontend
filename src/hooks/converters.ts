import { usePoolStore } from "store";
import { BigNumber, utils } from "ethers";
import { FormattedOrderBook } from "types";
import { useBuyVolumes, useSellVolumes } from "./contract";
import { fixPrecision } from "utility/convertors";

export const useBuyAmountConverter = () => {
  const pool = usePoolStore((store) => store.buyPool);
  return (amount: BigNumber, price: BigNumber) => {
    const value =
      Number(utils.formatUnits(amount, pool.underlying.decimals)) /
      Number(utils.formatUnits(price, pool.underlying.decimals));
    return fixPrecision(value, pool.accounting.decimals / 3);
  };
};
export const useSellAmountConverter = () => {
  const pool = usePoolStore((store) => store.sellPool);
  return (amount: BigNumber) => {
    const value = Number(utils.formatUnits(amount, pool.underlying.decimals));
    return fixPrecision(value, pool.underlying.decimals / 3);
  };
};

export const useBuyPriceConverter = () => {
  const pool = usePoolStore((store) => store.buyPool);
  return (price: BigNumber) => {
    const value = Number(utils.formatUnits(price, pool.underlying.decimals));
    return fixPrecision(value, pool.underlying.decimals / 3);
  };
};
export const useSellPriceConverter = () => {
  const pool = usePoolStore((store) => store.sellPool);
  return (price: BigNumber) => {
    const formattedPrice = Number(
      utils.formatUnits(price, pool.underlying.decimals)
    );
    const value = formattedPrice !== 0 ? 1 / formattedPrice : 0;

    return fixPrecision(value, pool.accounting.decimals / 3);
  };
};

export const useBuyStakeConverter = () => {
  const pool = usePoolStore((store) => store.buyPool);
  return (stake: BigNumber) => {
    const value = Number(utils.formatUnits(stake, pool.underlying.decimals));
    return fixPrecision(value, pool.underlying.decimals / 3);
  };
};
export const useSellStakeConverter = () => {
  const pool = usePoolStore((store) => store.sellPool);
  return (stake: BigNumber) => {
    const value = Number(utils.formatUnits(stake, pool.underlying.decimals));
    return fixPrecision(value, pool.underlying.decimals / 3);
  };
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
