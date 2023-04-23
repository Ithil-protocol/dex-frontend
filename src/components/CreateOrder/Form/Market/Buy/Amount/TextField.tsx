import { InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import { useController } from "react-hook-form";
import { usePoolStore } from "store";

interface Props {
  control: any;
}

const MarketAmountTextField: React.FC<Props> = (props) => {
  const numberValidation = (value: any) => {
    return decimalRegex.test(value);
  };

  const {
    field: { ref: ref1, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "amount",
    defaultValue: "",
    control: props.control,
    rules: { validate: numberValidation },
  });

  const pair = usePoolStore((state) => state.pair);

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        const { value } = event.target;
        if (decimalRegex.test(value) || value === "") {
          onChange(value);
        }
      }}
      sx={{ "& fieldset": { border: "none" } }}
      placeholder="0"
      id="amount"
      inputRef={ref1}
      size="small"
      variant="outlined"
      autoComplete="off"
      error={!!error}
      helperText={error ? "Please enter a valid number" : ""}
      InputProps={{
        sx: {
          borderRadius: "5px 5px 0px 0px",
        },
        endAdornment: (
          <InputAdornment position="end">
            <span>{pair?.underlyingLabel}</span>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
};

export default MarketAmountTextField;
