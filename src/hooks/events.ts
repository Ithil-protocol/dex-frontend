import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useBuyContract, useSellContract } from "./contract";
import { Event, utils } from "ethers";
import { HistoryEvent, OpenOrderEvent, Pool } from "types";
import {
  buyAmountConverter,
  sellAmountConverter,
  sellPriceConverter,
} from "utility/convertors";
import { buyPriceConverter } from "utility/convertors";

export const useUserOrderCreatedEvents = (pool: Pool) => {
  const { address } = useAccount();
  const sellContract = useSellContract();
  const buyContract = useBuyContract();
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

      for (const item of sellEvents) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const amount = sellAmountConverter(rawAmount, pool);
        if (amount === 0) continue;

        results.push({
          address: item.address,
          amount: amount.toString(),
          getBlock: item.getBlock,
          index,
          price: sellPriceConverter(rawPrice, pool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: utils.formatUnits(rawStaked, pool.underlying.decimals),
          transactionHash: item.transactionHash,
        });
      }

      for (const item of buyEvents) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const amount = buyAmountConverter(rawAmount, rawPrice, pool);
        if (amount === 0) continue;

        results.push({
          address: item.address,
          amount: amount.toString(),
          getBlock: item.getBlock,
          index,
          price: buyPriceConverter(rawPrice, pool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: utils.formatUnits(rawStaked, pool.underlying.decimals),
          transactionHash: item.transactionHash,
        });
      }
    }

    return results;
  };

  return useQuery(["userOrderCreatedEvent"], getEvents);
};

export const useAllOrderCreatedEvents = () => {
  const buyContract = useBuyContract();
  const sellContract = useSellContract();

  const getEvents = async () => {
    let results: Event[] = [];
    if (buyContract && sellContract) {
      const sellEvents = await sellContract.queryFilter("OrderCreated");
      const buyEvents = await buyContract.queryFilter("OrderCreated");
      results = [...sellEvents, ...buyEvents];
    }
    return results;
  };

  return useQuery(["allOrderCreatedEvent"], getEvents);
};

export const useUserOrderCancelledEvents = (pool: Pool) => {
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

      for (const item of sellEvents) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;
        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: sellAmountConverter(rawAmount, pool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, pool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: utils.formatUnits(rawStaked, pool.underlying.decimals),
          status: "canceled",
          transactionHash: item.transactionHash,
        });
      }

      for (const item of buyEvents) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice, pool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, pool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: utils.formatUnits(rawStaked, pool.underlying.decimals),
          status: "canceled",
          transactionHash: item.transactionHash,
        });
      }
    }

    return results;
  };
  return useQuery(["userOrderCancelledEvents"], getEvents);
};

export const useAllOrderFulfilledEvents = () => {
  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    let results: Event[] = [];
    if (buyContract && sellContract) {
      const sellEvents = await sellContract.queryFilter("OrderFulfilled");
      const buyEvents = await buyContract.queryFilter("OrderFulfilled");
      results = [...sellEvents, ...buyEvents];
    }
    return results;
  };

  return useQuery(["allOrderFulfilledEvents"], getEvents);
};

export const useUserOrderFulfilledEvents = (pool) => {
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
        address,
        null,
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

      for (const item of [
        ...sellEventsOfferer,
        ...sellEventsFulfiller,
        ...buyEventsOfferer,
        ...buyEventsFulfiller,
      ]) {
        const { price: rawPrice, amount: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice, pool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, pool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: utils.formatUnits(rawStaked, pool.underlying.decimals),
          status: "fulfilled",
          transactionHash: item.transactionHash,
        });
      }
    }

    return results;
  };

  return useQuery(["userOrderFulfilledEvents"], getEvents);
};
