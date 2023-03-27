import { ListItemButton } from "@mui/material";
import { Pool } from "types";
import styles from "./PoolsSelect.module.scss";

const RenderOption = (props: object, option: Pool) => (
  <ListItemButton {...props}>
    <span className={styles.underlying_icon}>{option.underlyingIcon}</span>
    <span className={styles.accounting_icon}>{option.accountingIcon}</span>
    <span className={styles.underlying_label}>{option.underlyingLabel}/</span>
    <span className={styles.accounting_label}> {option.accountingLabel}</span>
  </ListItemButton>
);

export default RenderOption;
