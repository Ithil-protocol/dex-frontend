import Trades from "./Table";
import InfoTooltip from "components/Common/InfoTooltip";
import { useAllOrderFulfilledEvents } from "hooks/events";
import { Box } from "@mui/material";

const MarketTrades = () => {
  const { data: trades, isLoading } = useAllOrderFulfilledEvents();

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        position: "sticky",
        top: 15,
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

      <Trades trades={trades || []} isLoading={isLoading} />
    </Box>
  );
};

export default MarketTrades;
