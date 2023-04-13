import { ListItemButton } from "@mui/material";
import { Pair } from "types";
import styles from "./PoolsSelect.module.scss";

const RenderOption = (props: object, option: Pair) => (
  <ListItemButton {...props}>
    <span className={styles.underlying_icon}>
      {option["sell"].underlying.icon}
    </span>
    <span className={styles.accounting_icon}>
      {option["sell"].accounting.icon}
    </span>
    <span className={styles.underlying_label}>
      {option["sell"].underlying.label}
    </span>
    <span className={styles.slash}>/</span>
    <span className={styles.accounting_label}>
      {" "}
      {option["sell"].accounting.label}
    </span>
  </ListItemButton>
);

export default RenderOption;
