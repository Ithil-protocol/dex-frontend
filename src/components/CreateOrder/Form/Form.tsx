import React from "react";
import Amount from "./Fields/Amount";
import Boost from "./Fields/Boost";
import Price from "./Fields/Price";
import Submit from "./Fields/Submit";
import Total from "./Fields/Total";

const Form = () => {
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
      <Price />
      <Amount />
      <div style={{ marginTop: 10 }}></div>
      <Boost />
      <Total />
      <Submit />
    </div>
  );
};

export default Form;
