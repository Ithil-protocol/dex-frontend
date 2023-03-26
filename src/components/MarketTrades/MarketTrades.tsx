import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "components/Utility/LightTooltip";
import Trades from "./Trades";

const MarketTrades = () => {
  return (
    <div style={{ backgroundColor: "#233347" }}>
      <div
        style={{
          display: "flex",
          gap: 5,
          padding: 10,
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "#DFE6EC" }}>Market Trades</h4>
        <LightTooltip title="All the trades happening">
          <InfoOutlinedIcon style={{ color: "white" }} fontSize="small" />
        </LightTooltip>
      </div>

      <Trades />
    </div>
  );
};

export default MarketTrades;
