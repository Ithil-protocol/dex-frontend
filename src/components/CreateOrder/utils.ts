import { Pool } from "types";
import { BigNumber, utils } from "ethers";
import {
  usePoolGetNextPriceLevel,
  usePoolPreviewTake,
} from "hooks/contracts/pool";
import { zeroBigNumber } from "utility";

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
  const convertedPrice =
    Number(price) === 0
      ? 0
      : Math.floor((1 / Number(price)) * Math.pow(10, decimals));
  const finalPrice: BigNumber = utils.parseUnits(convertedPrice.toString(), 0);
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
    args: [zeroBigNumber],
    watch: true,
  });

  // if amount is 0.00041 WETH and highestPrice is 2672 then finalAmount will be 1.09552 USDC
  const convertedAmount = highestPrice
    ? Number(utils.formatUnits(highestPrice, underlyingDecimals)) *
      Number(amount)
    : 0;

  const finalAmount = utils.parseUnits(
    convertedAmount.toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const { data: previewTake } = usePoolPreviewTake({
    address: pool.address,
    args: [
      utils.parseUnits(
        convertedAmount.toFixed(underlyingDecimals),
        underlyingDecimals
      ),
    ],
  });
  const accountingToPay = previewTake ? previewTake[0] : zeroBigNumber;

  const minReceived = utils.parseUnits(
    (convertedAmount * 0.99).toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const maxPaid =
    Number(utils.formatUnits(accountingToPay, accountingDecimals)) * 1.001;
  const finalMaxPaid = utils.parseUnits(
    maxPaid.toFixed(accountingDecimals),
    accountingDecimals
  );

  return {
    amount: finalAmount,
    minReceived,
    maxPaid: finalMaxPaid,
    pool,
    totalToTake: convertedAmount,
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

  const accountingToPay = previewTake ? previewTake[0] : zeroBigNumber;

  const minReceived = utils.parseUnits(
    (Number(amount) * 0.99).toFixed(underlyingDecimals),
    underlyingDecimals
  );

  const totalToPay = Number(
    utils.formatUnits(accountingToPay, accountingDecimals)
  );

  const maxPaid = utils.parseUnits(
    (totalToPay * 1.001).toFixed(accountingDecimals),
    accountingDecimals
  );

  return { amount: finalAmount, minReceived, maxPaid, pool, totalToPay };
};
