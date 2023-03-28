import { Box, Link, Typography } from "@mui/material";
import { pools } from "data/pools";
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
  const poolValue = usePoolStore((store) => store.pool);
  const pool = pools.find((pool) => pool.value === poolValue);

  const symbol = pool ? pool.underlyingLabel + pool.accountingLabel : "BTCUSDT";

  return (
    <Box height={"100%"}>
      <AdvancedRealTimeChartNoSSR
        theme="dark"
        autosize
        symbol={symbol}
        copyrightStyles={{ parent: { display: "none" } }}
      />
      <Typography
        variant="caption"
        className={styles.copyright}
        fontSize="10px"
      >
        <Link
          underline="none"
          color={"#2196f3"}
          href={`https://www.tradingview.com/symbols/${symbol}`}
          target={"_blank"}
        >
          {"BTCUSDT"} Chart
        </Link>
        <p>by TradingView</p>
      </Typography>
    </Box>
  );
};
