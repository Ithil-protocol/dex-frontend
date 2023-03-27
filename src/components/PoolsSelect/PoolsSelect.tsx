import { Autocomplete, TextField } from "@mui/material";
import { pools } from "data/pools";
import React from "react";
import { usePoolStore } from "store";
import { Pool } from "types/index";
import RenderOption from "./RenderOption";

function PoolsSelect() {
  const [pool, updatePool] = usePoolStore((state) => [
    state.pool,
    state.updatePool,
  ]);

  const handleChange = (_: unknown, newValue: Pool | null) => {
    updatePool(newValue?.value ?? "");
  };

  return (
    <Autocomplete
      value={pools.find((option) => option.value === pool) ?? null}
      onChange={handleChange}
      options={pools}
      getOptionLabel={(option: Pool) =>
        option.underlyingLabel + "/" + option.accountingLabel
      }
      renderOption={RenderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select an option"
          variant="standard"
          color="secondary"
          InputLabelProps={{ style: { color: "white" } }}
          inputProps={{
            ...params.inputProps,
            style: { color: "white" },

            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default PoolsSelect;
