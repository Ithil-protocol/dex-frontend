import styles from "./Order.module.scss";
import { Order as OrderType } from "types";

interface Props extends OrderType {
  type: "buy" | "sell";
}

const Order = ({ value, volume, type }: Props) => {
  const base = 20;

  const width = (Math.min(volume, base) / base) * 100 + "%";

  return (
    <div className={styles.order} data-type={type}>
      <div className={styles.background} style={{ width }}></div>
      <p className={styles.value}>{value}</p>
      <p>{volume}</p>
    </div>
  );
};

export default Order;
