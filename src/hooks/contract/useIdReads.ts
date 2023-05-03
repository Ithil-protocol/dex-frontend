import { CustomContractConfig } from "@/types";
import { usePriceLevelReads } from "./usePriceLevelReads";
import { contractABI } from "@/store/abi";
import { localConstants } from "@/variables";
import { useQuery } from "@tanstack/react-query";
import { readContracts } from "wagmi";

export const useIdReads = () => {
  const { data } = usePriceLevelReads();

  const contracts: CustomContractConfig | undefined = data?.map((el) => ({
    abi: contractABI,
    address: localConstants.address,
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
