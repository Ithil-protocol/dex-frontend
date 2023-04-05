import Slider from "components/common/Slider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

interface Props {
  control: any;
  setValue: any;
}

const AmountSlider: React.FC<Props> = ({ control, setValue }) => {
  const [amountPercent, setAmountPercent] = useState(0);

  const formValues = useWatch({ control });

  useEffect(() => {
    setValue("amount", amountPercent);
  }, [amountPercent, setValue]);

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
        onChange={(event: any) => {
          setAmountPercent(Number(event.target.value) as number);
        }}
      />
    </div>
  );
};

export default AmountSlider;
