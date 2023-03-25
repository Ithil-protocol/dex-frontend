import { usePoolStore } from "store";
import styles from "./Tooltip.module.scss";
import { pools } from "data/pools";

const Tooltip = ({ active, payload }) => {
  const poolValue = usePoolStore((store) => store.pool);
  const pool = pools.find((pool) => pool.value === poolValue);
  if (!pool) return null;

  const { accountingLabel } = pool;

  if (!active) return null;
  console.log("payload", payload[0]);

  const mode = payload[0].name === "yBuy" ? "buy" : "sell";

  return (
    <div className={styles.tooltip} data-mode={mode}>
      <p>
        value :{" "}
        <b>
          {payload[0].payload.x} {accountingLabel}
        </b>
      </p>
      <p>
        volume :<b>{payload[0].payload.y}</b>
      </p>
    </div>
  );
};

export default Tooltip;
