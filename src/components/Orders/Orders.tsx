import { computedOrders } from "store/web3Store";
import Order from "./Order";
import styles from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={styles.orders}>
      {computedOrders.slice(-8).map((order) => (
        <Order key={order.id + "buy"} data={order} />
      ))}
      <p className={styles.last}>9854.236</p>
      {computedOrders.slice(-8).map((order) => (
        <Order key={order.id + "sell"} data={order} />
      ))}
    </div>
  );
};

export default Orders;
