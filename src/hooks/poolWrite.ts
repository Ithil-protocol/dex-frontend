import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractABI } from "store/abi";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { usePoolCreateOrder } from "./contracts/pool";

interface CreateOrderProps {
  amount: number | string;
  price: number | string;
}

export const useCreateOrder = ({ amount, price }: CreateOrderProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now() * 1000);
    }, 5000);

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
      ethers.utils.parseUnits(amount.toString(), 18),
      ethers.utils.parseUnits(price.toString(), 6),
      address as `0x${string}`,
      ethers.utils.parseUnits(time.toString(), 0),
    ],
  });

  const { data: writeData, write } = usePoolCreateOrder(config);

  const { data: waitedData } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  return { waitedData, write };
};
