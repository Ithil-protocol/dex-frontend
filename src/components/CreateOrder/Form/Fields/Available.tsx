import React from "react";

interface Props {
  endLabel: string;
  available: string;
}

const Available: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        color: "#e3e3e378",
        display: "flex",
        fontSize: 12,
        justifyContent: "space-between",
        padding: "0px 10px",
      }}
    >
      <span>Available {props.endLabel}</span>
      <span>{props.available}</span>
    </div>
  );
};

export default Available;
