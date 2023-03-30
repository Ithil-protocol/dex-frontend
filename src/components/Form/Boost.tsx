import React from "react";
import CustomSlider from "./CustomSlider";

const Boost = () => {
  return (
    <div>
      Boost
      <CustomSlider
        valueLabelDisplay="auto"
        aria-label="custom slider"
        defaultValue={20}
      />
    </div>
  );
};

export default Boost;
