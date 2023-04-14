import { ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import { contractABI } from "store/abi";
import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { usePoolCreateOrder } from "./contracts/pool";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import {
  usePrepareTokenApprove,
  useTokenAllowance,
  useTokenApprove,
} from "./contracts/token";

interface CreateOrderProps {
  amount: number | string;
  price: number | string;
  boost: number | string;
}

export const useCreateOrder = ({
  amount = 0,
  price = 0,
  boost = 0,
}: CreateOrderProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now() * 1000 + 120);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37",
    abi: contractABI,
    functionName: "createOrder",
    args: [
      ethers.utils.parseUnits(Number(amount).toString(), 18),
      ethers.utils.parseUnits(Number(price).toString(), 6),
      address as `0x${string}`,
      ethers.utils.parseUnits(time.toString(), 0),
    ],
    overrides: {
      value: ethers.utils.parseUnits(Number(boost).toString(), 18),
    },
    enabled: Number(amount) > 0 && Number(price) > 0,
  });

  const { data: writeData, write } = usePoolCreateOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: waitedData } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  useEffect(() => {
    if (waitedData) {
      toast.success(
        <p>
          Order created successfully.
          <br />
          <Link
            target="_blank"
            href={`https://goerli.etherscan.io/tx/${waitedData.transactionHash}`}
          >
            Check on Etherscan!
          </Link>
        </p>
      );
    }
  }, [waitedData]);

  return { waitedData, write };
};

interface AllowanceProps {
  x: string;
}
export const useAllowance = ({ x }: AllowanceProps) => {
  const { address } = useAccount();
  const tokenAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
  const contractAddress = "0x3ff417dACBA7F0bb7673F8c6B3eE68D483548e37";
  const { data: ttt } = useTokenAllowance({
    address: tokenAddress,
    args: [address as `0x${string}`, contractAddress],
    enabled: !!address,
  });
  const { config } = usePrepareTokenApprove({
    address: tokenAddress,
    args: [contractAddress, utils.parseUnits("999", 18)],
  });
  const { data, write } = useTokenApprove(config);
  const [isApproved, setIsApproved] = useState();
};
