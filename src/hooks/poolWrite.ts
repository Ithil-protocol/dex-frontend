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

  const { data: writeData, write } = usePoolCreateOrder(config);

  const { data: waitedData } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  return { waitedData, write };
};
