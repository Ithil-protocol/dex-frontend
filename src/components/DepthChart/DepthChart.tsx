import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';

const sell = [
    {
        "value": 26000,
        "volume": 2,
    },
    {
        "value": 18000,
        "volume": 1,
    },
    {
        "value": 23000,
        "volume": 1,
    },
    {
        "value": 15000,
        "volume": 2,
    },
    {
        "value": 26000,
        "volume": 1,
    },
]

const buy = [
    {
        "value": 26000,
        "volume": 1,
    },
    {
        "value": 15000,
        "volume": 4,
    },
    {
        "value": 23000,
        "volume": 3,
    },
    {
        "value": 17000,
        "volume": 5,
    },
    {
        "value": 14000,
        "volume": 3,
    },
]

const data = [
    ...sell.map(item => ({
        x: item.value,
        xSell: item.value,
        y: item.value * item.volume
    })),
    ...buy.map(item => ({
        x: item.value,
        xBuy: item.value,
        y: item.value * item.volume
    }))
]

const DepthChart = () => {
    // return(
    //     <pre>{JSON.stringify(data,null,2)}</pre>
    // )
    return (
        <ResponsiveContainer width='100%' height={250}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="red" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="step" dataKey="xSell" stroke="red" fillOpacity={1} fill="url(#colorUv)" isAnimationActive={false} />
                <Area type="step" dataKey="xBuy" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" isAnimationActive={false} />
                <XAxis dataKey="x" />
                <YAxis dataKey="y" axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={.2} />
                <Tooltip />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default DepthChart