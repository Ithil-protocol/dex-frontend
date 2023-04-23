import { BigNumber, BigNumberish, Event, utils } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { usePoolGetOrder } from "./contracts/pool";

interface TokenBalanceProps {
  tokenAddress: `0x${string}` | undefined;
}

export const useTokenBalance = ({ tokenAddress }: TokenBalanceProps) => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    token: tokenAddress,
  });
  if (data) return Number(data.formatted);
  return 0;
};

export const useGetBlock = (event: Event) => {
  const [block, setBlock] = useState<{ timestamp: any }>({
    timestamp: 0,
  });

  useEffect(() => {
    const fn = async () => {
      const block = await event.getBlock();
      setBlock(block);
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return block;
};

type Status = "open" | "fulfilled" | "";
export const useGetOrderStatus = (
  address: `0x${string}`,
  price: BigNumber,
  index: BigNumber
) => {
  const { data } = usePoolGetOrder({
    address,
    args: [price, index],
  });

  let status: Status = "";
  if (data) {
    const amount = utils.formatUnits(data.underlyingAmount as BigNumberish, 18);
    status = +amount === 0 ? "fulfilled" : "open";
  }

  return status;
};
