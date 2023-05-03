import { usePoolStore } from "store";
import { contractABI } from "store/abi";
import { useContract, useProvider } from "wagmi";

export const useBuyContract = () => {
  const provider = useProvider();
  const [buyPool] = usePoolStore((state) => [state.buyPool]);
  return useContract({
    address: buyPool.address,
    abi: contractABI,
    signerOrProvider: provider,
  });
};
