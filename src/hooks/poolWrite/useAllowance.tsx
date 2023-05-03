import { utils } from "ethers";
import { useLayoutEffect, useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import {
  usePrepareTokenApprove,
  useTokenAllowance,
  useTokenApprove,
} from "@/hooks/contracts/token";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { Pool, Token } from "@/types";

interface AllowanceProps {
  amount: string | undefined;
  pool: Pool;
  token: Token;
}
export const useAllowance = ({ amount = "0", pool, token }: AllowanceProps) => {
  const [isApproved, setIsApproved] = useState(false);
  const { address } = useAccount();
  const { data: allowanceValue } = useTokenAllowance({
    address: token.address,
    args: [address as `0x${string}`, pool.address],
    enabled: !!address,
    watch: true,
  });
  // allowanceValue &&
  //   console.log(
  //     "allowance:",
  //     token.address,
  //     Number(utils.formatUnits(allowanceValue, token.decimals))
  //   );
  const currentAllowance = allowanceValue
    ? utils.formatUnits(allowanceValue, token.decimals)
    : "0";

  const needAllowance = Number(currentAllowance) < Number(amount);

  const { config } = usePrepareTokenApprove({
    address: token.address,
    args: [
      pool.address,
      utils.parseUnits(Number(amount).toFixed(token.decimals), token.decimals),
    ],
    overrides: {
      gasLimit: utils.parseUnits("200000", 0),
    },
    enabled: needAllowance,
    cacheTime: 0,
  });

  const {
    write,
    data: writeData,
    isLoading: writeLoading,
  } = useTokenApprove({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { isLoading: waitLoading } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Contract approved successfully."
          hash={data.transactionHash}
        />
      );
    },
  });
  useLayoutEffect(() => {
    if (needAllowance) {
      setIsApproved(false);
    } else {
      setIsApproved(true);
    }
  }, [needAllowance]);

  return {
    write,
    isApproved,
    isLoading: writeLoading || waitLoading,
    currentAllowance,
  };
};