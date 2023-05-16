import WrapperInputLabel from "@/components/Common/WrapperInputLabel";
import { STAKED_PRECISION } from "@/config/constants";
import { fixPrecision } from "@/utility/converters";

interface Props {
  boost: number;
}

const Label: React.FC<Props> = ({ boost }) => {
  return (
    <WrapperInputLabel
      endLabel={`${fixPrecision(boost, STAKED_PRECISION)} ETH`}
      label="Boost"
      tooltip="Boost"
      htmlFor="boost"
    />
  );
};

export default Label;
