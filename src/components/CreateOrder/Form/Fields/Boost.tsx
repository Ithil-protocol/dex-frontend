import React from "react";
import Slider from "./Slider";

const Boost = () => {
  return (
    <div style={{ padding: "0px 10px 0px" }}>
      Boost
      <Slider
        valueLabelDisplay="auto"
        defaultValue={0}
        step={0.01}
        min={0}
        max={0.1}
      />
    </div>
  );
};

export default Boost;
