import { Pool } from "types";
import { BigNumber, utils } from "ethers";

interface ConvertBuyLimitArgsProps {
  amount: string;
  price: string;
  boost: string;
  pool: Pool;
}
export const convertBuyLimitArgs = ({
  amount,
  price,
  boost,
  pool,
}: ConvertBuyLimitArgsProps) => {
  const { decimals } = pool.underlying;
  const convertedAmount = Number(amount) * Number(price);
  const finalAmount: BigNumber = utils.parseUnits(
    convertedAmount.toFixed(decimals),
    decimals
  );
  const finalPrice: BigNumber = utils.parseUnits(price, decimals);
  return { amount: finalAmount, price: finalPrice, boost };
};
