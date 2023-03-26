import {CandlestickChart} from "components/CandlestickChart";
import Form from "components/Form/Form";
import MarketTrades from "components/MarketTrades/MarketTrades";
import Navbar from "components/Navbar";
import { OpenOrders } from "components/OpenOrders";
import Orders from "components/Orders/Orders";
import styles from "styles/panel.module.scss";

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
        <Form />
      </div>
      <div className={styles.depth}>{/* <DepthChart /> */}</div>
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
