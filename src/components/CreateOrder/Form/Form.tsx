import { pools } from "data/pools";
import { decimalRegex } from "data/regex";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { usePoolStore } from "store";
import { CustomInputEvent, StringMap } from "types";
import { formatBigNumber } from "utility";
import AmountSlider from "./Fields/Amount/Slider";
import AmountTextField from "./Fields/Amount/TextField";
import Available from "./Fields/Available";
import Boost from "./Fields/Boost";
import Price from "./Fields/Price";
import Submit from "./Fields/Submit";
import Total from "./Fields/Total";

const Form = () => {
  const { control, handleSubmit, register, setValue } = useForm();
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);
  const available = useRef(1_000_000);

  // const handleAmountSliderChange = (value: number | number[]) => {
  //   setValue("amount", (available.current / 100) * Number(value));
  // };

  const handleFormSubmit = (data: StringMap) => console.log(data);

  const selectedPool = pools.find((i) => i.value === pool.value);

  return (
    <div>
      <form
        style={{
          backgroundColor: "#284f5b",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 10,
        }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Price
          control={control}
          endLabel={selectedPool?.accountingLabel || ""}
        />

        <AmountTextField
          endLabel={selectedPool?.underlyingLabel || ""}
          control={control}
        />

        <AmountSlider setValue={setValue} />

        <Available
          endLabel={selectedPool?.underlyingLabel || ""}
          available={formatBigNumber(available.current)}
        />

        <div style={{ marginTop: 5 }}></div>

        <Boost control={control} />

        <Total control={control} label={selectedPool?.accountingLabel || ""} />

        <Submit control={control} label={selectedPool?.underlyingLabel || ""} />
      </form>
    </div>
  );
};

export default Form;
