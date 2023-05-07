import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { usePoolStore } from "@/store";
const AdvancedRealTimeChartNoSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export const CandlestickChart = () => {
  const pair = usePoolStore((store) => store.pair);
  const symbol = pair.underlyingLabel + pair.accountingLabel;

  return (
    <Box height={"100%"}>
      <AdvancedRealTimeChartNoSSR
        height="100%"
        theme="dark"
        autosize
        symbol={"UNISWAP3ARBITRUM:" + symbol}
        copyrightStyles={{ parent: { display: "none" } }}
      />
    </Box>
  );
};
