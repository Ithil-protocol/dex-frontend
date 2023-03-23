import React, { useState } from 'react';
import { Autocomplete, TextField, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { pools } from 'data/pools';
import { Pool } from 'types/index'
import RenderOption from './RenderOption';
import { usePoolStore } from 'store';

function PoolsSelect() {
    const [pool, updatePool] = usePoolStore(state => [state.pool, state.updatePool])

    console.log("pool", pool)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: Pool | null) => {
        updatePool(newValue?.value ?? '');
    };

    return (
        <Autocomplete
            value={pools.find((option) => option.value === pool) ?? null}
            onChange={handleChange}
            options={pools}
            getOptionLabel={(option: Pool) => option.underlyingLabel + '/' + option.accountingLabel}
            renderOption={RenderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select an option"
                    variant="standard"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

export default PoolsSelect;
