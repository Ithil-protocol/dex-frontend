import { useQuery } from "@tanstack/react-query";
import { usePoolStore } from "store";
import { contractABI } from "store/abi";
import { useAccount, useContract, useProvider } from "wagmi";

export const useUserOrderCreatedEvents = () => {
  const provider = useProvider();
  const { address } = useAccount();
  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);
  const contract = useContract({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    signerOrProvider: provider,
  });

  return useQuery(["userOrderCreatedEvent"], () => {
    if (contract && address) {
      const filter = contract.filters.OrderCreated(
        address,
        null,
        null,
        null,
        null,
        null,
        null
      );
      return contract.queryFilter(filter);
    }
  });
};

export const useAllOrderCreatedEvents = () => {
  const provider = useProvider();
  const contract = useContract({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    signerOrProvider: provider,
  });

  return useQuery(["allOrderCreatedEvent"], () => {
    if (contract) {
      return contract.queryFilter("OrderCreated");
    }
  });
};

export const useUserOrderCancelledEvents = () => {
  const provider = useProvider();
  const { address } = useAccount();
  const contract = useContract({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    signerOrProvider: provider,
  });

  return useQuery(["userOrderCancelledEvents"], () => {
    if (contract && address) {
      const filter = contract.filters.OrderCancelled(null, address, null, null);
      return contract.queryFilter(filter);
    }
  });
};

export const useAllOrderFulfilledEvents = () => {
  const provider = useProvider();
  const contract = useContract({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    signerOrProvider: provider,
  });

  return useQuery(["allOrderFulfilledEvents"], () => {
    if (contract) {
      const filter = contract.filters.OrderFulfilled(
        null,
        null,
        null,
        null,
        null,
        null
      );
      return contract.queryFilter(filter);
    }
  });
};
