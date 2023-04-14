import Trades from "./Trades";
import InfoTooltip from "components/Common/InfoTooltip";
import { useAllOrderFulfilledEvents } from "hooks/events";
import { useEffect, useState } from "react";
import { Pool, Trade } from "types";
import { formatDateToTime } from "utility";
import { utils } from "ethers";
import { Box } from "@mui/material";
import { usePoolStore } from "store";

const MarketTrades = () => {
  const { data } = useAllOrderFulfilledEvents();
  const [trades, setTrades] = useState<Trade[]>([]);
  const defaultPool = usePoolStore((state) => state.default);

  useEffect(() => {
    const fn = async () => {
      if (!data) return [];
      const trades = await convertTrades(data, defaultPool);
      setTrades(trades);
    };

    fn();
  }, [data, defaultPool]);

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

      <Trades trades={trades} />
    </Box>
  );
};

export const convertTrades = async (data: any[], pool: Pool) => {
  const trades: Trade[] = [];

  for await (const trade of data) {
    const block = await trade.getBlock();
    const fullDate = formatDateToTime(block.timestamp * 1000);

    const { amount, price } = trade.args!;
    const convertedAmount = utils.formatUnits(amount, pool.underlying.decimals);
    const convertedPrice = utils.formatUnits(price, pool.accounting.decimals);

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
