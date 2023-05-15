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
import { buyAmountConverter } from "@/utility/converters";
import { useMemo } from "react";

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

interface GetAmountInSellMarketProps {
  list: OrderBook[] | undefined;
  amount: string;
  pool: Pool;
  underlyingDecimals: number;
}
const getAmountInSellMarket = ({
  list,
  amount,
  pool,
  underlyingDecimals,
}: GetAmountInSellMarketProps) => {
  const inputAmount = Number(amount);
  let residualAmount = inputAmount;
  let totalToBuy = 0;
  let residualIteration = 0;
  let accountingAmount = 0;
  if (list) {
    const filteredList = list.filter((el) => !el.volume.isZero());
    // if the first row amount is enough to fill the order then we just use first row
    const firstRowAmount = buyAmountConverter(
      filteredList[0].volume,
      filteredList[0].value,
      pool
    );
    if (inputAmount < firstRowAmount) {
      totalToBuy =
        Number(utils.formatUnits(filteredList[0].volume, underlyingDecimals)) *
        (inputAmount / firstRowAmount);
      residualAmount = 0;
      return {
        totalToBuy,
        isSlippageTooHigh: false,
        accountingAmount: inputAmount,
      };
    }

    // in every iteration we minus the row amount from inputAmount (or residualAmount) and add respected volume to totalToBuy
    // if residualAmount is negative then we break the loop and return totalToBuy

    for (const row of filteredList) {
      if (residualAmount > 0) {
        const rowAmount = buyAmountConverter(row.volume, row.value, pool);
        const rowVolumeInNumber = Number(
          utils.formatUnits(row.volume, underlyingDecimals)
        );
        if (residualAmount - rowAmount > 0) {
          totalToBuy += rowVolumeInNumber;
          accountingAmount = inputAmount - (residualAmount - rowAmount);
        } else {
          accountingAmount = inputAmount;
          totalToBuy += (residualAmount / rowAmount) * rowVolumeInNumber;
        }
        residualAmount -= rowAmount;
      } else {
        break;
      }
      residualIteration += 1;
    }
  }
  return {
    totalToBuy,
    isSlippageTooHigh: residualIteration >= 8,
    accountingAmount,
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

  const { data: list } = useBuyVolumes();

  const { isSlippageTooHigh, totalToBuy, accountingAmount } = useMemo(
    () => getAmountInSellMarket({ list, amount, pool, underlyingDecimals }),
    [amount, pool, underlyingDecimals, list]
  );

  // if amount is 0.00041 WETH and highestPrice is 2672 then finalAmount will be 1.09552 USDC

  const minAmount = totalToBuy * (1 - appConfig.slippage(pair.tick));

  const finalAmount = utils.parseUnits(
    minAmount.toFixed(underlyingDecimals),
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
  // const isTooMuchSlippage =
  //   Number(utils.formatUnits(accountingToPay, accountingDecimals) || 0) >
  //   maxConvertedAmount;
  const isExceedsLiquidity = false;
  // const isExceedsLiquidity = previewTake ? totalToTake < totalToBuy : false;

  const minReceived = utils.parseUnits(
    minAmount.toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const accountingToPayWithSlippage =
    Number(utils.formatUnits(accountingToPay, accountingDecimals) || 0) /
    (1 - appConfig.slippage(pair.tick));
  const maxPaid = Math.max(accountingAmount, accountingToPayWithSlippage);

  const finalMaxPaid = utils.parseUnits(
    maxPaid.toFixed(accountingDecimals),
    accountingDecimals
  );

  return {
    amount: finalAmount,
    minReceived,
    maxPaid: finalMaxPaid,
    pool,
    totalToTake,
    accountingToPay,
    isTooMuchSlippage: isSlippageTooHigh,
    isExceedsLiquidity,
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
