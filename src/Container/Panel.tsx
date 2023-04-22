import { CandlestickChart } from "components/CandlestickChart";
import CreateOrder from "components/CreateOrder";
import DepthChart from "components/DepthChart";
import MarketTrades from "components/MarketTrades";
import Navbar from "components/Navbar";
import { OpenOrders } from "components/OpenOrders";
import Orders from "components/Orders";
import { usePoolVolumes } from "hooks/contracts/pool";
import { toast } from "react-toastify";
import { contractABI } from "store/abi";
import styles from "styles/panel.module.scss";
import { useContractEvent } from "wagmi";
import { utils } from "ethers";
import { usePoolStore } from "store";

const Panel = () => {
  // const eventData =
  useContractEvent({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    eventName: "OrderCreated",
    listener(...rest) {
      // queryClient.setQueryData(["orders"], (prev) => {
      //   return [...prev, rest];
      // });
      toast(rest[0]);
    },
  });

  const [sellPool, buyPool] = usePoolStore((state) => [
    state.sellPool,
    state.buyPool,
  ]);
  const { data: buyOrders } = usePoolVolumes({
    address: buyPool.address,
    args: [
      utils.parseUnits("0", 0),
      utils.parseUnits("0", 0),
      utils.parseUnits("10", 0),
    ],
  });
  buyOrders &&
    buyOrders.forEach((e, i) => {
      console.log(
        i,
        "buy price: ",
        Number(utils.formatUnits(e.price, 6)),
        "volume: ",
        Number(utils.formatUnits(e.volume, 6))
      );
    });
  const { data: sellOrders } = usePoolVolumes({
    address: sellPool.address,
    args: [
      utils.parseUnits("0", 0),
      utils.parseUnits("0", 0),
      utils.parseUnits("10", 0),
    ],
  });
  sellOrders &&
    sellOrders.forEach((e, i) => {
      console.log(
        i,
        "sell price: ",
        1 / Number(utils.formatUnits(e.price, 18)),
        "volume: ",
        Number(utils.formatUnits(e.volume, 18))
      );
    });

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
