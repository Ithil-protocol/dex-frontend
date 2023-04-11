import Trades from "./Trades";
import InfoTooltip from "components/common/InfoTooltip";
import WrapperBox from "components/common/Box";

const MarketTrades = () => {
  return (
    <WrapperBox
      overrideStyles={(theme) => ({
        bgcolor: theme.palette.background.paper,
        position: "sticky",
        top: 15,
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
        <h4>Market Trades</h4>
        <InfoTooltip title="All the trades happening" />
      </div>

      <Trades />
    </WrapperBox>
  );
};

export default MarketTrades;
