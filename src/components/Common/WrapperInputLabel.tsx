import { InputLabel } from "@mui/material";
import InfoTooltip from "./InfoTooltip";

interface Props {
  htmlFor?: string;
  label: string;
  endLabel?: string;
  tooltip: string;
  Currency?: React.ReactNode;
}

const WrapperInputLabel: React.FC<Props> = ({
  htmlFor,
  label,
  tooltip,
  endLabel,
  Currency,
}) => {
  return (
    <InputLabel
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      htmlFor={htmlFor}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ marginRight: "5px" }}>{label}</span>
        <InfoTooltip title={tooltip} />
        {Currency}
      </span>

      <span style={{ fontSize: 12 }}>{endLabel}</span>
    </InputLabel>
  );
};

export default WrapperInputLabel;
