import { ListItemButton } from "@mui/material";
import { Pair } from "types";
import styles from "./PoolsSelect.module.scss";

const RenderOption = (props: object, option: Pair) => {
  const UndIcon: any = option["sell"].underlying.icon;
  const AccIcon: any = option["sell"].accounting.icon;
  return (
    <ListItemButton {...props}>
      <span className={styles.underlying_icon}>
        <UndIcon />
      </span>
      <span className={styles.accounting_icon}>
        <AccIcon />
      </span>
      <span className={styles.underlying_label}>{option.underlyingLabel}</span>
      <span className={styles.slash}>/</span>
      <span className={styles.accounting_label}> {option.accountingLabel}</span>
    </ListItemButton>
  );
};

export default RenderOption;
