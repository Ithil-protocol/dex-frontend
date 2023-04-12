import DAI from "cryptocurrency-icons/svg/icon/dai.svg";
import ETH from "cryptocurrency-icons/svg/icon/eth.svg";
import USDC from "cryptocurrency-icons/svg/icon/usdc.svg";
import WBTC from "cryptocurrency-icons/svg/icon/wbtc.svg";
import { Pool } from "types";
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

export const pools: Pool[] = rawPools.map((item, index) => ({
  ...item,
  sell: {
    ...item.sell,
    underlying: {
      ...item.sell.underlying,
      ...poolsIcons[index].sell.underlying,
    },
    accounting: {
      ...item.sell.accounting,
      ...poolsIcons[index].sell.accounting,
    },
  },
  buy: {
    ...item.buy,
    underlying: {
      ...item.buy.underlying,
      ...poolsIcons[index].buy.underlying,
    },
    accounting: {
      ...item.buy.accounting,
      ...poolsIcons[index].buy.accounting,
    },
  },
}));
