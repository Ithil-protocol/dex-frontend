import WrapperInputLabel from "@/components/Common/WrapperInputLabel";
import { fixPrecision } from "@/utility/converters";

interface Props {
  boost: number;
}

const BoostLabel: React.FC<Props> = ({ boost }) => {
  return (
    <WrapperInputLabel
      endLabel={`${fixPrecision(boost, 6)} ETH`}
      label="Boost"
      tooltip="Gain priority on the execution queue by adding an ETH stake to the order"
      htmlFor="boost"
    />
  );
};

export default BoostLabel;
