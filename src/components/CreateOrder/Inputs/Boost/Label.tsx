import WrapperInputLabel from "@/components/Common/WrapperInputLabel";
import { STAKED_PRECISION } from "@/config/constants";
import { fixPrecision } from "@/utility/converters";

interface Props {
  boost: number;
}

const BoostLabel: React.FC<Props> = ({ boost }) => {
  return (
    <WrapperInputLabel
      endLabel={`${fixPrecision(boost, STAKED_PRECISION)} ETH`}
      label="Boost"
      tooltip="Pay a boost in ETH to gain execution priority for this price. You will be refunded if you cancel the order before it is completely filled."
      htmlFor="boost"
    />
  );
};

export default BoostLabel;
