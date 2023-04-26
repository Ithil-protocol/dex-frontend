import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import { buyOrders } from "store/web3Store";
import WrapperTooltip from "./Tooltip";
import { briefing, computeOrders } from "utility";
import { useBuyVolumes, useSellVolumes } from "hooks/contract";

const computedOrders = computeOrders(buyOrders);

const DepthChart = () => {
  const { data: buyData } = useBuyVolumes();
  const { data: sellData } = useSellVolumes();

  if (!buyData || !sellData) return null;

  const data = [
    ...sellData.map((item) => ({
      x: item.value,
      yBuy: item.value * item.volume,
      y: item.value * item.volume,
    })),
    ...buyData.map((item) => ({
      x: item.value,
      ySell: item.value * item.volume,
      y: item.value * item.volume,
    })),
  ];
  //   return(
  //       <pre>{JSON.stringify(computedOrders,null,2)}</pre>
  //   )
  return (
    <ResponsiveContainer width="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#553A50" stopOpacity={1} />
            <stop offset="95%" stopColor="#553A50" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#284F5B" stopOpacity={1} />
            <stop offset="95%" stopColor="#284F5B" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          type="step"
          dataKey="ySell"
          stroke="#f34444"
          fillOpacity={1}
          fill="url(#colorUv)"
          isAnimationActive={false}
        />
        <Area
          type="step"
          dataKey="yBuy"
          stroke="#30d46f"
          fillOpacity={1}
          fill="url(#colorPv)"
          isAnimationActive={false}
        />
        <XAxis
          dataKey="x"
          tickFormatter={(value, index) =>
            index % 2 === 0 ? "" : briefing(value)
          }
          allowDecimals={false}
          tick={{ fill: "white" }}
          fontSize={12}
          fontWeight={300}
          // tickCount={10}
        />
        <YAxis
          dataKey="y"
          axisLine={false}
          tickLine={false}
          orientation="right"
          type="number"
          tickFormatter={(value) => (value === 0 ? "" : briefing(value))}
          // tickMargin={-10}
          fontSize={12}
          fontWeight={300}
          tick={{ fill: "white" }}
          allowDecimals={false}
        />

        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        <Tooltip content={WrapperTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DepthChart;
