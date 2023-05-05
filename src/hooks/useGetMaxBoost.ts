import { BigNumber } from "ethers";
import { usePoolId } from "./contracts/pool";

interface GetMaxBoostProps {
  poolAddress: `0x${string}`;
  price: BigNumber;
}

export const useGetMaxBoost = ({ poolAddress, price }: GetMaxBoostProps) => {
  const { data } = usePoolId({
    address: poolAddress,
    args: [price],
  });
  return data;
};
