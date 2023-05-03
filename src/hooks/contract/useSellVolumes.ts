import { useQuery } from "@tanstack/react-query";
import { utils } from "ethers";
import { usePoolStore } from "@/store";
import { contractABI } from "@/store/abi";
import { OrderBook } from "@/types";
import { localConstants } from "@/variables";
import { readContracts } from "wagmi";

export const useSellVolumes = () => {
  const [pair] = usePoolStore((state) => [state.pair]);

  return useQuery<OrderBook[]>(
    [localConstants.sell_volume, pair.sell.address],
    async () => {
      const data = await readContracts({
        contracts: [
          {
            address: pair.sell.address,
            abi: contractABI,
            functionName: "volumes",
            args: [
              utils.parseUnits("0", 0),
              utils.parseUnits("0", 0),
              utils.parseUnits("10", 0),
            ],
          },
        ],
      });
      return data[0].map((item) => {
        return {
          value: item.price,
          volume: item.volume,
          type: "sell" as const,
        };
      });
    }
  );
};
