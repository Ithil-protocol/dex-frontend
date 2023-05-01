import { CandlestickChart } from "components/CandlestickChart";
import CreateOrder from "components/CreateOrder";
import DepthChart from "components/DepthChart";
import MarketTrades from "components/MarketTrades";
import Navbar from "components/Navbar";
import { OpenOrders } from "components/OpenOrders";
import Orders from "components/Orders";

import { contractABI } from "store/abi";
import styles from "styles/panel.module.scss";
import { useAccount, useContractEvent } from "wagmi";
import { usePoolStore } from "store";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { HistoryEvent, MarketEvent, OpenOrderEvent, OrderBook } from "types";
import { buy_volume, sell_volume } from "hooks/contract";
import { useGetConverters } from "hooks/converters";
import { BigNumber, Event } from "ethers";

const Panel = () => {
  const { address } = useAccount();

  const [sellPool, buyPool, { address: poolAddress }] = usePoolStore(
    (state) => [state.sellPool, state.buyPool, state.default]
  );
  const {
    buyAmountConverter,
    buyPriceConverter,
    buyStakeConverter,
    sellAmountConverter,
    sellPriceConverter,
    sellStakeConverter,
  } = useGetConverters();

  const queryClient = useQueryClient();

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderCreated",
    // eslint-disable-next-line sonarjs/cognitive-complexity
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[1];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;
          const index = prev.findIndex((item) => item.value.eq(price));
          const newArray = [...prev];
          if (index > -1) {
            console.log("prevArray", newArray);
            newArray[index] = {
              ...newArray[index],
              volume: newArray[index].volume.add(amount),
            };
            console.log("newArray", newArray);
          } else {
            newArray.push({
              value: price,
              volume: amount,
              type: "sell" as const,
            });
            newArray.sort((a, b) => {
              if (b.value.gt(a.value)) return 1;
              else if (b.value.lt(a.value)) return -1;
              else return 0;
            });
          }

          return newArray;
        }
      );

      updateOrderFromPendingToCancel(
        address as string,
        poolAddress,
        queryClient,
        rest
      );
    },
  });

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderCreated",
    // eslint-disable-next-line sonarjs/cognitive-complexity
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[1];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
        (prev) => {
          if (!prev) return;
          const index = prev.findIndex((item) => item.value.eq(price));
          const newArray = [...prev];
          if (index > -1) {
            newArray[index] = {
              ...newArray[index],
              volume: newArray[index].volume.add(amount),
            };
          } else {
            newArray.push({
              value: price,
              volume: amount,
              type: "buy" as const,
            });
            newArray.sort((a, b) => {
              if (b.value.gt(a.value)) return 1;
              else if (b.value.lt(a.value)) return -1;
              else return 0;
            });
          }

          return newArray;
        }
      );

      updateOrderFromPendingToCancel(
        address as string,
        poolAddress,
        queryClient,
        rest
      );
    },
  });

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderFulfilled",
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[4];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;
          return prev.map((item) => {
            if (item.value.eq(price)) {
              return {
                ...item,
                volume: item.volume.sub(amount),
              };
            }
            return item;
          });
        }
      );

      queryClient.setQueryData<MarketEvent[]>(
        ["allOrderFulfilledEvents", poolAddress],
        (prev) => {
          if (!prev) return;

          return [
            {
              amount: sellAmountConverter(amount),
              price: sellPriceConverter(price),
              side: "sell",
              timestamp: Date.now(),
            },
            ...prev,
          ];
        }
      );
    },
  });

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderFulfilled",
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[4];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
        (prev) => {
          if (!prev) return;
          return prev.map((item) => {
            if (item.value.eq(price)) {
              return {
                ...item,
                volume: item.volume.sub(amount),
              };
            }
            return item;
          });
        }
      );

      queryClient.setQueryData<MarketEvent[]>(
        ["allOrderFulfilledEvents", poolAddress],
        (prev) => {
          if (!prev) return;

          return [
            {
              amount: buyAmountConverter(amount, price),
              price: buyPriceConverter(price),
              side: "buy",
              timestamp: Date.now(),
            },
            ...prev,
          ];
        }
      );
    },
  });

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderCancelled",
    async listener(...rest) {
      const offerer = rest[1];
      const price = rest[2];
      const amount = rest[3];

      queryClient.setQueryData<OrderBook[]>(
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;

          return prev.map((item) => {
            if (item.value.eq(price)) {
              return {
                ...item,
                volume: item.volume.sub(amount),
              };
            }
            return item;
          });
        }
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const data = rest[4]! as Event;
      const { value: rawStaked } = await data.getTransaction();

      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCancelledEvents", address, poolAddress],
        (prev) => {
          if (!prev) return;
          if (offerer !== address) return prev;

          const newOrders: HistoryEvent[] = [
            {
              status: "canceled",
              timestamp: Date.now(),
              amount: sellAmountConverter(amount),
              price: sellPriceConverter(price),
              rawAmount: amount,
              rawPrice: price,
              rawStaked,
              side: "sell",
              staked: sellStakeConverter(rawStaked),
              transactionHash: data.transactionHash,
            },
            ...prev,
          ];

          return newOrders;
        }
      );

      removeCanceledOrder(
        queryClient,
        address as string,
        poolAddress,
        price,
        amount
      );
    },
  });

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderCancelled",
    async listener(...rest) {
      const offerer = rest[1];
      const price = rest[2];
      const amount = rest[3];

      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
        (prev) => {
          if (!prev) return;
          return prev.map((item) => {
            if (item.value.eq(price)) {
              return {
                ...item,
                volume: item.volume.sub(amount),
              };
            }
            return item;
          });
        }
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const data = rest[4]! as Event;
      const { value: rawStaked } = await data.getTransaction();

      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCancelledEvents", address, poolAddress],
        (prev) => {
          if (!prev) return;
          if (offerer !== address) return prev;

          const newOrders: HistoryEvent[] = [
            {
              status: "canceled",
              timestamp: Date.now(),
              amount: buyAmountConverter(amount, price),
              price: buyPriceConverter(price),
              rawAmount: amount,
              rawPrice: price,
              rawStaked,
              side: "buy",
              staked: buyStakeConverter(rawStaked),
              transactionHash: data.transactionHash,
            },
            ...prev,
          ];

          return newOrders;
        }
      );

      removeCanceledOrder(
        queryClient,
        address as string,
        poolAddress,
        price,
        amount
      );
    },
  });

  // const { data: buyOrders } = usePoolVolumes({
  //   address: buyPool.address,
  //   args: [
  //     utils.parseUnits("0", 0),
  //     utils.parseUnits("0", 0),
  //     utils.parseUnits("10", 0),
  //   ],
  // });
  // buyOrders &&
  //   buyOrders.forEach((e, i) => {
  //     console.log(
  //       i,
  //       "buy price: ",
  //       Number(utils.formatUnits(e.price, 6)),
  //       "volume: ",
  //       Number(utils.formatUnits(e.volume, 6)) /
  //         Number(utils.formatUnits(e.price, 6))
  //     );
  //   });
  // const { data: sellOrders } = usePoolVolumes({
  //   address: sellPool.address,
  //   args: [
  //     utils.parseUnits("0", 0),
  //     utils.parseUnits("0", 0),
  //     utils.parseUnits("10", 0),
  //   ],
  // });
  // sellOrders &&
  //   sellOrders.forEach((e, i) => {
  //     console.log(
  //       i,
  //       "sell price: ",
  //       1 / Number(utils.formatUnits(e.price, 18)),
  //       "volume: ",
  //       Number(utils.formatUnits(e.volume, 18))
  //     );
  //   });
  // const { data: highestPrice } = usePoolGetNextPriceLevel({
  //   address: buyPool.address,
  //   args: [utils.parseUnits("0", 0)],
  // });
  // highestPrice && console.log("hi",Number(utils.formatUnits(highestPrice,6))*0.00041);
  // const { data } = usePoolPreviewTake({
  //   address: buyPool.address,
  //   args: [highestPrice?.toNumber()*0.00041],
  //   enabled:!!highestPrice
  // });
  // data && console.log(utils.formatUnits(data[0], 18));

  return (
    <div className={styles.layout}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.orders}>
        <Orders />
      </div>
      <div className={styles.candlestick}>
        <CandlestickChart />
      </div>
      <div className={styles.form}>
        <CreateOrder />
      </div>
      <div className={styles.depth}>
        <DepthChart />
      </div>
      <div className={styles.market}>
        <MarketTrades />
      </div>
      <div className={styles.open}>
        <OpenOrders />
      </div>
    </div>
  );
};

