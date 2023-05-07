import Table from "./Table";
import InfoTooltip from "@/components/Common/InfoTooltip";
import { Box } from "@mui/material";

const MarketTrades = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        position: "sticky",
        top: 15,
        paddingBottom: "15px",
        paddingInline: "5px",
      })}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 5,
          padding: 10,
        }}
      >
        <h4>Market Trades</h4>
        <InfoTooltip title="All the trades happening" />
      </div>

      <Table />
    </Box>
  );
};

export default MarketTrades;
