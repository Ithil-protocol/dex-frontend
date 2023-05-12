import { Box, Link, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { usePoolStore } from "@/store";
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

  return (
    <Box height={"100%"}>
      <AdvancedRealTimeChartNoSSR
        height="100%"
        theme="dark"
        autosize
        symbol={pair.chartUrl}
        copyrightStyles={{ parent: { display: "none" } }}
      />
      {/* <Typography
        variant="caption"
        className={styles.copyright}
        fontSize="10px"
      >
        <Link
          underline="none"
          color={"#2196f3"}
          href={`https://www.tradingview.com/symbols/UNISWAP3ARBITRUM:${symbol}`}
          target={"_blank"}
        >
          {symbol} Chart
        </Link>
        <p>by TradingView</p>
      </Typography> */}
    </Box>
  );
};
