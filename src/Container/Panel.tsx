import { CandlestickChart } from "components/CandlestickChart";
import CreateOrder from "components/CreateOrder";
import DepthChart from "components/DepthChart";
import MarketTrades from "components/MarketTrades";
import Navbar from "components/Navbar";
import { CreatedOrders } from "components/CreatedOrders";
import Orders from "components/Orders";
import {
  usePoolGetNextPriceLevel,
  usePoolPreviewTake,
  usePoolVolumes,
} from "hooks/contracts/pool";
import { toast } from "react-toastify";
import { contractABI } from "store/abi";
import styles from "styles/panel.module.scss";
import { useContractEvent } from "wagmi";
import { utils } from "ethers";
import { usePoolStore } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { useBuyPriceConverter, useSellPriceConverter } from "hooks/convertors";
import { OrderBook } from "types";
import { buy_volume, sell_volume } from "hooks/contract";

const Panel = () => {
  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);

  const queryClient = useQueryClient();

  const sellConvert = useSellPriceConverter();
  const buyConvert = useBuyPriceConverter();

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderCreated",
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[1];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;
          const index = prev.findIndex((item) => item.originalPrice.eq(price));
          const newArray = [...prev];
          if (index > -1) {
            newArray[index] = {
              ...newArray[index],
              volume: newArray[index].volume + sellConvert(amount),
            };
          } else {
            newArray.push({
              originalPrice: price,
              value: sellConvert(price),
              volume: sellConvert(amount),
              type: "sell" as const,
            });
          }

          return newArray;
        }
      );
    },
  });

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderCreated",
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[1];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
        (prev) => {
          if (!prev) return;
          const index = prev.findIndex((item) => item.originalPrice.eq(price));
          const newArray = [...prev];
          if (index > -1) {
            newArray[index] = {
              ...newArray[index],
              volume: newArray[index].volume + buyConvert(amount),
            };
          } else {
            newArray.push({
              originalPrice: price,
              value: buyConvert(price),
              volume: buyConvert(amount),
              type: "buy" as const,
            });
          }

          return newArray;
        }
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
            if (item.originalPrice.eq(price)) {
              return {
                ...item,
                volume: item.volume - sellConvert(amount),
              };
            }
            return item;
          });
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
            if (item.originalPrice.eq(price)) {
              return {
                ...item,
                volume: item.volume - buyConvert(amount),
              };
            }
            return item;
          });
        }
      );
    },
  });

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderCancelled",
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[2];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;
          return prev.map((item) => {
            if (item.originalPrice.eq(price)) {
              return {
                ...item,
                volume: item.volume - sellConvert(amount),
              };
            }
            return item;
          });
        }
      );
    },
  });

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderCancelled",
    listener(...rest) {
      console.log("rest", rest);
      const price = rest[2];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
        (prev) => {
          if (!prev) return;
          return prev.map((item) => {
            if (item.originalPrice.eq(price)) {
              return {
                ...item,
                volume: item.volume - buyConvert(amount),
              };
            }
            return item;
          });
        }
      );
    },
  });

  const { data: buyOrders } = usePoolVolumes({
    address: buyPool.address,
    args: [
      utils.parseUnits("0", 0),
      utils.parseUnits("0", 0),
      utils.parseUnits("10", 0),
    ],
  });
  buyOrders &&
    buyOrders.forEach((e, i) => {
      console.log(
        i,
        "buy price: ",
        Number(utils.formatUnits(e.price, 6)),
        "volume: ",
        Number(utils.formatUnits(e.volume, 6)) /
          Number(utils.formatUnits(e.price, 6))
      );
    });
  const { data: sellOrders } = usePoolVolumes({
    address: sellPool.address,
    args: [
      utils.parseUnits("0", 0),
      utils.parseUnits("0", 0),
      utils.parseUnits("10", 0),
    ],
  });
  sellOrders &&
    sellOrders.forEach((e, i) => {
      console.log(
        i,
        "sell price: ",
        1 / Number(utils.formatUnits(e.price, 18)),
        "volume: ",
        Number(utils.formatUnits(e.volume, 18))
      );
    });
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
        <CreatedOrders />
      </div>
    </div>
  );
};

export default Panel;