export default Panel;

const updateOrderFromPendingToCancel = (
  address: string,
  poolAddress: string,
  queryClient: QueryClient,
  rest: [string, ...BigNumber[]]
) => {
  queryClient.setQueryData<OpenOrderEvent[]>(
    ["userOrderCreatedEvent", address, poolAddress],
    (prev) => {
      if (!prev) return;

      const offerer = rest[0];
      if (offerer !== address) return prev;

      const price = rest[1];
      const amount = rest[3];
      const orderIndex = rest[2];

      const index = prev.findIndex(
        (i) => i.rawPrice.eq(price) && i.rawAmount.eq(amount)
      );

      if (index !== -1) {
        const order = { ...prev[index] };
        order.status = "open";
        order.index = orderIndex;

        const copyOrders = [...prev];
        copyOrders.splice(index, 1, order);
        return copyOrders;
      }

      return prev;
    }
  );
};

const removeCanceledOrder = (
  queryClient: QueryClient,
  address: string,
  poolAddress: string,
  price: BigNumber,
  amount: BigNumber
) => {
  queryClient.setQueryData<OpenOrderEvent[]>(
    ["userOrderCreatedEvent", address, poolAddress],
    (orders) => {
      if (!orders) return;

      const canceledOrder = orders.find(
        (i) => i.rawPrice.eq(price) && i.rawAmount.eq(amount)
      );

      if (canceledOrder) {
        const copyOrders = [...orders];
        copyOrders.splice(copyOrders.indexOf(canceledOrder), 1);

        return copyOrders;
      }

      return orders;
    }
  );
};
