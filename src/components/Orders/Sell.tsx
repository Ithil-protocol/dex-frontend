import styles from "./Orders.module.scss";
import Order from "./Order";
import { useSellVolumes } from "hooks/contract";

const Sell = () => {
  const { data, isLoading } = useSellVolumes();

  const orders: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const order = data?.[i];
    if (!!order || isLoading) {
      orders.push(<Order key={i} data={order} isLoading={isLoading} />);
    }
  }

  return <div className={styles.sell}>{orders}</div>;
};

export default Sell;
