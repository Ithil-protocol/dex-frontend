import { Skeleton } from "@mui/material";
import styles from "./Order.module.scss";
import { FormattedOrderBook } from "@/types";
import { usePoolStore } from "@/store";
import PreciseNumber from "@/components/Common/PreciseNumber";
import { useEffect, useRef } from "react";

interface Props {
  data?: FormattedOrderBook;
  isLoading: boolean;
}

const Order: React.FC<Props> = ({ data, isLoading }) => {
  const firstRenderRef = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (data?.volume) {
      ref.current?.classList.add(styles.winking);

      const animationDuration = 200;
      const timeoutId = setTimeout(() => {
        ref.current?.classList.remove(styles.winking);
      }, animationDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [data?.volume, isLoading]);

  const pair = usePoolStore((state) => state.pair);
  const width =
    pair.base !== 0
      ? (Math.min(data?.volume || 0, pair.base) / pair.base) * 100 + "%"
      : 0;

  return isLoading ? (
    <Skeleton height={40} />
  ) : (
    <div className={styles.order} data-type={data?.type}>
      <div ref={ref} className={styles.flick}></div>
      <div className={styles.background} style={{ width }}></div>
      <p className={styles.value}>
        <PreciseNumber num={data?.value} isPrice={true} />
      </p>
      <p>
        <PreciseNumber num={data?.volume} isPrice={false} />
      </p>
    </div>
  );
};

export default Order;
