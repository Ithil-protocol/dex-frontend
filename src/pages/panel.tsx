import { CandlestickChart } from "components/CandlestickChart";
import DepthChart from "components/DepthChart/DepthChart";
import CreateOrder from "components/Form/CreateOrder";
import MarketTrades from "components/MarketTrades/MarketTrades";
import Navbar from "components/Navbar";
import { OpenOrders } from "components/OpenOrders";
import dynamic from "next/dynamic";
import styles from "styles/panel.module.scss";
const Orders = dynamic(
  () => import("components/Orders").then((c) => c.default),
  {
    ssr: false,
  }
);

const Panel = () => {
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
