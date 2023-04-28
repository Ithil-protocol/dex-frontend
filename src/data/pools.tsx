import ETH from "cryptocurrency-icons/svg/icon/eth.svg";
import USDC from "cryptocurrency-icons/svg/icon/usdc.svg";
import FAUCET from "cryptocurrency-icons/svg/icon/generic.svg";
import { Pair } from "types";
import rawPools from "./pools.json";

const icons = {
  WETH: <ETH />,
  FAUCET: <FAUCET />,
  USDC: <USDC />,
};

export const pairs: Pair[] = rawPools.map((item, index) => ({
  ...item,
  value: index,
  sell: {
    ...item.sell,
    underlying: {
      ...item.sell.underlying,
      icon: icons[item.underlyingLabel],
      address: item.sell.underlying.address as `0x${string}`,
    },
    accounting: {
      ...item.sell.accounting,
      icon: icons[item.accountingLabel],
      address: item.sell.accounting.address as `0x${string}`,
    },
    address: item.sell.address as `0x${string}`,
  },
  buy: {
    ...item.buy,
    underlying: {
      ...item.buy.underlying,
      icon: icons[item.accountingLabel],
      address: item.buy.underlying.address as `0x${string}`,
    },
    accounting: {
      ...item.buy.accounting,
      icon: icons[item.underlyingLabel],
      address: item.buy.accounting.address as `0x${string}`,
    },
    address: item.buy.address as `0x${string}`,
  },
}));
