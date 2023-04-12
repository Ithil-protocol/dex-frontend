import React from "react";

const BoldSpan = ({ style = {}, ...rest }) => {
  return (
    <span
      style={{
        fontWeight: 900,
        ...style,
      }}
      {...rest}
    />
  );
};

export default BoldSpan;
