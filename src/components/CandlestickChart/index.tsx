import { Box, Link, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { usePoolStore } from "store";
import styles from "./CandlestickChart.module.scss";
const AdvancedRealTimeChartNoSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export const CandlestickChart = () => {
  const pair = usePoolStore((store) => store.pair);
  const symbol = pair
    ? pair.sell.underlying.label + pair.sell.accounting.label
    : "BTCUSDT";

  return (
    <Box height={"100%"}>
      <AdvancedRealTimeChartNoSSR
        height="100%"
        theme="dark"
        autosize
        symbol={symbol}
        copyrightStyles={{ parent: { display: "none" } }}
      />
    </Box>
  );
};
