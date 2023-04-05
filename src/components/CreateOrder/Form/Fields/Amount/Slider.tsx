import Slider from "components/common/Slider";
import { useTokenBalance } from "hooks/account";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

interface Props {
  setValue: any;
}

const AmountSlider: React.FC<Props> = ({ setValue }) => {
  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });
  const balance = tokenBalance ? Number(tokenBalance.formatted) : 0;
  console.log("object", balance);
  const changeHandler = (event: any) => {
    const amountPercent = (Number(event.target.value) / 100) * balance;
    setValue("amount", amountPercent);
  };

  return (
    <div style={{ padding: "0px 10px" }}>
      <Slider
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
      />
    </div>
  );
};

export default AmountSlider;
