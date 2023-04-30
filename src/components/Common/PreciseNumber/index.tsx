import { usePoolStore } from "store";

interface Props {
  num: number;
  isPrice: boolean;
}

const PreciseNumber: React.FC<Required<Partial<Props>>> = ({
  num,
  isPrice,
}) => {
  const {
    underlying: { displayPrecision: amountPrecision },
    accounting: { displayPrecision: pricePrecision },
  } = usePoolStore((state) => state.default);

  if (isPrice) {
    const displayPrice = num !== 0 ? num : "< " + Math.pow(10, -pricePrecision);
    return <>{displayPrice}</>;
  }
  const displayAmount = num !== 0 ? num : "< " + Math.pow(10, -amountPrecision);
  return <>{displayAmount}</>;
};

export default PreciseNumber;
