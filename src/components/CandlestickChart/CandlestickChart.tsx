import dynamic from "next/dynamic";
const SymbolOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export const CandlestickChart = () => {
  return (
    <SymbolOverviewNoSSR theme="dark" height={"512px"} width={"100%"} />

  );
};

