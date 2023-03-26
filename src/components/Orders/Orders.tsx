import styles from "./Orders.module.scss";
import Order from "./Order";
import { computedOrders } from "store/web3Store";

const Orders = () => {
  return (
    <div>
      {computedOrders.slice(-8).map((order) => (
        <Order {...order} key={order.id + "buy"} type="buy" />
      ))}
      <p className={styles.last}>9854.236</p>
      {computedOrders.slice(-8).map((order) => (
        <Order {...order} key={order.id + "sell"} type="sell" />
      ))}
    </div>
  );
};

export default Orders;
