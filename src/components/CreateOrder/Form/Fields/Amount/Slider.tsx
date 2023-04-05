import Slider from "components/common/Slider";
import { useTokenBalance } from "hooks/account";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

interface Props {
  setValue: any;
  control: any;
}

const AmountSlider: React.FC<Props> = ({ setValue, control }) => {
  const { price } = useWatch({ control });

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });
  const balance = tokenBalance ? Number(tokenBalance.formatted) : 0;

  const changeHandler = (event: any) => {
    const amountPercent = (Number(event.target.value) / 100) * balance;
    setValue("amount", amountPercent);
  };

  return (
    <div style={{ padding: "0px 10px" }}>
      <Slider
        disabled={price == "" || price == 0 || price == undefined}
        min={0}
        max={100}
        valueLabelFormat={(value) => (
          <span
            style={{
              fontSize: 14,
            }}
          >
            {value} %
          </span>
        )}
        valueLabelDisplay="auto"
        step={5}
        onChange={changeHandler}
        sx={{
          "& .Mui-disabled.MuiSlider-thumb": {
            bgcolor: "gray",
          },
        }}
      />
    </div>
  );
};

export default AmountSlider;
