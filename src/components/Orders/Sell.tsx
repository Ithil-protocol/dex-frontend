import styles from "./Orders.module.scss";
import Order from "./Order";
import { useFormatSellData } from "hooks/convertors";

const Sell = () => {
  const { data, isLoading } = useFormatSellData();

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
