import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { usePoolStore } from "store";
import { StringMap } from "types";
import { formatBigNumber } from "utility";
import AmountSlider from "./Fields/Amount/Slider";
import AmountTextField from "./Fields/Amount/TextField";
import Available from "./Fields/Available";
import Boost from "./Fields/Boost";
import Price from "./Fields/Price";
import Submit from "./Fields/Submit";
import Total from "./Fields/Total";
import { useAccount, useBalance } from "wagmi";
import { useTokenBalance } from "hooks/account";

const Form = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);

  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  });

  const handleFormSubmit = (data: StringMap) => console.log(data);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: "10px",
      }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Price control={control} endLabel={pool?.accountingLabel || ""} />

      <AmountTextField
        endLabel={pool?.underlyingLabel || ""}
        control={control}
      />

      <AmountSlider setValue={setValue} />

      <Available
        endLabel={pool?.accountingLabel || ""}
        available={tokenBalance?.formatted}
      />

      <div style={{ marginTop: 5 }}></div>

      <Boost control={control} />

      <Total control={control} label={pool?.accountingLabel || ""} />

      <Submit control={control} label={pool?.underlyingLabel || ""} />
    </form>
  );
};

export default Form;
