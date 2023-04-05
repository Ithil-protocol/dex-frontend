import { computedOrders } from "store/web3Store";
import Order from "./Order";

const Sell = () => {
  return (
    <>
      {computedOrders.slice(-8).map((order) => (
        <Order
          key={order.id + "maker"}
          data={{
            ...order,
            type: "maker",
          }}
        />
      ))}
    </>
  );
};

export default Sell;
