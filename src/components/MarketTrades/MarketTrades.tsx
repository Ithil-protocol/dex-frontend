import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightTooltip from "components/common/LightTooltip";
import Trades from "./Trades";
import { Box } from "@mui/material";

const MarketTrades = () => {
  return (
    <Box sx={(theme) => ({ bgcolor: theme.palette.background.paper })}>
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
    </Box>
  );
};

export default MarketTrades;
