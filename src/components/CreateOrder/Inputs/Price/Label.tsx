import WrapperInputLabel from "@/components/Common/WrapperInputLabel";
import { usePoolStore } from "@/store";
import styles from "./Label.module.scss";

const PriceLabel = () => {
  const [pair] = usePoolStore((state) => [state.pair]);
  const ChipComponent = (
    <span className={styles.chip}>{pair.accountingLabel}</span>
  );

  return (
    <WrapperInputLabel
      label="Price"
      tooltip="The desired settlement price"
      htmlFor="price"
      Currency={ChipComponent}
    />
  );
};

export default PriceLabel;
