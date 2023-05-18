import { useQuery } from "@tanstack/react-query";
import { utils } from "ethers";
import { usePoolStore } from "@/store";
import { contractABI } from "@/store/abi";
import { OrderBook } from "@/types";
import { readContracts } from "wagmi";
import { buy_volume } from "@/data/constants";

export const useBuyVolumes = () => {
  const [pair] = usePoolStore((state) => [state.pair]);

  return useQuery<OrderBook[]>([buy_volume, pair.buy.address], async () => {
    const data = await readContracts({
      contracts: [
        {
          address: pair.buy.address,
          abi: contractABI,
          functionName: "volumes",
          args: [
            utils.parseUnits("0", 0),
            utils.parseUnits("0", 0),
            utils.parseUnits("20", 0),
          ],
        },
      ],
    });
    return data[0].map((item) => {
      return {
        value: item.price,
        volume: item.volume,
        type: "buy" as const,
        animated: true,
      };
    });
  });
};
