import { BigNumber } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCancelOrder,
  usePreparePoolCancelOrder,
} from "../contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "components/Common/Toast/TransactionToast";
import { Pool } from "types";
import { usePoolStore } from "store";
import { useChangeOrderStatus } from "./useChangeOrderStatus";

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
  const { address } = useAccount();
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const { config } = usePreparePoolCancelOrder({
    address: pool.address as `0x${string}`,
    args: [index as BigNumber, price],
  });

  const changeOrderStatus = useChangeOrderStatus(
    address as string,
    poolAddress,
    transactionHash
  );

  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => changeOrderStatus("canceling"),
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
    onError: () => changeOrderStatus("error"),
  });
  return { cancel };
};
