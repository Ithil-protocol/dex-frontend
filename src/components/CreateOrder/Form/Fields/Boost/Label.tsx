import { InputLabel } from "@mui/material";
import InfoTooltip from "components/common/InfoTooltip";

interface Props {
  boost: number;
}

const BoostLabel: React.FC<Props> = ({ boost }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <InputLabel
        sx={(theme) => ({
          color: theme.palette.text.primary,
          display: "flex",
          gap: "5px",
          padding: "10px",
          alignItems: "center",
        })}
      >
        <span>Boost</span>

        <InfoTooltip title="Boost" />
      </InputLabel>
      <span>
        <span>{boost}</span> <span style={{ fontSize: 12 }}>ETH</span>
      </span>
    </div>
  );
};

export default BoostLabel;
