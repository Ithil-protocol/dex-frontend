import { BigNumber, BigNumberish, Event, utils } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { usePoolOrders } from "./contracts/pool";

interface TokenBalanceProps {
  tokenAddress: `0x${string}` | undefined;
}

export const useTokenBalance = ({ tokenAddress }: TokenBalanceProps) => {
  const { address } = useAccount();
  return useBalance({
    address,
    token: tokenAddress,
  });
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
