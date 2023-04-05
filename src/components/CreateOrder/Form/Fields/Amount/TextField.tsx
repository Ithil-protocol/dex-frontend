import { InputAdornment, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import { decimalRegex } from "data/regex";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import theme from "styles/theme";
interface Props {
  endLabel: string;
  control: any;
}

export default React.forwardRef<HTMLDivElement, Props>(function Price(
  props,
  ref
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
  }, [amountValue, setValue]);

  return (
    <FormGroup>
      <InputLabel
        htmlFor="amount"
        sx={(theme) => ({ color: theme.palette.text.primary })}
      >
        Amount
      </InputLabel>
      <TextField
        {...inputProps}
        onChange={(event) => {
          if (decimalRegex.test(event.target.value)) {
            onChange(Number(event.target.value));
            setValue(event.target.value);
          }
        }}
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
            borderRadius: "5px",
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
    </FormGroup>
  );
});
