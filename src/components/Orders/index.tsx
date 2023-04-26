import Buy from "./Buy";
import Sell from "./Sell";
import styles from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={styles.orders}>
      <Buy />
      <p className={styles.last}>9854.236</p>
      <Sell />
    </div>
  );
};

export default Orders;
