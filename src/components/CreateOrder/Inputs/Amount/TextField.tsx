import { InputAdornment, TextField } from "@mui/material";
import { getDecimalRegex } from "@/data/regex";
import { useController } from "react-hook-form";
import { usePoolStore } from "@/store";

interface Props {
  control: any;
}

const AmountTextField: React.FC<Props> = (props) => {
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "amount",
    defaultValue: "",
    control: props.control,
  });
  const pair = usePoolStore((state) => state.pair);

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        const { value } = event.target;
        if (
          getDecimalRegex(pair.sell.underlying.displayPrecision).test(value) ||
          value === ""
        ) {
          onChange(value);
        }
      }}
      placeholder="0"
      sx={{ "& fieldset": { border: "none" } }}
      id="amount"
      inputRef={ref}
      size="small"
      variant="outlined"
      autoComplete="off"
      error={!!error}
      helperText={error?.message}
      InputProps={{
        sx: {
          borderRadius: "5px 5px 0px 0px",
        },
        endAdornment: (
          <InputAdornment position="end">
            <span>{pair.underlyingLabel}</span>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
};

export default AmountTextField;
