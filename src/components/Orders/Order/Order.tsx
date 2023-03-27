import { Order as OrderType } from "types";
import styles from "./Order.module.scss";

interface Props {
  data: OrderType;
}

const Order = ({ data }: Props) => {
  const base = 20;

  const width = (Math.min(data.volume, base) / base) * 100 + "%";

  return (
    <div className={styles.order} data-type={data.type}>
      <div className={styles.background} style={{ width }}></div>
      <p className={styles.value}>{data.value}</p>
      <p>{data.volume}</p>
    </div>
  );
};

export default Order;
