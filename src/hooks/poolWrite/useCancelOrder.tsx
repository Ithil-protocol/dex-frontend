import { BigNumber } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCancelOrder,
  usePreparePoolCancelOrder,
} from "../contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "components/Common/Toast/TransactionToast";
import { HistoryEvent, Pool } from "types";
import { useQueryClient } from "@tanstack/react-query";
import { usePoolStore } from "store";

interface CancelOrderProps {
  hash: string;
  index: BigNumber;
  pool: Pool;
  price: BigNumber;
}

export const useCancelOrder = ({
  hash,
  index,
  pool,
  price,
}: CancelOrderProps) => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const { config } = usePreparePoolCancelOrder({
    address: pool.address as `0x${string}`,
    args: [index as BigNumber, price],
  });

  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess() {
      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCreatedEvent", address, poolAddress],
        (prev) => {
          if (!prev) return;

          const index = prev.findIndex((i) => i.transactionHash === hash);

          if (index > -1) {
            const order = { ...prev[index] };
            const copyOrders = [...prev];
            copyOrders.splice(index, 1, {
              ...order,
              status: "canceling",
            });
            return copyOrders;
          }

          return prev;
        }
      );
    },
  });

  // const { data: waitedData } =
  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order canceled successfully."
          hash={data.transactionHash}
        />
      );
    },
    onError() {
      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCreatedEvent", address, poolAddress],
        (prev) => {
          if (!prev) return;

          const index = prev.findIndex((i) => i.transactionHash === hash);

          if (index > -1) {
            const copyOrders = [...prev];
            copyOrders.splice(index, 1);
            return copyOrders;
          }

          return prev;
        }
      );
    },
  });
  return { cancel };
};
