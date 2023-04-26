import styles from "./Orders.module.scss";
import { useBuyVolumes } from "hooks/contract";
import Order from "./Order";
import { OrderBook } from "types";

const Buy = () => {
  const { data, isLoading } = useBuyVolumes();

  const orders: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const order = data?.[i];
    if (!!order || isLoading) {
      orders.push(<Order key={i} data={order} isLoading={isLoading} />);
    }
  }

  return <div className={styles.buy}>{orders}</div>;
};

export default Buy;
