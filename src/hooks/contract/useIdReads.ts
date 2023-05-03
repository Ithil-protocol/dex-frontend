import { CustomContractConfig } from "@/types";
import { usePriceLevelReads } from "./usePriceLevelReads";
import { contractABI } from "@/store/abi";
import { useQuery } from "@tanstack/react-query";
import { readContracts } from "wagmi";
import { constants } from "ethers";

export const useIdReads = () => {
  const { data } = usePriceLevelReads();

  const contracts: CustomContractConfig | undefined = data?.map((el) => ({
    abi: contractABI,
    address: constants.AddressZero,
    functionName: "id",
    args: [el],
  }));

  return useQuery(
    ["ids"],
    () => readContracts({ contracts: contracts as CustomContractConfig }),
    {
      enabled: !!data,
    }
  );
};
