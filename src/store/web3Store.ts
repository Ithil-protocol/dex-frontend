import { orderType } from "./../types/allType";
import { contractABI } from "./abi";
import { useContractRead } from "wagmi";
const abi = "";
const address: `0x${string}` = "0xjkhj";
console.log(abi,address);

// export const getLatestTrade = () => {};
// export const getBuyOrders = () => {};

// export const getSellOrders = () => {};
// export const getPriceOrders = () => {
//   let latest, highest, lowest;
// };
// export const getOpenOrders = () => {};
// export const getOrderHistory = () => {};
// export const cleanDataForDepthChart = () => {};
// export const submitMakerBuyOrder = () => {};
// export const submitMakerSellOrder = () => {};
// export const submitFulfillOrder = () => {};

export const useCustomContractRead = () => {
  const { data } = useContractRead({
    abi: contractABI,
    address,
    functionName: "previewOrder",
  });
};

export const buyOrders: orderType[] = [
  {
    id: "jkhjk",
    time: 1679521057069,
    value: 28000,
    volume: 4,
  },
];
