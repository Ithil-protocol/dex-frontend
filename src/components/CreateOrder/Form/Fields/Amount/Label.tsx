import { InputLabel } from "@mui/material";
import InfoTooltip from "components/common/InfoTooltip";

interface Props {
  available: string;
}

const AmountLabel: React.FC<Props> = (props) => {
  return (
    <InputLabel
      htmlFor="amount"
      sx={(theme) => ({
        color: theme.palette.text.primary,
        fontSize: 14,
        display: "flex",
        justifyContent: "space-between",
      })}
    >
      <span
        style={{
          display: "flex",
          gap: "5px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <span>Amount</span>
        <InfoTooltip title="Amount" />
      </span>
      <span>(${props.available})</span>
    </InputLabel>
  );
};

export default AmountLabel;
