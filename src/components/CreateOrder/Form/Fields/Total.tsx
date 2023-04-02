import React from "react";

interface Props {
  label: string;
  total: string;
}

const Total: React.FC<Props> = ({ label, total }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 5,
        borderRadius: 5,
        padding: 15,
        backgroundColor: "#264A56",
      }}
    >
      <span style={{ color: "#e3e3e378 " }}>Total</span>
      <span style={{ display: "flex", width: "100%" }}>{total}</span>
      <span>{label}</span>
    </div>
  );
};

export default Total;
