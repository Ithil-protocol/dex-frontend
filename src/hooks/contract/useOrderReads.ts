import { useQuery } from "@tanstack/react-query";
import { BigNumber, ethers } from "ethers";
import { contractABI } from "@/store/abi";
import { CustomContractConfig } from "@/types";
import { readContracts } from "wagmi";
import { usePriceLevelReads } from "./usePriceLevelReads";
import { useIdReads } from "./useIdReads";
import { localConstants } from "@/variables";

export const useOrderReads = () => {
  const { data: priceLevels } = usePriceLevelReads();
  const { data: ids } = useIdReads();

  const contractConfigGenerator = (
    priceLevels: BigNumber[],
    ids: BigNumber[]
  ) => {
    const contracts: CustomContractConfig = [];

    const levelsLength = priceLevels.length;

    for (let i = 0; i < levelsLength; i++) {
      const id = Number(ethers.utils.formatUnits(ids[i], 0));

      for (let j = 1; j <= id; j++) {
        contracts.push({
          abi: contractABI,
          address: localConstants.address,
          functionName: "getOrder",
          args: [priceLevels[i], j],
        });
      }
    }

    return contracts;
  };

  return useQuery(
    ["orders"],
    () =>
      readContracts({
        contracts: contractConfigGenerator(
          priceLevels as BigNumber[],
          ids as BigNumber[]
        ),
      }),
    {
      enabled: !!priceLevels && !!ids,
    }
  );
};
