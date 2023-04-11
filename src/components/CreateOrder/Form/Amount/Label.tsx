import WrapperInputLabel from "components/common/InputLabel";

interface Props {
  available: string;
}

const AmountLabel: React.FC<Props> = (props) => {
  return (
    <WrapperInputLabel
      endLabel={`(${props.available})`}
      label="Amount"
      tooltip="Amount"
      htmlFor="amount"
    />
  );
};

export default AmountLabel;
