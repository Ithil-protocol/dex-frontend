import Buy from "./Buy";
import Sell from "./Sell";
import styles from "./Orders.module.scss";
import { usePoolStore } from "@/store";
import { useLatestTrade } from "@/hooks/events";
import { Skeleton, Typography } from "@mui/material";
import {
  useBuyEventOrderCancelled,
  useBuyEventOrderCreated,
  useBuyEventOrderFulfilled,
  useSellEventOrderCancelled,
  useSellEventOrderCreated,
  useSellEventOrderFulfilled,
} from "@/hooks/events/contract";

const Orders = () => {
  // subscribe hook at this level to avoid unexpected rerenders
  useSellEventOrderCreated();
  useBuyEventOrderCreated();
  useBuyEventOrderFulfilled();
  useSellEventOrderFulfilled();
  useSellEventOrderCancelled();
  useBuyEventOrderCancelled();

  const pair = usePoolStore((store) => store.pair);

  const { latestPrice, isLoading } = useLatestTrade();
  return (
    <div className={styles.orders}>
      <div className={styles.header}>
        <span>Price ({pair.accountingLabel})</span>
        <span>Amount ({pair.underlyingLabel})</span>
      </div>
      <hr className={styles.divider} />
      <Buy />
      {isLoading ? (
        <Skeleton height={90} />
      ) : (
        <Typography textAlign={"end"} marginY={3} fontSize={28}>
          {latestPrice} {pair.accountingLabel}
        </Typography>
      )}
      <Sell />
    </div>
  );
};

export default Orders;
