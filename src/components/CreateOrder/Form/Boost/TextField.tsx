import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

interface Props {
  onBoostChange: (...args: any[]) => void;
  control: any;
  onMaxClick: (...args: any[]) => void;
}

const BoostTextField: React.FC<Props> = ({
  control,
  onBoostChange,
  onMaxClick,
}) => {
  const {
    field: { onChange, ...inputProps },
  } = useController({
    name: "boost",
    defaultValue: 0,
    control,
  });

  const handleMaxClick = () => {
    onMaxClick();
    onChange(0.1);
  };

  return (
    <TextField
      {...inputProps}
      onChange={(event: any) => {
        onChange(Number(event.target.value));
        onBoostChange(event);
      }}
      sx={{ "& fieldset": { border: "none" } }}
      autoComplete="off"
      id="boost"
      placeholder="0"
      size="small"
      variant="outlined"
      type="number"
      inputProps={{
        min: 0,
        max: 0.1,
        step: 0.01,
      }}
      InputProps={{
        sx: (theme) => ({
          backgroundColor: theme.palette.background.default,
          border: "2px solid transparent",
          borderRadius: "5px",
          padding: "5px 15px 5px 5px",
          "&.Mui-focused": {
            border: `2px solid ${theme.palette.success.main}`,
          },
          "& input": {
            "-moz-appearance": "textfield",
          },
          "& input::-webkit-inner-spin-button": {
            margin: 0,
            "-webkit-appearance": "none",
          },
          "& input::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        }),
        endAdornment: (
          <InputAdornment position="end">
            <Button
              onClick={handleMaxClick}
              size="small"
              sx={(theme) => ({
                border: `1px solid  ${theme.palette.secondary.dark}`,
                borderRadius: "5px",
                color: theme.palette.text.primary,
                minWidth: 0,
                padding: "5px",
                width: "auto",
              })}
            >
              MAX
            </Button>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default BoostTextField;
