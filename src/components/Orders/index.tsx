import Buy from "./Buy";
import Sell from "./Sell";
import styles from "./Orders.module.scss";
import { usePoolStore } from "store";

const Orders = () => {
  const pair = usePoolStore((store) => store.pair);

  return (
    <div className={styles.orders}>
      <div className={styles.header}>
        <span>price ({pair.underlyingLabel})</span>
        <span>amount ({pair.accountingLabel})</span>
      </div>
      <Buy />
      <p className={styles.last}>9854.236</p>
      <Sell />
    </div>
  );
};

export default Orders;
