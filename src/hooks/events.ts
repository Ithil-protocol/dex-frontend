import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readContracts, useAccount } from "wagmi";
import { useBuyContract, useSellContract } from "./contract";
import { HistoryEvent, MarketEvent, OpenOrderEvent, Status } from "types";
import { useGetConverters } from "./converters";
import { contractABI } from "store/abi";
import { usePoolStore } from "store";

export const useUserOrderCreatedEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const {
    buyAmountConverter,
    buyPriceConverter,
    buyStakeConverter,
    sellAmountConverter,
    sellPriceConverter,
    sellStakeConverter,
  } = useGetConverters();
  const { address } = useAccount();
  const sellContract = useSellContract();
  const buyContract = useBuyContract();

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const getEvents = async () => {
    const results: OpenOrderEvent[] = [];

    if (sellContract && buyContract && address) {
      const sellFilter = sellContract.filters.OrderCreated(
        address,
        null,
        null,
        null,
        null,
        null,
        null
      );
      const buyFilter = buyContract.filters.OrderCreated(
        address,
        null,
        null,
        null,
        null,
        null,
        null
      );
      const sellEvents = await sellContract.queryFilter(sellFilter);
      const buyEvents = await buyContract.queryFilter(buyFilter);

      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );

      const sellOrders = (
        await Promise.all(
          sellEvents.map((item) => {
            return readContracts({
              contracts: [
                {
                  address: item.address as `0x${string}`,
                  args: [item.args!.price, item.args!.index],
                  abi: contractABI,
                  functionName: "getOrder",
                },
              ],
            });
          })
        )
      ).flat();

      for (const [i, item] of sellEvents.entries()) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const status: Status = sellOrders[i].underlyingAmount.isZero()
          ? "fulfilled"
          : "open";

        if (status !== "open") continue;

        const amount = sellAmountConverter(rawAmount);
        if (rawAmount.isZero()) continue;

        results.push({
          address: item.address,
          amount,
          index,
          price: sellPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: buyStakeConverter(rawStaked),
          status,
          timestamp: sellBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      const buyOrders = (
        await Promise.all(
          buyEvents.map((item) => {
            return readContracts({
              contracts: [
                {
                  address: item.address as `0x${string}`,
                  args: [item.args!.price, item.args!.index],
                  abi: contractABI,
                  functionName: "getOrder",
                },
              ],
            });
          })
        )
      ).flat();

      for (const [i, item] of buyEvents.entries()) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const status: Status = buyOrders[i].underlyingAmount.isZero()
          ? "fulfilled"
          : "open";

        if (status !== "open") continue;

        const amount = buyAmountConverter(rawAmount, rawPrice);
        if (rawAmount.isZero()) continue;

        results.push({
          address: item.address,
          amount,
          index,
          price: buyPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: sellStakeConverter(rawStaked),
          status,
          timestamp: buyBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }
    }

    return results.sort((a, b) => b.timestamp - a.timestamp);
  };

  return useQuery(["userOrderCreatedEvent", address, poolAddress], getEvents);
};

// export const useAllOrderCreatedEvents = () => {

//   const {address:poolAddress} = usePoolStore(state=>state.default);

//   const buyContract = useBuyContract();
//   const sellContract = useSellContract();

//   const getEvents = async () => {
//     let results: Event[] = [];
//     if (buyContract && sellContract) {
//       const sellEvents = await sellContract.queryFilter("OrderCreated");
//       const buyEvents = await buyContract.queryFilter("OrderCreated");
//       results = [...sellEvents, ...buyEvents];
//     }
//     return results;
//   };

//   return useQuery(["allOrderCreatedEvent",poolAddress], getEvents);
// };

export const useUserOrderCancelledEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const {
    buyAmountConverter,
    buyPriceConverter,
    buyStakeConverter,
    sellAmountConverter,
    sellPriceConverter,
    sellStakeConverter,
  } = useGetConverters();
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();

  const getEvents = async () => {
    const results: HistoryEvent[] = [];
    if (buyContract && sellContract && address) {
      const sellFilter = sellContract.filters.OrderCancelled(
        null,
        address,
        null,
        null
      );
      const buyFilter = buyContract.filters.OrderCancelled(
        null,
        address,
        null,
        null
      );
      const sellEvents = await sellContract.queryFilter(sellFilter);
      const buyEvents = await buyContract.queryFilter(buyFilter);

      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );
      const sellTransactions = await Promise.all(
        sellEvents.map((item) => item.getTransaction())
      );
      for (const [i, item] of sellEvents.entries()) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;
        const { value: rawStaked } = sellTransactions[i];

        results.push({
          amount: sellAmountConverter(rawAmount),
          price: sellPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: sellStakeConverter(rawStaked),
          status: "canceled",
          timestamp: sellBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      const buyTransactions = await Promise.all(
        buyEvents.map((item) => item.getTransaction())
      );
      for (const [i, item] of buyEvents.entries()) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;
        const { value: rawStaked } = buyTransactions[i];

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice),
          price: buyPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: buyStakeConverter(rawStaked),
          status: "canceled",
          timestamp: buyBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }
    }

    return results;
  };
  return useQuery(
    ["userOrderCancelledEvents", address, poolAddress],
    getEvents
  );
};

