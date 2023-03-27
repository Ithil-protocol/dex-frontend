import { pools } from "data/pools";
import dynamic from "next/dynamic";
import { usePoolStore } from "store";
const SymbolOverviewNoSSR = dynamic(
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

  console.log("symbol", symbol);

  return (
    <SymbolOverviewNoSSR
      theme="dark"
      height={"512px"}
      width={"100%"}
      symbol={symbol}
    />
  );
};
