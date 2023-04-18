import DAI from "cryptocurrency-icons/svg/icon/dai.svg";
import ETH from "cryptocurrency-icons/svg/icon/eth.svg";
import USDC from "cryptocurrency-icons/svg/icon/usdc.svg";
import WBTC from "cryptocurrency-icons/svg/icon/wbtc.svg";
import { Pair } from "types";
import rawPools from "./pools.json";

const poolsIcons = [
  {
    sell: {
      underlying: {
        icon: <ETH />,
      },
      accounting: {
        icon: <USDC />,
      },
    },
    buy: {
      underlying: {
        icon: <USDC />,
      },
      accounting: {
        icon: <ETH />,
      },
    },
  },
  {
    sell: {
      underlying: {
        icon: <DAI />,
      },
      accounting: {
        icon: <WBTC />,
      },
    },
    buy: {
      underlying: {
        icon: <WBTC />,
      },
      accounting: {
        icon: <DAI />,
      },
    },
  },
];

export const pairs: Pair[] = rawPools.map((item, index) => ({
  ...item,
  value: index,
  sell: {
    ...item.sell,
    underlying: {
      ...item.sell.underlying,
      ...poolsIcons[index].sell.underlying,
      address: item.sell.underlying.address as `0x${string}`,
    },
    accounting: {
      ...item.sell.accounting,
      ...poolsIcons[index].sell.accounting,
      address: item.sell.accounting.address as `0x${string}`,
    },
    address: item.sell.address as `0x${string}`,
  },
  buy: {
    ...item.buy,
    underlying: {
      ...item.buy.underlying,
      ...poolsIcons[index].buy.underlying,
      address: item.buy.underlying.address as `0x${string}`,
    },
    accounting: {
      ...item.buy.accounting,
      ...poolsIcons[index].buy.accounting,
      address: item.buy.accounting.address as `0x${string}`,
    },
    address: item.buy.address as `0x${string}`,
  },
}));
