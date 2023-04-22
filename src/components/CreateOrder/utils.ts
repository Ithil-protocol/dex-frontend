import { Pool } from "types";
import { BigNumber, utils } from "ethers";

interface ConvertBuyLimitArgsProps {
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
}: ConvertBuyLimitArgsProps) => {
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
