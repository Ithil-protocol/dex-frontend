import React from "react";
import AmountField from "./AmountField";
import Boost from "./Boost";
import HoldingField from "./HoldingField";
import SubmitButton from "./SubmitButton";
import TotalField from "./TotalField";

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
