import CandlestickChart from "@/components/CandlestickChart";
import CreateOrder from "@/components/CreateOrder";
import DepthChart from "@/components/DepthChart";
import MarketTrades from "@/components/MarketTrades";
import Navbar from "@/components/Navbar";
import { OpenOrders } from "@/components/OpenOrders";
import Orders from "@/components/Orders";
import { usePoolStore } from "@/store";
import styles from "@/styles/panel.module.scss";

const Panel = () => {
  const pair = usePoolStore((store) => store.pair);

  return (
    <div className={styles.layout}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.orders}>
        <Orders />
      </div>
      <div className={styles.candlestick}>
        <CandlestickChart pair={pair} />
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
