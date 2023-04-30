import { Skeleton } from "@mui/material";
import styles from "./Order.module.scss";
import { FormattedOrderBook } from "types";
import { usePoolStore } from "store";

interface Props {
  data?: FormattedOrderBook;
  isLoading: boolean;
}

const Order: React.FC<Props> = ({ data, isLoading }) => {
  const pair = usePoolStore((state) => state.pair);
  const width =
    pair.base !== 0
      ? (Math.min(data?.volume || 0, pair.base) / pair.base) * 100 + "%"
      : 0;

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
