import { BigNumber } from "ethers";
import { usePoolGetOrder } from "./contracts/pool";
import { constants } from "ethers";
import { useStakedConverter } from "./converters";
import { fixPrecision } from "@/utility/converters";

interface GetMaxBoostProps {
  poolAddress: `0x${string}`;
  actualPrice: BigNumber;
}

export const useGetMaxBoost = ({
  poolAddress,
  actualPrice,
}: GetMaxBoostProps) => {
  const stakedConverter = useStakedConverter();

  const { data: orderZero } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, constants.Zero],
  });
  const { data: firstOrder, isLoading } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, orderZero?.next as BigNumber],
    enabled: !!orderZero,
  });
  const maxBoost = firstOrder
    ? Math.max(
        fixPrecision(stakedConverter(firstOrder.staked) * 1.01, 6),
        0.001
      )
    : 0;

  return { maxBoost, isLoading };
};
