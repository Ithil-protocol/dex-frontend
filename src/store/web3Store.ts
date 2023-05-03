
import { useContractRead } from "wagmi";
import { contractABI } from "./abi";
import { BigNumber } from "ethers";

export const useReadPreviewOrder = (
  address,
  price: BigNumber,
  stake: BigNumber
) => {
  const { data } = useContractRead({
    abi: contractABI,
    address,
    functionName: "previewOrder",
    args: [price, stake],
  });

  return data;
};
