import WrapperInputLabel from "components/Common/InputLabel";

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
