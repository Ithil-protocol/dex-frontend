import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { usePoolStore } from "@/store";
import { memo } from "react";
import { Pair } from "@/types";
const AdvancedRealTimeChartNoSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

interface Props {
  pair: Pair;
}

const CandlestickChart = ({ pair }: Props) => {
  return (
    <Box height={"100%"}>
      <AdvancedRealTimeChartNoSSR
        interval="60"
        height="100%"
        theme="dark"
        autosize
        symbol={pair.chartUrl}
        copyrightStyles={{ parent: { display: "none" } }}
      />
    </Box>
  );
};

export default memo(CandlestickChart, (prevProps, nextProps) => {
  return prevProps.pair === nextProps.pair;
});
