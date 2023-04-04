import { pools } from "data/pools";
import React from "react";
import { useForm } from "react-hook-form";
import { usePoolStore } from "store";
import Amount from "./Fields/Amount";
import Boost from "./Fields/Boost";
import Price from "./Fields/Price";
import Submit from "./Fields/Submit";
import Total from "./Fields/Total";

const Form = () => {
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);
  const { register, handleSubmit, control } = useForm();
  const selectedPool = pools.find((i) => i.value === pool);

  function handleKeyDown(
    event: React.KeyboardEvent<
      HTMLDivElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const char = event.key;
    if (char === "e" || char === "E" || char === ".") {
      event.preventDefault();
    }
  }

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
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Price
          endLabel={selectedPool?.accountingLabel || ""}
          {...register("price", {
            valueAsNumber: true,
            min: 0,
          })}
          onKeyDown={handleKeyDown}
        />

        <Amount
          endLabel={selectedPool?.underlyingLabel || ""}
          {...register("amount", { valueAsNumber: true, min: 0 })}
          onKeyDown={handleKeyDown}
        />

        <div style={{ marginTop: 5 }}></div>

        <Boost />

        <Total total="1993" label={selectedPool?.accountingLabel || ""} />

        <Submit control={control} label={selectedPool?.underlyingLabel || ""} />
      </form>
    </div>
  );
};

export default Form;
