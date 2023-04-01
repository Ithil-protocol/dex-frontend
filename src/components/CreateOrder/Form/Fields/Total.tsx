import React from "react";

interface Props {
  total: string;
}

const Total: React.FC<Props> = (props) => {
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
      <span>Total</span>
      <span style={{ display: "flex", width: "100%" }}>{props.total}</span>
      <span>USDT</span>
    </div>
  );
};

export default Total;