export const useAllOrderFulfilledEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
  } = useGetConverters();

  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    const results: MarketEvent[] = [];

    if (buyContract && sellContract) {
      const sellEvents = await sellContract.queryFilter("OrderFulfilled");
      const buyEvents = await buyContract.queryFilter("OrderFulfilled");

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      for (const [i, item] of buyEvents.entries()) {
        const { amount: rawAmount, price: rawPrice } = item.args!;

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice),
          price: buyPriceConverter(rawPrice),
          side: "buy",
          timestamp: buyBlocks[i].timestamp * 1000,
        });
      }

      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );

      for (const [i, item] of sellEvents.entries()) {
        const { amount: rawAmount, price: rawPrice } = item.args!;

        results.push({
          amount: sellAmountConverter(rawAmount),
          price: sellPriceConverter(rawPrice),
          side: "sell",
          timestamp: sellBlocks[i].timestamp * 1000,
        });
      }
    }

    return results.sort((a, b) => b.timestamp - a.timestamp);
  };

  return useQuery(["allOrderFulfilledEvents", poolAddress], getEvents);
};

export const useUserOrderFulfilledEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);
  const {
    buyAmountConverter,
    buyPriceConverter,
    buyStakeConverter,
    sellAmountConverter,
    sellPriceConverter,
    sellStakeConverter,
  } = useGetConverters();
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    const results: HistoryEvent[] = [];
    if (buyContract && sellContract && address) {
      const sellFilterOfferer = sellContract.filters.OrderFulfilled(
        null,
        address,
        null,
        null,
        null,
        null
      );
      const sellFilterFulfiller = sellContract.filters.OrderFulfilled(
        null,
        null,
        address,
        null,
        null,
        null
      );
      const buyFilterOfferer = buyContract.filters.OrderFulfilled(
        null,
        address,
        null,
        null,
        null,
        null
      );
      const buyFilterFulfiller = buyContract.filters.OrderFulfilled(
        null,
        null,
        address,
        null,
        null,
        null
      );
      const sellEventsOfferer = await sellContract.queryFilter(
        sellFilterOfferer
      );
      const sellEventsFulfiller = await sellContract.queryFilter(
        sellFilterFulfiller
      );
      const buyEventsOfferer = await buyContract.queryFilter(buyFilterOfferer);
      const buyEventsFulfiller = await buyContract.queryFilter(
        buyFilterFulfiller
      );

      const buyEvents = [...buyEventsOfferer, ...buyEventsFulfiller];

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      for (const [i, item] of buyEvents.entries()) {
        const { price: rawPrice, amount: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice),
          price: buyPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: buyStakeConverter(rawStaked),
          status: "fulfilled",
          timestamp: buyBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }

      const sellEvents = [...sellEventsOfferer, ...sellEventsFulfiller];
      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );
      for (const [i, item] of sellEvents.entries()) {
        const { price: rawPrice, amount: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: sellAmountConverter(rawAmount),
          price: sellPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: sellStakeConverter(rawStaked),
          status: "fulfilled",
          timestamp: sellBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }
    }

    return results;
  };

  return useQuery(
    ["userOrderFulfilledEvents", address, poolAddress],
    getEvents
  );
};

export const useLatestTrade = () => {
  const { data } = useAllOrderFulfilledEvents();

  console.log(data?.[0].price);
  if (data) {
    return data?.[0].price;
  }
  return 0;
};
