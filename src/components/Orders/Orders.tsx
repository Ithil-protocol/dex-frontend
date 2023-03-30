import { computedOrders } from "store/web3Store";
import { Buy } from "./Buy";
import Order from "./Order";
import styles from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={styles.orders}>
      <Buy />
      <p className={styles.last}>9854.236</p>
      {/* {computedOrders.slice(-8).map((order) => (
        <Order
          key={order.id + "sell"}
        />
      ))} */}
    </div>
  );
};

export default Orders;
