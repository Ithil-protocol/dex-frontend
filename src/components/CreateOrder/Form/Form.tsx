import React from "react";
import AmountField from "./Fields/Amount";
import Boost from "./Fields/Boost";
import HoldingField from "./Fields/Holding";
import SubmitButton from "./Fields/Submit";
import TotalField from "./Fields/Total";

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
      <HoldingField />
      <AmountField />
      <div style={{ marginTop: 10 }}></div>
      <Boost />
      <TotalField />
      <SubmitButton />
    </div>
  );
};

export default Form;
