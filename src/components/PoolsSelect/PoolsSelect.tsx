import { Autocomplete, TextField } from "@mui/material";
import { pools } from "data/pools";
import React from "react";
import { usePoolStore } from "store";
import { Pool } from "types/index";
import RenderOption from "./RenderOption";
import theme from "styles/theme";

function PoolsSelect() {
  const [poolValue, updatePool] = usePoolStore((state) => [
    state.poolValue,
    state.updatePool,
  ]);

  console.log(poolValue);

  const handleChange = (_: React.SyntheticEvent, newValue: Pool) => {
    updatePool(newValue);
  };

  return (
    <Autocomplete
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.text.primary} `,
        "& .MuiSvgIcon-root": { fill: theme.palette.text.primary },
      })}
      value={pools.find((option) => option.value === poolValue)}
      onChange={handleChange}
      options={pools}
      disableClearable
      getOptionLabel={(option: Pool) =>
        option.underlyingLabel + "/" + option.accountingLabel
      }
      renderOption={RenderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          color="info"
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          inputProps={{
            ...params.inputProps,
            style: { color: theme.palette.text.primary },
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default PoolsSelect;
