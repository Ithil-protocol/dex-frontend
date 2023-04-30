import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useBuyContract, useSellContract } from "./contract";
import { Event } from "ethers";
import { HistoryEvent, MarketEvent, OpenOrderEvent } from "types";
import {
  useBuyAmountConverter,
  useBuyPriceConverter,
  useBuyStakeConverter,
  useSellAmountConverter,
  useSellPriceConverter,
  useSellStakeConverter,
} from "./converters";

export const useUserOrderCreatedEvents = () => {
  const buyAmountConverter = useBuyAmountConverter();
  const buyPriceConverter = useBuyPriceConverter();
  const sellAmountConverter = useSellAmountConverter();
  const sellPriceConverter = useSellPriceConverter();
  const buyStakeConverter = useBuyStakeConverter();
  const sellStakeConverter = useSellStakeConverter();
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

      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );

      for (const [i, item] of sellEvents.entries()) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const amount = sellAmountConverter(rawAmount);
        if (amount === 0) continue;

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
          timestamp: sellBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      for (const [i, item] of buyEvents.entries()) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const amount = buyAmountConverter(rawAmount, rawPrice);
        if (amount === 0) continue;

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
          timestamp: buyBlocks[i].timestamp * 1000,
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

export const useUserOrderCancelledEvents = () => {
  const buyAmountConverter = useBuyAmountConverter();
  const buyPriceConverter = useBuyPriceConverter();
  const sellAmountConverter = useSellAmountConverter();
  const sellPriceConverter = useSellPriceConverter();
  const buyStakeConverter = useBuyStakeConverter();
  const sellStakeConverter = useSellStakeConverter();
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
      for (const [i, item] of sellEvents.entries()) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

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

      for (const [i, item] of buyEvents.entries()) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

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
  return useQuery(["userOrderCancelledEvents", address], getEvents);
};

export const useAllOrderFulfilledEvents = () => {
  const buyAmountConverter = useBuyAmountConverter();
  const buyPriceConverter = useBuyPriceConverter();
  const sellAmountConverter = useSellAmountConverter();
  const sellPriceConverter = useSellPriceConverter();

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

  return useQuery(["allOrderFulfilledEvents"], getEvents);
};

export const useUserOrderFulfilledEvents = () => {
  const buyAmountConverter = useBuyAmountConverter();
  const buyPriceConverter = useBuyPriceConverter();
  const sellAmountConverter = useSellAmountConverter();
  const sellPriceConverter = useSellPriceConverter();
  const buyStakeConverter = useBuyStakeConverter();
  const sellStakeConverter = useSellStakeConverter();
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

  return useQuery(["userOrderFulfilledEvents", address], getEvents);
};
