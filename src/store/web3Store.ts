import { orderType } from "types";
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
    id: "jkhjk46",
    time: 1679521057069,
    value: 28000,
    volume: 4,
  },
  {
    id: "jkhj78k",
    time: 1679521057950,
    value: 28800,
    volume: 2,
  },
  {
    id: "jkh6jk",
    time: 1679521059069,
    value: 27000,
    volume: 10,
  },
  {
    id: "jkh9jk",
    time: 1679521059969,
    value: 24000,
    volume: 1,
  },
  {
    id: "jk90hjk",
    time: 1679521060069,
    value: 28005,
    volume: 0.1,
  },
  {
    id: "j88khjk",
    time: 1679521060869,
    value: 29010,
    volume: 15,
  },
  {
    id: "j53khjk",
    time: 1679521061069,
    value: 28000,
    volume: 4,
  },
  {
    id: "jkgjhjk",
    time: 1679521061769,
    value: 29500,
    volume: 2.5,
  },
  {
    id: "jklkhjk",
    time: 1679521062069,
    value: 27000,
    volume: 1,
  },
  {
    id: "jkhj8jhk",
    time: 1679521063069,
    value: 24000,
    volume: 4,
  },
  {
    id: "jkhjkc9mm",
    time: 1679521063569,
    value: 25000,
    volume: 2,
  },
  {
    id: "jkhj09h4k",
    time: 1679521064069,
    value: 24900,
    volume: 1,
  },
  {
    id: "jkh678nhjk",
    time: 1679521064069,
    value: 24800,
    volume: 4,
  },
  {
    id: "jkh576bdrejk",
    time: 1679521064569,
    value: 26000,
    volume: 8,
  },
  {
    id: "jkhd67fswjk",
    time: 1679521065069,
    value: 27000,
    volume: 4,
  },
  {
    id: "jk14erc43jk",
    time: 1679521065569,
    value: 28000,
    volume: 4,
  },
  {
    id: "j587gvnkhjk",
    time: 1679521066069,
    value: 28500,
    volume: 1,
  },
  {
    id: "mk7hjkhjk",
    time: 1679521067000,
    value: 27000,
    volume: 8,
  },
  {
    id: "jkbgh6097hjk",
    time: 1679521067069,
    value: 25000,
    volume: 15,
  },
  {
    id: "jkhjjhkfrww2k",
    time: 1679521068069,
    value: 26000,
    volume: 4,
  },
  {
    id: "jkhjkui09lkmj",
    time: 1679521068969,
    value: 27000,
    volume: 4,
  },
  {
    id: "jkhjhju87bk",
    time: 1679521069069,
    value: 28000,
    volume: 5,
  },
  {
    id: "jkhhy876gcfejk",
    time: 1679521069569,
    value: 28050,
    volume: 1,
  },
  
];
