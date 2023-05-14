import { OrderBook, Pool } from "@/types";
import { BigNumber, constants, utils } from "ethers";
import {
  usePoolGetNextPriceLevel,
  usePoolPreviewOrder,
  usePoolPreviewTake,
} from "@/hooks/contracts/pool";
import { appConfig } from "@/config";
import { usePoolStore } from "@/store";
import { STAKED_DECIMALS } from "@/config/constants";
import { useBuyVolumes } from "@/hooks/contract";
import { useBuyAmountConverter } from "@/hooks/converters";

interface ConvertLimitArgsProps {
  amount: string | undefined;
  price: string | undefined;
  boost: string | undefined;
  pool: Pool;
}
export const useConvertBuyLimitArgs = ({
  amount = "0",
  price = "0",
  boost = "0",
  pool,
}: ConvertLimitArgsProps) => {
  const { decimals } = pool.underlying;
  const convertedAmount = Number(amount) * Number(price);
  const finalAmount: BigNumber = utils.parseUnits(
    convertedAmount.toFixed(decimals),
    decimals
  );
  const finalPrice: BigNumber = utils.parseUnits(
    Number(price).toFixed(decimals),
    decimals
  );
  const finalBoost: BigNumber = utils.parseUnits(
    Number(boost).toFixed(STAKED_DECIMALS),
    STAKED_DECIMALS
  );
  const { data: preview } = usePoolPreviewOrder({
    address: pool.address,
    args: [finalPrice, finalBoost],
    watch: true,
  });
  const actualPrice = preview?.actualPrice ?? constants.Zero;
  const position = preview?.position ?? constants.Zero;
  const cumulativeUndAmount = preview?.cumulativeUndAmount ?? constants.Zero;
  return {
    amount: finalAmount,
    price: finalPrice,
    boost: finalBoost,
    pool,
    actualPrice,
    position,
    cumulativeUndAmount,
  };
};

export const useConvertSellLimitArgs = ({
  amount = "0",
  price = "0",
  boost = "0",
  pool,
}: ConvertLimitArgsProps) => {
  const { decimals } = pool.underlying;
  const convertedPrice = Number(price) === 0 ? 0 : 1 / Number(price);
  const finalPrice: BigNumber = utils.parseUnits(
    convertedPrice.toFixed(decimals),
    decimals
  );
  const finalAmount: BigNumber = utils.parseUnits(
    Number(amount).toFixed(decimals),
    decimals
  );
  const finalBoost: BigNumber = utils.parseUnits(
    Number(boost).toFixed(STAKED_DECIMALS),
    STAKED_DECIMALS
  );
  const { data: preview } = usePoolPreviewOrder({
    address: pool.address,
    args: [finalPrice, finalBoost],
    watch: true,
  });
  const actualPrice = preview?.actualPrice ?? constants.Zero;
  const position = preview?.position ?? constants.Zero;
  const cumulativeUndAmount = preview?.cumulativeUndAmount ?? constants.Zero;
  return {
    amount: finalAmount,
    price: finalPrice,
    boost: finalBoost,
    pool,
    actualPrice,
    position,
    cumulativeUndAmount,
  };
};

interface ConvertMarketArgsProps {
  amount: string | undefined;
  pool: Pool;
}

export const useConvertSellMarketArgs = ({
  amount = "0",
  pool,
}: ConvertMarketArgsProps) => {
  const underlyingDecimals = pool.underlying.decimals;
  const accountingDecimals = pool.accounting.decimals;
  const pair = usePoolStore((state) => state.pair);

  const { data: highestPrice } = usePoolGetNextPriceLevel({
    address: pool.address,
    args: [constants.Zero],
    watch: true,
  });

  const { data } = useBuyVolumes();
  const buyAmountConverter = useBuyAmountConverter();

  const getAmount = (list: OrderBook[] | undefined) => {
    if (list) {
      const itemAmount = buyAmountConverter(list[0].volume, list[0].value);

      console.log(itemAmount);
    }
  };

  getAmount(data);

  // if amount is 0.00041 WETH and highestPrice is 2672 then finalAmount will be 1.09552 USDC
  const minConvertedAmount = highestPrice
    ? Number(utils.formatUnits(highestPrice, underlyingDecimals)) *
      Number(amount) *
      (1 - appConfig.slippage(pair.tick))
    : 0;

  const maxConvertedAmount = Number(amount);

  const finalAmount = utils.parseUnits(
    minConvertedAmount.toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const { data: previewTake } = usePoolPreviewTake({
    address: pool.address,
    args: [finalAmount],
  });
  const accountingToPay = previewTake ? previewTake[0] : constants.Zero;
  const totalToTake = previewTake
    ? Number(utils.formatUnits(previewTake[1], underlyingDecimals))
    : 0;

  const isTooMuchSlippage =
    Number(utils.formatUnits(accountingToPay, accountingDecimals) || 0) >
    maxConvertedAmount;
  const isExceedsLiquidity = previewTake
    ? totalToTake < minConvertedAmount
    : false;

  const minReceived = utils.parseUnits(
    minConvertedAmount.toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const finalMaxPaid = utils.parseUnits(
    maxConvertedAmount.toFixed(accountingDecimals),
    accountingDecimals
  );

  return {
    amount: finalAmount,
    minReceived,
    maxPaid: finalMaxPaid,
    pool,
    totalToTake,
    isTooMuchSlippage,
    isExceedsLiquidity,
    price: highestPrice || constants.Zero,
    inputAmount: Number(amount),
  };
};

export const useConvertBuyMarketArgs = ({
  amount = "0",
  pool,
}: ConvertMarketArgsProps) => {
  const underlyingDecimals = pool.underlying.decimals;
  const accountingDecimals = pool.accounting.decimals;
  const pair = usePoolStore((state) => state.pair);
  //here final amount is equal to inputAmount with respected decimals (underlying decimals)

  const finalAmount = utils.parseUnits(
    Number(amount).toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const { data: previewTake } = usePoolPreviewTake({
    address: pool.address,
    args: [finalAmount],
  });

  const accountingToPay = previewTake ? previewTake[0] : constants.Zero;
  const amountOut = previewTake ? previewTake[1] : constants.Zero;
  const isAmountOut =
    Number(utils.formatUnits(amountOut, underlyingDecimals)) < Number(amount);

  const minReceived = utils.parseUnits(
    (Number(amount) * 0.99).toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const totalToPay = Number(
    utils.formatUnits(accountingToPay, accountingDecimals)
  );

  const maxPaid = utils.parseUnits(
    (totalToPay * (appConfig.slippage(pair.tick) + 1)).toFixed(
      accountingDecimals
    ),
    accountingDecimals
  );

  return {
    amount: finalAmount,
    minReceived,
    maxPaid,
    pool,
    totalToPay,
    isAmountOut,
  };
};
