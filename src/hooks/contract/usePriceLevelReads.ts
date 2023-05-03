import { useQuery } from "@tanstack/react-query";
import { localConstants } from "@/variables";
import { BigNumber, utils } from "ethers";
import { contractABI } from "@/store/abi";
import { readContracts } from "wagmi";

export const usePriceLevelReads = () => {
  const getPrices = async () => {
    const highestPrice = await readContracts({
      contracts: [
        {
          address: localConstants.address,
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
            address: localConstants.address,
            abi: contractABI,
            functionName: "getNextPriceLevel",
            args: [next],
          },
        ],
      });
      data.push(price[0]);
      next = price[0];
    }
    return data;
  };

  return useQuery(["priceLevels"], getPrices);
};
