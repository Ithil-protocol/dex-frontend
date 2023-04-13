import Trades from "./Trades";
import InfoTooltip from "components/Common/InfoTooltip";
import WrapperBox from "components/Common/Box";
import { useAllOrderFulfilledEvents } from "hooks/events";
import { useEffect, useState } from "react";
import { Trade } from "types";
import { formatDateToTime } from "utility";
import { utils } from "ethers";

const MarketTrades = () => {
  const { data } = useAllOrderFulfilledEvents();
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fn = async () => {
      if (!data) return [];
      const trades = await convertTrades(data);
      setTrades(trades);
    };

    fn();
  }, [data]);

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
          alignItems: "center",
          display: "flex",
          gap: 5,
          padding: 10,
        }}
      >
        <h4>Market Trades</h4>
        <InfoTooltip title="All the trades happening" />
      </div>

      <Trades trades={trades} />
    </WrapperBox>
  );
};

export const convertTrades = async (data: any[]) => {
  const trades: Trade[] = [];

  for await (const trade of data) {
    const block = await trade.getBlock();
    const fullDate = formatDateToTime(block.timestamp * 1000);

    const { amount, price } = trade.args!;
    const convertedAmount = utils.formatUnits(amount, 6);
    const convertedPrice = utils.formatUnits(price, 18);

    trades.push({
      amount: convertedAmount,
      fullDate,
      price: convertedPrice,
      type: "taker", //TODO How to find out what type it is
    });
  }

  return trades;
};

export default MarketTrades;
