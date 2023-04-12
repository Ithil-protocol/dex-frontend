import React from "react";

interface Props {
  marginTop?: number | string;
}

const MarginTop: React.FC<Props> = ({ marginTop }) => {
  return <div style={{ marginTop }}></div>;
};

export default MarginTop;
