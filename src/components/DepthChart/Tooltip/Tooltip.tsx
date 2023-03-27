import { pools } from "data/pools";
import {
  NameType,
  ValueType
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts/types/component/Tooltip";
import { usePoolStore } from "store";
import styles from "./Tooltip.module.scss";

const Tooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  const poolValue = usePoolStore((store) => store.pool);
  const pool = pools.find((pool) => pool.value === poolValue);
  if (!pool) return null;

  const { accountingLabel } = pool;

  if (!active || !payload) return null;

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
