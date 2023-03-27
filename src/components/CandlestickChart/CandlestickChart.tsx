import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import styles from "./CandlestickChart.module.scss";
const AdvancedRealTimeChartNoSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export const CandlestickChart = () => {
  return (
    <Box height={"100%"}>
      <AdvancedRealTimeChartNoSSR
        theme="dark"
        autosize
        symbol="BTCUSDT"
        copyrightStyles={{ parent: { display: "none" } }}
      />
      <Typography variant="caption" className={styles.copyright}>
        <a
          href={`https://www.tradingview.com/symbols/${"BTCUSDT"}`}
          target={"_blank"}
        >
          {"BTCUSDT"} Chart
        </a>
        <p>by TradingView</p>
      </Typography>
    </Box>
  );
};
