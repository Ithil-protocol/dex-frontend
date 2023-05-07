import WrapperInputLabel from "@/components/Common/WrapperInputLabel";
import { fixPrecision } from "@/utility/converters";

interface Props {
  boost: number;
}

const Label: React.FC<Props> = ({ boost }) => {
  return (
    <WrapperInputLabel
      endLabel={`${fixPrecision(boost, 6)} ETH`}
      label="Boost"
      tooltip="Boost"
      htmlFor="boost"
    />
  );
};

export default Label;
