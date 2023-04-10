import { useQuery } from "@tanstack/react-query";
import { BigNumber, ethers } from "ethers";
import { contractABI } from "store/abi";
import { CustomContractConfig } from "types";
import { readContracts } from "wagmi";

const address = "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37";

export const usePriceLevelReads = () => {
  const contracts: CustomContractConfig = [...Array(8)].map((_, index) => {
    return {
      abi: contractABI,
      address,
      functionName: "priceLevels",
      args: [ethers.utils.parseUnits(`${index}`, 0)],
    };
  });

  return useQuery(["priceLevels"], () => readContracts({ contracts }));
};

export const useIdReads = () => {
  const { data } = usePriceLevelReads();

  const contracts: CustomContractConfig | undefined = data?.map((el) => ({
    abi: contractABI,
    address,
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
          address,
          functionName: "orders",
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
