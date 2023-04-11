import WrapperInputLabel from "components/common/InputLabel";

interface Props {
  boost: number;
}

const BoostLabel: React.FC<Props> = ({ boost }) => {
  return (
    <WrapperInputLabel
      endLabel={`${boost} ETH`}
      label="Boost"
      tooltip="Boost"
      htmlFor="boost"
    />
  );
};

export default BoostLabel;
