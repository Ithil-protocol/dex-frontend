import { Pool } from "types";
import { BigNumber, utils } from "ethers";

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
