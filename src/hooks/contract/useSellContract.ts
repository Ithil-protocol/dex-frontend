import { usePoolStore } from "store";
import { contractABI } from "store/abi";
import { useContract, useProvider } from "wagmi";

export const useSellContract = () => {
  const provider = useProvider();
  const [sellPool] = usePoolStore((state) => [state.sellPool]);
  return useContract({
    address: sellPool.address,
    abi: contractABI,
    signerOrProvider: provider,
  });
};
