import { BigNumberValue } from "@/types";
import { useAccount, useBalance } from "wagmi";

interface TokenBalanceProps {
  tokenAddress: BigNumberValue | undefined;
}

export const useTokenBalance = ({ tokenAddress }: TokenBalanceProps) => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    token: tokenAddress,
    watch: true,
  });
  if (data) return Number(data.formatted);
  return 0;
};
