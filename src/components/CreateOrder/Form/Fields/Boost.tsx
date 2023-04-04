import React, { useState } from "react";
import Slider from "../../../common/Slider";

const Boost = () => {
  const [boost, setBoost] = useState(0);

  const handleChangeBoost = (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    setBoost(value as number);
  };

  return (
    <div
      style={{
        padding: "0px 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: "#e3e3e378",
          }}
        >
          Boost
        </span>
        <span>{boost}</span>
      </div>
      <Slider
        valueLabelDisplay="auto"
        value={boost}
        step={0.01}
        min={0}
        max={0.1}
        onChange={handleChangeBoost}
        valueLabelFormat={(value) => (
          <span>
            <span
              style={{
                fontSize: 14,
              }}
            >
              {value}{" "}
            </span>
            <span
              style={{
                fontSize: 9,
              }}
            >
              ETH
            </span>
          </span>
        )}
      />
    </div>
  );
};

export default Boost;