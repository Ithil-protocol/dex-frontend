import { BigNumber, BigNumberish, utils } from "ethers";
import { Status } from "types";
import { usePoolGetOrder } from "../contracts/pool";

export const useGetOrderStatus = (
  address: `0x${string}`,
  price: BigNumber,
  index: BigNumber
) => {
  const { data } = usePoolGetOrder({
    address,
    args: [price, index],
  });

  let status: Status = "open";
  if (data) {
    //FIXME: Converter must be added
    const amount = utils.formatUnits(data.underlyingAmount as BigNumberish, 18);
    if (+amount === 0) status = "fulfilled";
  }

  return status;
};
