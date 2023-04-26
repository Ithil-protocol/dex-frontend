import { Chip } from "@mui/material";
import WrapperInputLabel from "components/Common/WrapperInputLabel";
import { usePoolStore } from "store";

const PriceLabel = () => {
  const [defaultPool, pair] = usePoolStore((state) => [
    state.default,
    state.pair,
  ]);
  const ChipComponent = (
    <Chip icon={defaultPool.accounting.icon} label={pair.accountingLabel} />
  );

  return (
    <WrapperInputLabel
      label="Price"
      tooltip="Price"
      htmlFor="price"
      Currency={ChipComponent}
    />
  );
};

export default PriceLabel;
