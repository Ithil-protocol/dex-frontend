import { ethers } from "ethers";
import { contractABI } from "store/abi";
import { ContractInputs } from "types";
import { useContractReads } from "wagmi";

const address = "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37";

export const usePriceLevelReads = () => {
  const priceLevelsList: ContractInputs[] = [...Array(8)].map((_, index) => {
    return {
      abi: contractABI,
      address,
      functionName: "priceLevels",
      args: [index],
    };
  });

  return useContractReads({
    contracts: priceLevelsList,
  });
};

export const useIdReads = () => {
  const { data } = usePriceLevelReads();
  const contracts: ContractInputs[] = data?.map((el) => ({
    abi: contractABI,
    address,
    functionName: "id",
    args: [el],
  }));

  return useContractReads({
    contracts,
    enabled: !!data,
  });
};

export const useOrderReads = () => {
  const { data: priceLevels } = usePriceLevelReads();
  const { data: ids } = useIdReads();

  const contracts = [];

  const levelsLength = priceLevels?.length || 0;

  for (let i = 0; i < levelsLength; i++) {
    const id = ethers.utils.formatUnits(ids[i], 0);

    for (let j = 1; j <= id; j++) {
      contracts.push({
        abi: contractABI,
        address,
        functionName: "orders",
        args: [priceLevels[i], j],
      });
    }
  }

  return useContractReads({
    contracts,
    enabled: contracts?.length > 0,
  });
};
