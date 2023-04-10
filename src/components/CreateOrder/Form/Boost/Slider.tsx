import WrapperSlider from "components/common/Slider";

interface Props {
  inputProps: any;
  onChange: (...args: any[]) => void;
  setBoost: React.Dispatch<React.SetStateAction<number>>;
  boost: number;
}

const Slider: React.FC<Props> = ({ inputProps, onChange, boost, setBoost }) => {
  return (
    <WrapperSlider
      {...inputProps}
      onChange={(event: any) => {
        onChange(Number(event.target.value));
        setBoost(event.target.value);
      }}
      color="secondary"
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
              fontSize: 12,
            }}
          >
            ETH
          </span>
        </span>
      )}
    />
  );
};

export default Slider;
