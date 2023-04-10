import { useQueryClient } from "@tanstack/react-query";
import { CandlestickChart } from "components/CandlestickChart";
import CreateOrder from "components/CreateOrder/CreateOrder";
import DepthChart from "components/DepthChart/DepthChart";
import MarketTrades from "components/MarketTrades/MarketTrades";
import Navbar from "components/Navbar";
import { OpenOrders } from "components/OpenOrders";
import Orders from "components/Orders";
import { useOrderReads } from "hooks/contract";
import { toast } from "react-toastify";
import { contractABI } from "store/abi";
import styles from "styles/panel.module.scss";
import { useContractEvent } from "wagmi";

const Panel = () => {
  const { data } = useOrderReads();
  const queryClient = useQueryClient();

  const eventData = useContractEvent({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    eventName: "OrderCreated",
    listener(...rest) {
      // queryClient.setQueryData(["orders"], (prev) => {
      //   return [...prev, rest];
      // });
      console.log(...rest);
      toast(rest[0]);
    },
  });
  console.log(eventData);

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
