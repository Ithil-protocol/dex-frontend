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
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              onClick={handleMaxClick}
              size="small"
              sx={(theme) => ({
                border: `1px solid  ${theme.palette.secondary.dark}`,
                minWidth: 0,
                padding: "5px",
                backgroundColor: "transparent",
                "&: hover": {
                  backgroundColor: "transparent",
                },
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
