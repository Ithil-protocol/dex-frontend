import { usePoolStore } from "store";

import MarketSell from "./Sell";
import MarketBuy from "./Buy";

interface Props {}

const MarketForm: React.FC<Props> = () => {
  const [side] = usePoolStore((store) => [store.side]);

  const sides = { buy: MarketBuy, sell: MarketSell };

  const Side = sides[side];

  return (
    <>
      <Side />
    </>
  );
};

export default MarketForm;
