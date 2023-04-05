import React, { useState } from "react";
import Slider from "../../../common/Slider";
import { useController } from "react-hook-form";

interface Props {
  control: any;
}

const Boost: React.FC<Props> = ({ control }) => {
  const [boost, setBoost] = useState(0);

  const {
    field: { onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "boost",
    defaultValue: 0,
    control,
  });

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
        {...inputProps}
        onChange={(event: any) => {
          onChange(Number(event.target.value));
          setBoost(event.target.value);
        }}
        valueLabelDisplay="auto"
        value={boost}
        step={0.01}
        min={0}
        max={0.1}
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
