import { useQuery } from "@tanstack/react-query";
import { BigNumber, constants, utils } from "ethers";
import { contractABI } from "@/store/abi";
import { readContracts } from "wagmi";

export const usePriceLevelReads = () => {
  const getPrices = async () => {
    const highestPrice = await readContracts({
      contracts: [
        {
          address: constants.AddressZero,
          abi: contractABI,
          functionName: "getNextPriceLevel",
          args: [constants.Zero],
        },
      ],
    });

    let next = highestPrice[0];
    const data: (BigNumber | undefined)[] = [highestPrice[0]];
    while (Number(utils.formatUnits(next, 9889809))) {
      //number should be decimals of price
      const price = await readContracts({
        contracts: [
          {
            address: constants.AddressZero,
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
