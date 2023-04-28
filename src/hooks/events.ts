import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useBuyContract, useSellContract } from "./contract";
import { Event, utils } from "ethers";
import { HistoryEvent, MarketEvent, OpenOrderEvent } from "types";
import {
  buyAmountConverter,
  sellAmountConverter,
  sellPriceConverter,
} from "utility/convertors";
import { buyPriceConverter } from "utility/convertors";
import { usePoolStore } from "store";

export const useUserOrderCreatedEvents = () => {
  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);
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

        const amount = sellAmountConverter(rawAmount, sellPool);
        if (amount === 0) continue;

        results.push({
          address: item.address,
          amount: amount.toString(),
          getBlock: item.getBlock,
          index,
          price: sellPriceConverter(rawPrice, sellPool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: utils.formatUnits(rawStaked, sellPool.underlying.decimals),
          transactionHash: item.transactionHash,
          pool: sellPool,
        });
      }

      for (const item of buyEvents) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const amount = buyAmountConverter(rawAmount, rawPrice, buyPool);
        if (amount === 0) continue;

        results.push({
          address: item.address,
          amount: amount.toString(),
          getBlock: item.getBlock,
          index,
          price: buyPriceConverter(rawPrice, buyPool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: utils.formatUnits(rawStaked, buyPool.underlying.decimals),
          transactionHash: item.transactionHash,
          pool: buyPool,
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
  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);

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
          amount: sellAmountConverter(rawAmount, sellPool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, sellPool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: utils.formatUnits(rawStaked, sellPool.underlying.decimals),
          status: "canceled",
          transactionHash: item.transactionHash,
          pool: sellPool,
        });
      }

      for (const item of buyEvents) {
        const { price: rawPrice, underlyingToTransfer: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice, buyPool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, buyPool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: utils.formatUnits(rawStaked, buyPool.underlying.decimals),
          status: "canceled",
          transactionHash: item.transactionHash,
          pool: buyPool,
        });
      }
    }

    return results;
  };
  return useQuery(["userOrderCancelledEvents", address], getEvents);
};

export const useAllOrderFulfilledEvents = () => {
  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    const results: MarketEvent[] = [];
    if (buyContract && sellContract) {
      const sellEvents = await sellContract.queryFilter("OrderFulfilled");
      const buyEvents = await buyContract.queryFilter("OrderFulfilled");

      for (const item of buyEvents) {
        const { amount: rawAmount, price: rawPrice } = item.args!;

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice, buyPool).toString(),
          getBlock: item.getBlock,
          price: buyPriceConverter(rawPrice, buyPool).toString(),
          rawAmount,
          rawPrice,
          pool: buyPool,
        });
      }

      for (const item of sellEvents) {
        const { amount: rawAmount, price: rawPrice } = item.args!;

        results.push({
          amount: sellAmountConverter(rawAmount, sellPool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, sellPool).toString(),
          rawAmount,
          rawPrice,
          pool: sellPool,
        });
      }
    }

    return results;
  };

  return useQuery(["allOrderFulfilledEvents", address], getEvents);
};

export const useUserOrderFulfilledEvents = () => {
  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);
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

      for (const item of [...buyEventsOfferer, ...buyEventsFulfiller]) {
        const { price: rawPrice, amount: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice, buyPool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, buyPool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: utils.formatUnits(rawStaked, buyPool.underlying.decimals),
          status: "fulfilled",
          transactionHash: item.transactionHash,
          pool: buyPool,
        });
      }

      for (const item of [...sellEventsOfferer, ...sellEventsFulfiller]) {
        const { price: rawPrice, amount: rawAmount } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice, sellPool).toString(),
          getBlock: item.getBlock,
          price: sellPriceConverter(rawPrice, sellPool).toString(),
          rawAmount,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: utils.formatUnits(rawStaked, sellPool.underlying.decimals),
          status: "fulfilled",
          transactionHash: item.transactionHash,
          pool: sellPool,
        });
      }
    }

    return results;
  };

  return useQuery(["userOrderFulfilledEvents", address], getEvents);
};
