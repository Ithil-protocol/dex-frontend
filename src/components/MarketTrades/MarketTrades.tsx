import Trades from "./Trades";
import { Box } from "@mui/material";
import theme from "styles/theme";
import InfoTooltip from "components/common/InfoTooltip";

const MarketTrades = () => {
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: "5px",
        // position: "sticky",
        // top: 15,
        // height: "80%",
        maxHeight: 300,
        overflow: "auto",
      })}
    >
      <div
        style={{
          display: "flex",
          gap: 5,
          padding: 10,
          alignItems: "center",
        }}
      >
        <h4 style={{ color: theme.palette.text.primary }}>Market Trades</h4>
        <InfoTooltip title="All the trades happening" />
      </div>

      <Trades />
    </Box>
  );
};

export default MarketTrades;
