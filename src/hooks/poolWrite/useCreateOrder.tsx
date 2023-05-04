import { utils, BigNumber, constants, providers } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCreateOrder,
  usePreparePoolCreateOrder,
} from "@/hooks/contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { Pool, Side } from "@/types";
import { useDeadline } from "@/hooks/useDeadline";
import { useRef } from "react";
import { useChangeOrderStatus } from "@/hooks/utils/useChangeOrderStatus";
import { useCreatePendingOrder } from "@/hooks/utils/useCreatePendingOrder";

interface CreateOrderProps {
  amount: BigNumber;
  boost: BigNumber;
  pool: Pool;
  price: BigNumber;
  side: Side;
}

export const useCreateOrder = ({
  amount,
  boost,
  pool,
  price,
  side,
}: CreateOrderProps) => {
  const time = useDeadline();
  const transactionHash = useRef("");
  const { address } = useAccount();

  const { config, isLoading: gasLoading } = usePreparePoolCreateOrder({
    address: pool.address,
    args: [
      amount,
      price,
      address as `0x${string}`,
      utils.parseUnits(time.toString(), 0),
    ],
    overrides: {
      value: boost,
    },
    enabled: !amount.isZero() && !price.isZero() && !!address,
    onError: (_error) => {
      // toast.error(error.message.substring(0, 200));
    },
    // onSuccess(...args) {},
  });

  const createPendingOrder = useCreatePendingOrder({
    price,
    amount,
    boost,
    address: address as string,
    side,
  });
  const changeOrderStatus = useChangeOrderStatus(
    address as string,
    pool.address,
    transactionHash.current
  );

  const {
    data: writeData,
    write,
    isLoading: writeLoading,
    reset: resetCreate,
  } = usePoolCreateOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (...args) => {
      transactionHash.current = args[0].hash;
      createPendingOrder(transactionHash.current);
    },
  });

  const {
    data: waitedData,
    isLoading: waitLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order created successfully."
          hash={data.transactionHash}
        />
      );
    },
    onError: (error) => {
      toast.error(error.message);
      changeOrderStatus("error");
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
    resetCreate,
  };
};
