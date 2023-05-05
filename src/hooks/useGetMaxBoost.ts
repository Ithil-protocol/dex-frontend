import { BigNumber } from "ethers";
import { usePoolGetOrder } from "./contracts/pool";
import { constants } from "ethers";

interface GetMaxBoostProps {
  poolAddress: `0x${string}`;
  actualPrice: BigNumber;
}

export const useGetMaxBoost = ({
  poolAddress,
  actualPrice,
}: GetMaxBoostProps) => {
  const { data: orderZero } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, constants.Zero],
  });
  const { data: firstOrder, isLoading } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, orderZero!.next],
    enabled: !!orderZero,
  });
  const maxBoost = firstOrder?.staked ?? constants.Zero;

  return { maxBoost, isLoading };
};
