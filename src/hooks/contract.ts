import { useQuery } from "@tanstack/react-query";
import { BigNumber, ethers, utils } from "ethers";
import { usePoolStore } from "store";
import { contractABI } from "store/abi";
import { CustomContractConfig } from "types";
import { readContracts, useContract, useProvider } from "wagmi";

const address = "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37";

export const usePriceLevelReads = () => {
  const getPrices = async () => {
    console.time();
    const highestPrice = await readContracts({
      contracts: [
        {
          address,
          abi: contractABI,
          functionName: "getNextPriceLevel",
          args: [utils.parseUnits("0", 0)],
        },
      ],
    });

    let next = highestPrice[0];
    const data: (BigNumber | undefined)[] = [highestPrice[0]];
    while (Number(utils.formatUnits(next, 6))) {
      const price = await readContracts({
        contracts: [
          {
            address,
            abi: contractABI,
            functionName: "getNextPriceLevel",
            args: [next],
          },
        ],
      });
      data.push(price[0]);
      next = price[0];
    }
    console.timeEnd();
    return data;
  };

  return useQuery(["priceLevels"], getPrices);
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

export const useSellContract = () => {
  const provider = useProvider();
  const [sellPool] = usePoolStore((state) => [state.sellPool]);
  return useContract({
    address: sellPool.address,
    abi: contractABI,
    signerOrProvider: provider,
  });
};
export const useBuyContract = () => {
  const provider = useProvider();
  const [buyPool] = usePoolStore((state) => [state.buyPool]);
  return useContract({
    address: buyPool.address,
    abi: contractABI,
    signerOrProvider: provider,
  });
};
