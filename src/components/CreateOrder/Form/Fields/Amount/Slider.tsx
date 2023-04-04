import Slider from "components/common/Slider";
import React from "react";

interface Props {
  onSliderChange: (value: number | number[]) => void;
}

const AmountSlider: React.FC<Props> = ({ onSliderChange }) => {
  return (
    <div style={{ padding: "0px 10px" }}>
      <Slider
        min={0}
        max={100}
        valueLabelFormat={(value) => (
          <span
            style={{
              fontSize: 14,
            }}
          >
            {value} %
          </span>
        )}
        valueLabelDisplay="auto"
        step={5}
        onChange={(_e, value) => onSliderChange(value)}
      />
    </div>
  );
};

export default AmountSlider;
