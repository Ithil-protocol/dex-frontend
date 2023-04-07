import { InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import React, { useEffect, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import theme from "styles/theme";
interface Props {
  endLabel: string;
  control: any;
}

export default React.forwardRef<HTMLDivElement, Props>(function AmountTextField(
  props
) {
  const [once, setOnce] = useState(false);
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

  const [value, setValue] = useState(inputProps.value);

  const { amount: amountValue } = useWatch({ control: props.control });

  useEffect(() => {
    if (!once) {
      setOnce(true);
      return;
    }
    setValue(amountValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountValue, setValue, setOnce]);

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        if (decimalRegex.test(event.target.value)) {
          onChange(Number(event.target.value));
          setValue(event.target.value);
        }
      }}
      sx={{ "& fieldset": { border: "none" } }}
      placeholder="0"
      id="amount"
      value={value}
      inputRef={ref1}
      size="small"
      variant="outlined"
      autoComplete="off"
      error={!!error}
      helperText={error ? "Please enter a valid number" : ""}
      InputProps={{
        sx: (theme) => ({
          backgroundColor: theme.palette.background.default,
          padding: "5px 15px 5px 5px",
          borderRadius: "5px 5px 0px 0px",
        }),
        endAdornment: (
          <InputAdornment position="end">
            <span style={{ color: theme.palette.text.primary }}>
              {props.endLabel}
            </span>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
});
