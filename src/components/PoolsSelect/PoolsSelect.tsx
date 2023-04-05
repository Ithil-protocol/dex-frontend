import { Autocomplete, TextField } from "@mui/material";
import { pools } from "data/pools";
import React from "react";
import { usePoolStore } from "store";
import { Pool } from "types/index";
import RenderOption from "./RenderOption";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function PoolsSelect() {
  const [poolValue, updatePool] = usePoolStore((state) => [
    state.poolValue,
    state.updatePool,
  ]);

  const handleChange = (_: React.SyntheticEvent, newValue: Pool) => {
    updatePool(newValue);
  };

  return (
    <Autocomplete
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.secondary.main} `,
        "& .MuiSvgIcon-root": { fill: theme.palette.secondary.main },
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
          color="secondary"
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{
            ...params.inputProps,
            border: "red",
            style: { color: "white" },
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default PoolsSelect;
