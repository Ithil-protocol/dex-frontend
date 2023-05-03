import { Pool } from "@/types";
import { BigNumber, constants, utils } from "ethers";
import {
  usePoolGetNextPriceLevel,
  usePoolPreviewTake,
} from "@/hooks/contracts/pool";
import { localConstants } from "@/variables";
import { appConfig } from "@/config";

interface ConvertLimitArgsProps {
  amount: string | undefined;
  price: string | undefined;
  boost: string | undefined;
  pool: Pool;
}
export const convertBuyLimitArgs = ({
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
  const finalBoost: BigNumber = utils.parseUnits(Number(boost).toFixed(18), 18);
  return { amount: finalAmount, price: finalPrice, boost: finalBoost, pool };
};

export const convertSellLimitArgs = ({
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
  const finalBoost: BigNumber = utils.parseUnits(Number(boost).toFixed(18), 18);
  return { amount: finalAmount, price: finalPrice, boost: finalBoost, pool };
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

  const { data: highestPrice } = usePoolGetNextPriceLevel({
    address: pool.address,
    args: [constants.Zero],
    watch: true,
  });

  // if amount is 0.00041 WETH and highestPrice is 2672 then finalAmount will be 1.09552 USDC
  const convertedAmount = highestPrice
    ? Number(utils.formatUnits(highestPrice, underlyingDecimals)) *
      Number(amount) *
      (1 - appConfig.SLIPPAGE)
    : 0;

  const finalAmount = utils.parseUnits(
    convertedAmount.toFixed(underlyingDecimals),
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
  const isAmountOut = totalToTake < convertedAmount;

  const minReceived = utils.parseUnits(
    (convertedAmount * (1 - appConfig.SLIPPAGE)).toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const maxPaid =
    Number(utils.formatUnits(accountingToPay, accountingDecimals)) *
    (1 + appConfig.SLIPPAGE);
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
    isAmountOut,
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
    (totalToPay * (appConfig.SLIPPAGE + 1)).toFixed(accountingDecimals),
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
