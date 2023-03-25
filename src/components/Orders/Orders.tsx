import Order from "./Order";
import { buyOrders } from "store/web3Store";

const Orders = () => {
  return (
    <div>
      {buyOrders.map((order) => (
        <Order {...order} key={order.id} />
      ))}
    </div>
  );
};

export default Orders;
