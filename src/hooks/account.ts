import { useAccount, useBalance } from "wagmi";

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
