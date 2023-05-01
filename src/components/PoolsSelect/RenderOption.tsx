import { ListItemButton } from "@mui/material";
import { Pair } from "types";
import styles from "./PoolsSelect.module.scss";

const RenderOption = (props: object, option: Pair) => {
  const UndIcon = option["sell"].underlying.icon;
  const AccIcon = option["sell"].accounting.icon;
  const tick = option.tick;
  return (
    <ListItemButton {...props}>
      <span className={styles.underlying_icon}>
        <UndIcon />
      </span>
      <span className={styles.accounting_icon}>
        <AccIcon />
      </span>
      <span>{option.underlyingLabel}</span>
      <span>/</span>
      <span className={styles.accounting_label}> {option.accountingLabel}</span>
      <span>Tick {tick}</span>
    </ListItemButton>
  );
};

export default RenderOption;
