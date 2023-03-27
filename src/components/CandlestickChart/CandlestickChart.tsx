import dynamic from "next/dynamic";
const AdvancedRealTimeChartNoSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export const CandlestickChart = () => {
  return <AdvancedRealTimeChartNoSSR theme="dark" height={"512px"} width={"100%"} />;
};
