import { useQuery } from "@tanstack/react-query";
import { readContracts, useAccount } from "wagmi";
import { useBuyContract, useSellContract } from "@/hooks/contract";
import {
  Address0x,
  HistoryEvent,
  MarketEvent,
  OpenOrderEvent,
  Status,
} from "@/types";
import { useGetConverters } from "@/hooks/converters";
import { contractABI } from "@/store/abi";
import { usePoolStore } from "@/store";
import { BigNumber } from "ethers";
import { useCalcEventTime } from "../useCalcEventTime";

interface CustomEvent {
  offerer: `0x${string}`;
  recipient: `0x${string}`;
  underlyingAmount: BigNumber;
  staked: BigNumber;
  previous: BigNumber;
  next: BigNumber;
}

export const useUserOrderCreatedEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);
  const { data: EventTime } = useCalcEventTime({ periodInHour: 14 * 24 });
  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
    stakedConverter,
  } = useGetConverters();
  const { address } = useAccount();
  const sellContract = useSellContract();
  const buyContract = useBuyContract();

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const getEvents = async () => {
    const results: OpenOrderEvent[] = [];

    if (sellContract && buyContract && address && EventTime) {
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
      const sellEvents = (
        await sellContract.queryFilter(
          sellFilter,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      ).reverse();
      const buyEvents = (
        await buyContract.queryFilter(
          buyFilter,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      ).reverse();

      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );

      const sellOrders = (await readContracts({
        contracts: sellEvents.map((item) => {
          return {
            address: item.address as Address0x,
            args: [item.args!.price, item.args!.index],
            abi: contractABI,
            functionName: "getOrder",
          };
        }),
      })) as CustomEvent[];

      for (const [i, item] of sellEvents.entries()) {
        const {
          price: rawPrice,
          underlyingAmount: rawAmount,
          staked: rawStaked,
          index,
        } = item.args!;

        const { underlyingAmount } = sellOrders[i];
        const status: Status = underlyingAmount.isZero() ? "fulfilled" : "open";
        if (status !== "open") continue;

        const amount = sellAmountConverter(rawAmount);
        const rawExecuted = rawAmount.sub(underlyingAmount);

        results.push({
          address: item.address,
          amount,
          executed: sellAmountConverter(rawExecuted),
          index,
          price: sellPriceConverter(rawPrice),
          rawAmount,
          rawExecuted,
          rawPrice,
          rawStaked,
          side: "sell",
          staked: stakedConverter(rawStaked),
          status,
          timestamp: sellBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      const buyOrders = (await readContracts({
        contracts: buyEvents.map((item) => {
          return {
            address: item.address as Address0x,
            args: [item.args!.price, item.args!.index],
            abi: contractABI,
            functionName: "getOrder",
          };
        }),
      })) as CustomEvent[];

      for (const [i, item] of buyEvents.entries()) {
        const {
          index,
          price: rawPrice,
          staked: rawStaked,
          underlyingAmount: rawAmount,
        } = item.args!;

        const { underlyingAmount } = buyOrders[i];
        const status: Status = underlyingAmount.isZero() ? "fulfilled" : "open";
        if (status !== "open") continue;

        const amount = buyAmountConverter(rawAmount, rawPrice);
        const rawExecuted = rawAmount.sub(underlyingAmount);

        results.push({
          address: item.address,
          amount,
          executed: buyAmountConverter(rawExecuted, rawPrice),
          index,
          price: buyPriceConverter(rawPrice),
          rawAmount,
          rawExecuted,
          rawPrice,
          rawStaked,
          side: "buy",
          staked: stakedConverter(rawStaked),
          status,
          timestamp: buyBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }
    }

    return results.sort((a, b) => b.timestamp - a.timestamp);
  };

  return useQuery(["userOrderCreatedEvent", address, poolAddress], getEvents, {
    staleTime: Infinity,
  });
};

export const useUserOrderCancelledEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);
  const { data: EventTime } = useCalcEventTime({ periodInHour: 14 * 24 });
  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
    stakedConverter,
  } = useGetConverters();
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();

  const getEvents = async () => {
    const results: HistoryEvent[] = [];
    if (buyContract && sellContract && address && EventTime) {
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
      const sellEvents = (
        await sellContract.queryFilter(
          sellFilter,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 10);
      const buyEvents = (
        await buyContract.queryFilter(
          buyFilter,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 10);

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
          staked: stakedConverter(rawStaked),
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
          staked: stakedConverter(rawStaked),
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
    getEvents,
    { staleTime: Infinity }
  );
};

export const useAllOrderFulfilledEvents = () => {
  const { address: poolAddress } = usePoolStore((state) => state.default);
  const { data: EventTime } = useCalcEventTime({ periodInHour: 14 * 24 });
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

    if (buyContract && sellContract && EventTime) {
      const sellEvents = (
        await sellContract.queryFilter(
          "OrderFulfilled",
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 25);
      const buyEvents = (
        await buyContract.queryFilter(
          "OrderFulfilled",
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 25);

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
  const { data: EventTime } = useCalcEventTime({ periodInHour: 14 * 24 });
  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
    stakedConverter,
  } = useGetConverters();
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    const results: HistoryEvent[] = [];
    if (buyContract && sellContract && address && EventTime) {
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
      const sellEventsOfferer = (
        await sellContract.queryFilter(
          sellFilterOfferer,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 10);
      const sellEventsFulfiller = (
        await sellContract.queryFilter(
          sellFilterFulfiller,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 10);
      const buyEventsOfferer = (
        await buyContract.queryFilter(
          buyFilterOfferer,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 10);
      const buyEventsFulfiller = (
        await buyContract.queryFilter(
          buyFilterFulfiller,
          EventTime.fromBlockNumber,
          EventTime.toBlockNumber
        )
      )
        .reverse()
        .slice(0, 10);

      const buyEvents = [...buyEventsOfferer, ...buyEventsFulfiller];

      const buyBlocks = await Promise.all(
        buyEvents.map((item) => item.getBlock())
      );

      for (const [i, item] of buyEvents.entries()) {
        const {
          amount: rawAmount,
          offerer,
          price: rawPrice,
          totalFill,
        } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: buyAmountConverter(rawAmount, rawPrice),
          price: buyPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: offerer === address ? "buy" : "sell",
          staked: stakedConverter(rawStaked),
          status: totalFill ? "fulfilled" : "partially filled",
          timestamp: buyBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }

      const sellEvents = [...sellEventsOfferer, ...sellEventsFulfiller];
      const sellBlocks = await Promise.all(
        sellEvents.map((item) => item.getBlock())
      );
      for (const [i, item] of sellEvents.entries()) {
        const {
          amount: rawAmount,
          offerer,
          price: rawPrice,
          totalFill,
        } = item.args!;

        const { value: rawStaked } = await item.getTransaction();

        results.push({
          amount: sellAmountConverter(rawAmount),
          price: sellPriceConverter(rawPrice),
          rawAmount,
          rawPrice,
          rawStaked,
          side: offerer === address ? "sell" : "buy",
          staked: stakedConverter(rawStaked),
          status: totalFill ? "fulfilled" : "partially filled",
          timestamp: sellBlocks[i].timestamp * 1000,
          transactionHash: item.transactionHash,
        });
      }
    }

    return results;
  };

  return useQuery(
    ["userOrderFulfilledEvents", address, poolAddress],
    getEvents,
    { staleTime: Infinity }
  );
};

export const useLatestTrade = () => {
  const { data, isLoading } = useAllOrderFulfilledEvents();
  const latestPrice = data?.[0]?.price ?? 0;

  return { latestPrice, isLoading };
};
