import { BigNumber, utils } from "ethers";
import { usePoolGetOrder } from "./contracts/pool";
import { constants } from "ethers";
import { useStakedConverter } from "./converters";
import { fixPrecision } from "@/utility/converters";
import { useEffect, useState } from "react";
import {
  INCREASE_MAX_BOOST_FACTOR,
  MIN_FAST_BOOST,
  STAKED_DECIMALS,
} from "@/config/constants";

interface GetMaxBoostProps {
  poolAddress: `0x${string}`;
  actualPrice: BigNumber;
  price: BigNumber;
}

const _stakedConverter = (stake: BigNumber) => {
  return (
    Number(utils.formatUnits(stake, STAKED_DECIMALS)) *
    INCREASE_MAX_BOOST_FACTOR
  );
};

export const useGetMaxBoost = ({
  poolAddress,
  actualPrice,
  price,
}: GetMaxBoostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputPrice = price.toString();
  useEffect(() => {
    setIsLoading(true);
  }, [inputPrice, setIsLoading]);
  const { data: orderZero } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, constants.Zero],
  });
  const { data: firstOrder } = usePoolGetOrder({
    address: poolAddress,
    args: [actualPrice, orderZero?.next as BigNumber],
    enabled: !!orderZero,
    onSuccess: () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    },
  });
  const maxBoost = firstOrder
    ? Math.max(_stakedConverter(firstOrder.staked), MIN_FAST_BOOST)
    : 0;

  return { maxBoost, isLoading: isLoading || price.isZero() };
};
