import { InputLabel } from "@mui/material";

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
      <span>Amount</span>
      <span>(${props.available})</span>
    </InputLabel>
  );
};

export default AmountLabel;
