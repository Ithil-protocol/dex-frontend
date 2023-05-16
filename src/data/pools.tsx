import { Address0x, Pair } from "@/types";
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
      address: item.sell.underlying.address as Address0x,
    },
    accounting: {
      ...item.sell.accounting,
      icon: getIcon(item.accountingLabel),
      address: item.sell.accounting.address as Address0x,
    },
    address: item.sell.address as Address0x,
  },
  buy: {
    ...item.buy,
    underlying: {
      ...item.buy.underlying,
      icon: getIcon(item.accountingLabel),
      address: item.buy.underlying.address as Address0x,
    },
    accounting: {
      ...item.buy.accounting,
      icon: getIcon(item.underlyingLabel),
      address: item.buy.accounting.address as Address0x,
    },
    address: item.buy.address as Address0x,
  },
}));
