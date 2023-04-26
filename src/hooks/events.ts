import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useBuyContract, useSellContract } from "./contract";
import { Event, utils } from "ethers";
import { OpenOrderEvent, Pool, Side } from "types";

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

      results.push(
        ...fixEvents(sellEvents, "sell"),
        ...fixEvents(buyEvents, "buy")
      );
    }

    return results;
  };

  const fixEvents = (events: Event[], side: Side) => {
    return events.map((item) => {
      const {
        price: rawPrice,
        underlyingAmount: rawAmount,
        staked: rawStaked,
        index,
      } = item.args!;

      const amount = utils.formatUnits(rawAmount, 18);
      // if (+amount === 0) return undefined;

      return {
        address: item.address,
        amount,
        getBlock: item.getBlock,
        index,
        price: utils.formatUnits(rawPrice, pool.accounting.decimals),
        rawAmount,
        rawPrice,
        rawStaked,
        side,
        staked: utils.formatUnits(rawStaked, pool.underlying.decimals),
        transactionHash: item.transactionHash,
      };
    });
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
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    let results: Event[] = [];
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
      results = [...sellEvents, ...buyEvents];
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

export const useUserOrderFulfilledEvents = () => {
  const { address } = useAccount();
  const buyContract = useBuyContract();
  const sellContract = useSellContract();
  const getEvents = async () => {
    let results: Event[] = [];
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

      results = [
        ...sellEventsOfferer,
        ...sellEventsFulfiller,
        ...buyEventsOfferer,
        ...buyEventsFulfiller,
      ];
    }
    return results;
  };

  return useQuery(["userOrderFulfilledEvents"], getEvents);
};
