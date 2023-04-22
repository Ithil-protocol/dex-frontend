import { Box } from "@mui/material";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts/types/component/Tooltip";
import { usePoolStore } from "store";
import styles from "./Tooltip.module.scss";

const WrapperTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  const pair = usePoolStore((store) => store.pair);
  if (!pair) return null;

  if (!active || !payload) return null;

  const mode = payload[0].name === "yBuy" ? "buy" : "sell";

  return (
    <Box
      className={styles.tooltip}
      sx={(theme) => ({
        border: "2px solid transparent",
        borderColor:
          mode === "buy"
            ? theme.palette.success.main
            : theme.palette.error.main,
        background: theme.palette.background.paper,
        outline: "none",
      })}
    >
      <p>
        value :{" "}
        <b>
          {payload[0].payload.x} {pair.accountingLabel}
        </b>
      </p>
      <p>
        volume :<b>{payload[0].payload.y}</b>
      </p>
    </Box>
  );
};

export default WrapperTooltip;
