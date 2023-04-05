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

const Form = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);
  const available = useRef(1_000_000);

  const { address } = useAccount();

  const { data } = useBalance({
    address,
    token: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  });
  console.log(data);

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
        endLabel={pool?.underlyingLabel || ""}
        available={formatBigNumber(available.current)}
      />

      <div style={{ marginTop: 5 }}></div>

      <Boost control={control} />

      <Total control={control} label={pool?.accountingLabel || ""} />

      <Submit control={control} label={pool?.underlyingLabel || ""} />
    </form>
  );
};

export default Form;
