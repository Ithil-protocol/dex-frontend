import { utils, BigNumber, constants, providers } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolFulfillOrder,
  usePreparePoolFulfillOrder,
} from "@/hooks/contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { BigNumberValue, Pool } from "@/types";
import { useDeadline } from "@/hooks/useDeadline";

interface FulfillOrderProps {
  amount: BigNumber;
  minReceived: BigNumber;
  maxPaid: BigNumber;
  pool: Pool;
}

export const useFulfillOrder = ({
  amount,
  minReceived,
  maxPaid,
  pool,
}: FulfillOrderProps) => {
  const time = useDeadline();

  const { address } = useAccount();

  const { config, isLoading: gasLoading } = usePreparePoolFulfillOrder({
    address: pool.address,
    args: [
      amount,
      address as BigNumberValue,
      minReceived,
      maxPaid,
      utils.parseUnits(time.toString(), 0),
    ],
    enabled: !!address && !amount.isZero(),
  });

  const {
    data: writeData,
    write,
    isLoading: writeLoading,
    isError,
    isSuccess,
    reset: resetFulfill,
  } = usePoolFulfillOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: waitedData, isLoading: waitLoading } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order fulfilled successfully."
          hash={data.transactionHash}
        />
      );
    },
  });

  return {
    waitedData: {
      ...waitedData,
      transactionHash: writeData?.hash ?? constants.HashZero,
    } as providers.TransactionReceipt,
    waitedError: isError,
    waitedSuccess: isSuccess,
    write,
    isLoading: writeLoading || waitLoading,
    gasLoading,
    resetFulfill,
  };
};
