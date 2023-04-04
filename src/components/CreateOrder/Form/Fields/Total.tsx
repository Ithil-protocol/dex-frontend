import React from "react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  label: string;
  control: Control<any, any>;
}

const Total: React.FC<Props> = ({ label, control }) => {
  const formValues = useWatch({ control });
  const total = formValues.amount * formValues.price || 0;

  return (
    <div
      style={{
        backgroundColor: "#264A56",
        borderRadius: 5,
        display: "flex",
        gap: 5,
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      <span style={{ color: "#e3e3e378 " }}>Total</span>
      <span style={{ display: "flex", width: "100%" }}>{total}</span>
      <span>{label}</span>
    </div>
  );
};

export default Total;
