import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { contractABI } from "store/abi";
import { ContractInputs } from "types";
import { readContracts } from "wagmi";

const address = "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37";

export const usePriceLevelReads = () => {
  const contracts = [...Array(8)].map((_, index) => {
    return {
      abi: contractABI,
      address,
      functionName: "priceLevels",
      args: [index],
    };
  });

  return useQuery(["priceLevels"], () => readContracts({ contracts }));
};

export const useIdReads = () => {
  const { data } = usePriceLevelReads();

  console.log("usePriceLevelReads", data);

  const contracts: ContractInputs[] = data?.map((el) => ({
    abi: contractABI,
    address,
    functionName: "id",
    args: [el],
  }));

  return useQuery(["ids"], () => readContracts({ contracts }), {
    enabled: !!data,
  });
};

export const useOrderReads = () => {
  const { data: priceLevels } = usePriceLevelReads();
  const { data: ids } = useIdReads();

  console.log("useIdReads", ids);

  const contracts = [];

  const levelsLength = priceLevels?.length || 0;

  for (let i = 0; i < levelsLength; i++) {
    const id = ids && ethers.utils.formatUnits(ids[i], 0);

    for (let j = 1; j <= id; j++) {
      contracts.push({
        abi: contractABI,
        address,
        functionName: "orders",
        args: [priceLevels[i], j],
      });
    }
  }

  return useQuery(
    ["orders"],
    () =>
      readContracts({
        contracts,
      }),
    {
      enabled: contracts?.length > 0,
    }
  );
};
