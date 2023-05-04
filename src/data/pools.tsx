import { Pair } from "@/types";
import rawPools from "./pools.json";
import { getIcon } from "@/utility";

export const pairs: Pair[] = rawPools.map((item, index) => ({
  ...item,
  value: index,
  sell: {
    ...item.sell,
    underlying: {
      ...item.sell.underlying,
      icon: getIcon(item.underlyingLabel),
      address: item.sell.underlying.address as `0x${string}`,
    },
    accounting: {
      ...item.sell.accounting,
      icon: getIcon(item.accountingLabel),
      address: item.sell.accounting.address as `0x${string}`,
    },
    address: item.sell.address as `0x${string}`,
  },
  buy: {
    ...item.buy,
    underlying: {
      ...item.buy.underlying,
      icon: getIcon(item.accountingLabel),
      address: item.buy.underlying.address as `0x${string}`,
    },
    accounting: {
      ...item.buy.accounting,
      icon: getIcon(item.underlyingLabel),
      address: item.buy.accounting.address as `0x${string}`,
    },
    address: item.buy.address as `0x${string}`,
  },
}));
