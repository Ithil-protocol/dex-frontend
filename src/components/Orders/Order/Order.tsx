import styles from "./Order.module.scss";
import { Order as OrderType } from "types";

const Order = ({ value, volume }: OrderType) => {
  const base = 20;

  const width = (Math.min(volume, base) / base) * 100 + "%";

  return (
    <div className={styles.order}>
      <div className={styles.background} style={{ width }}></div>
      <p>{value}</p>
      <p>{volume}</p>
    </div>
  );
};

export default Order;
