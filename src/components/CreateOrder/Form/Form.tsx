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

  const handlePriceTextChange = (event: CustomInputEvent) => {
    const inputValue = event.target.value;
    if (decimalRegex.test(inputValue)) {
      setValue("price", inputValue);
    }
  };

  const handleAmountTextChange = (event: CustomInputEvent) => {
    const inputValue = event.target.value;
    if (decimalRegex.test(inputValue)) {
      setValue("amount", inputValue);
    }
  };

  const handleAmountSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setValue("amount", (available.current / 100) * value);
    }
  };

  const handleFormSubmit = (data: StringMap) => console.log(data);

  const selectedPool = pools.find((i) => i.value === pool);

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
          endLabel={selectedPool?.accountingLabel || ""}
          {...register("price", {
            min: 0,
            valueAsNumber: true,
            onChange: handlePriceTextChange,
          })}
        />

        <AmountTextField
          endLabel={selectedPool?.underlyingLabel || ""}
          {...register("amount", {
            min: 0,
            valueAsNumber: true,
            onChange: handleAmountTextChange,
          })}
        />

        <AmountSlider onSliderChange={handleAmountSliderChange} />

        <Available
          endLabel={selectedPool?.underlyingLabel || ""}
          available={formatBigNumber(available.current)}
        />

        <div style={{ marginTop: 5 }}></div>

        <Boost />

        <Total control={control} label={selectedPool?.accountingLabel || ""} />

        <Submit control={control} label={selectedPool?.underlyingLabel || ""} />
      </form>
    </div>
  );
};

export default Form;
