import { constants, utils } from "ethers";
import { useLayoutEffect, useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import {
  usePrepareTokenApprove,
  useTokenAllowance,
  useTokenApprove,
} from "@/hooks/contracts/token";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { Address0x, Pool, Token } from "@/types";
import { fixPrecision } from "@/utility/converters";

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
    args: [address as Address0x, pool.address],
    enabled: !!address,
    watch: true,
  });

  const currentAllowance = allowanceValue
    ? Number(utils.formatUnits(allowanceValue, token.decimals))
    : 0;

  const needAllowance = currentAllowance < Number(amount);

  const { config } = usePrepareTokenApprove({
    address: token.address,
    args: [pool.address, constants.MaxUint256],
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
    currentAllowance: fixPrecision(currentAllowance, token.displayPrecision),
  };
};
