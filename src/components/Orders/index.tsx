import Buy from "./Buy";
import Sell from "./Sell";
import styles from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={styles.orders}>
      <Sell />
      <p className={styles.last}>9854.236</p>
      <Buy />
    </div>
  );
};

export default Orders;
