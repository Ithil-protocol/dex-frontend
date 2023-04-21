import { InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import { useController } from "react-hook-form";

interface Props {
  endLabel: string;
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
            <span>{props.endLabel}</span>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
};

export default MarketAmountTextField;
