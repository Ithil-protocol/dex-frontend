import LimitSell from "./Sell";
import LimitBuy from "./Buy";
import { usePoolStore } from "store";

interface Props {}

const LimitForm: React.FC<Props> = () => {
  const [side] = usePoolStore((store) => [store.side]);

  const sides = { buy: LimitBuy, sell: LimitSell };

  const Side = sides[side];
  return (
    <>
      <Side />
    </>
  );
};

export default LimitForm;
