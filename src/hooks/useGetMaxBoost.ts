import { BigNumber, utils } from "ethers";
import { usePoolGetOrder } from "./contracts/pool";
import { constants } from "ethers";
import { useEffect, useState } from "react";
import { BigNumberValue } from "@/types";

interface GetMaxBoostProps {
  poolAddress: BigNumberValue;
  actualPrice: BigNumber;
  price: BigNumber;
}

const _stakedConverter = (stake: BigNumber) => {
  return Number(utils.formatUnits(stake, 18)) * 1.01;
};

export const useGetMaxBoost = ({
  poolAddress,
  actualPrice,
  price,
}: GetMaxBoostProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const priceInString = price.toString();
  useEffect(() => {
    setIsLoading(true);
  }, [priceInString, setIsLoading]);
  const { data: orderZero } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, constants.Zero],
  });
  const { data: firstOrder } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, orderZero?.next as BigNumber],
    enabled: !!orderZero,
    onSuccess: () => {
      setIsLoading(false);
    },
  });
  const maxBoost = firstOrder
    ? Math.max(_stakedConverter(firstOrder.staked), 0.001)
    : 0;

  return { maxBoost, isLoading: isLoading || price.isZero() };
};
