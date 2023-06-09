import { BigNumber } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCancelOrder,
  usePreparePoolCancelOrder,
} from "@/hooks/contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { Address0x, Pool } from "@/types";
import { usePoolStore } from "@/store";
import { useChangeOrderStatus } from "../utils/useChangeOrderStatus";
import { useUniqueToast } from "../useUniqueToast";

interface CancelOrderProps {
  transactionHash: string;
  index: BigNumber;
  pool: Pool;
  price: BigNumber;
}

export const useCancelOrder = ({
  transactionHash,
  index,
  pool,
  price,
}: CancelOrderProps) => {
  const isUniqueToast = useUniqueToast();
  const { address } = useAccount();
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const { config } = usePreparePoolCancelOrder({
    address: pool.address,
    args: [index, price],
    cacheTime: 0,
  });

  const changeOrderStatus = useChangeOrderStatus(
    address as Address0x,
    poolAddress,
    transactionHash
  );

  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message, { toastId: error.name });
    },
    onSuccess: () => changeOrderStatus("canceling"),
  });

  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      if (isUniqueToast(data.transactionHash)) {
        toast.success(
          <TransactionToast
            text="Order canceled successfully."
            hash={data.transactionHash}
          />
        );
      }
    },
    onError: () => changeOrderStatus("error"),
  });
  return { cancel };
};
