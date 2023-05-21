import { useQuery } from "@tanstack/react-query";
import { useProvider } from "wagmi";

interface CalcEventTimeProps {
  periodInHour: number;
}

export const useCalcEventTime = ({ periodInHour }: CalcEventTimeProps) => {
  const provider = useProvider();
  const calcBlockNumber = async () => {
    const currentBlockNumber = await provider.getBlockNumber();
    const fromBlockNumber = currentBlockNumber - periodInHour * 60 * 6; // Assuming an average of 10 seconds per block
    const toBlockNumber = currentBlockNumber + 100;

    return { fromBlockNumber, toBlockNumber };
  };
  return useQuery(["blockNumberTime", periodInHour], calcBlockNumber, {
    staleTime: Infinity,
  });
};
