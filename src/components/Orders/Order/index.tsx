import { Skeleton } from "@mui/material";
import styles from "./Order.module.scss";
import { OrderBook } from "types";

interface Props {
  data?: OrderBook;
  isLoading: boolean;
}

const Order: React.FC<Props> = ({ data, isLoading }) => {
  const base = 20;
  const width = (Math.min(data?.volume || Infinity, base) / base) * 100 + "%";

  if (!isLoading && (data?.value === 0 || data?.volume === 0)) return null;

  return isLoading ? (
    <Skeleton height={40} />
  ) : (
    <div className={styles.order} data-type={data?.type}>
      <div className={styles.background} style={{ width }}></div>
      <p className={styles.value}>{data?.value}</p>
      <p>{data?.volume}</p>
    </div>
  );
};

export default Order;
