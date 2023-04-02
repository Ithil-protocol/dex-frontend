import { pools } from "data/pools";
import React from "react";
import { usePoolStore } from "store";
import Amount from "./Fields/Amount";
import Boost from "./Fields/Boost";
import Price from "./Fields/Price";
import Submit from "./Fields/Submit";
import Total from "./Fields/Total";

const Form = () => {
  const [pool] = usePoolStore((state) => [state.pool, state.updatePool]);

  const selectedPool = pools.find((i) => i.value === pool);

  return (
    <div
      style={{
        backgroundColor: "#284f5b",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: 10,
      }}
    >
      <Price endLabel={selectedPool?.accountingLabel || ""} />
      <Amount endLabel={selectedPool?.underlyingLabel || ""} />

      <div style={{ marginTop: 10 }}></div>

      <Boost />
      <Total total="1993" label={selectedPool?.accountingLabel || ""} />
      <Submit label={selectedPool?.underlyingLabel || ""} />
    </div>
  );
};

export default Form;
