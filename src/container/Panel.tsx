import { CandlestickChart } from "@/components/CandlestickChart";
import CreateOrder from "@/components/CreateOrder";
import DepthChart from "@/components/DepthChart";
import MarketTrades from "@/components/MarketTrades";
import Navbar from "@/components/Navbar";
import { OpenOrders } from "@/components/OpenOrders";
import Orders from "@/components/Orders";
import {
  useBuyEventOrderCancelled,
  useBuyEventOrderCreated,
  useBuyEventOrderFulfilled,
  useSellEventOrderCancelled,
  useSellEventOrderCreated,
  useSellEventOrderFulfilled,
} from "@/hooks/events/contract";

import styles from "@/styles/panel.module.scss";

const Panel = () => {
  useSellEventOrderCreated();
  useBuyEventOrderCreated();
  useBuyEventOrderFulfilled();
  useSellEventOrderFulfilled();
  useSellEventOrderCancelled();
  useBuyEventOrderCancelled();

  return (
    <div className={styles.layout}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.orders}>
        <Orders />
      </div>
      <div className={styles.candlestick}>
        <CandlestickChart />
      </div>
      <div className={styles.form}>
        <CreateOrder />
      </div>
      <div className={styles.depth}>
        <DepthChart />
      </div>
      <div className={styles.market}>
        <MarketTrades />
      </div>
      <div className={styles.open}>
        <OpenOrders />
      </div>
    </div>
  );
};

export default Panel;

// const { data: buyOrders } = usePoolVolumes({
//   address: buyPool.address,
//   args: [
//     utils.parseUnits("0", 0),
//     utils.parseUnits("0", 0),
//     utils.parseUnits("10", 0),
//   ],
// });
// buyOrders &&
//   buyOrders.forEach((e, i) => {
//       i,
//       "buy price: ",
//       Number(utils.formatUnits(e.price, 6)),
//       "volume: ",
//       Number(utils.formatUnits(e.volume, 6)) /
//         Number(utils.formatUnits(e.price, 6))
//     );
//   });
// const { data: sellOrders } = usePoolVolumes({
//   address: sellPool.address,
//   args: [
//     utils.parseUnits("0", 0),
//     utils.parseUnits("0", 0),
//     utils.parseUnits("10", 0),
//   ],
// });
// sellOrders &&
//   sellOrders.forEach((e, i) => {
//       i,
//       "sell price: ",
//       1 / Number(utils.formatUnits(e.price, 18)),
//       "volume: ",
//       Number(utils.formatUnits(e.volume, 18))
//     );
//   });
// const { data: highestPrice } = usePoolGetNextPriceLevel({
//   address: buyPool.address,
//   args: [utils.parseUnits("0", 0)],
// });
// const { data } = usePoolPreviewTake({
//   address: buyPool.address,
//   args: [highestPrice?.toNumber()*0.00041],
//   enabled:!!highestPrice
// });
