import { Order } from "types";
import { computeOrders } from "utility";
import { useContractRead } from "wagmi";
import { contractABI } from "./abi";
const abi = "";
const address: `0x${string}` = "0xjkhj";

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

export const buyOrders: Order[] = [
  {
    id: "jkhjk46",
    time: 1679521057069,
    value: 28000,
    volume: 4,
    type: "taker",
  },
  {
    id: "jkhj78k",
    time: 1679521057950,
    value: 28800,
    volume: 2,
    type: "maker",
  },
  {
    id: "jkh6jk",
    time: 1679521059069,
    value: 27000,
    volume: 10,
    type: "taker",
  },
  {
    id: "jkh9jk",
    time: 1679521059969,
    value: 24000,
    volume: 1,
    type: "taker",
  },
  {
    id: "jk90hjk",
    time: 1679521060069,
    value: 28005,
    volume: 0.1,
    type: "taker",
  },
  {
    id: "j88khjk",
    time: 1679521060869,
    value: 29010,
    volume: 15,
    type: "taker",
  },
  {
    id: "j53khjk",
    time: 1679521061069,
    value: 28000,
    volume: 4,
    type: "taker",
  },
  {
    id: "jkgjhjk",
    time: 1679521061769,
    value: 29500,
    volume: 2.5,
    type: "maker",
  },
  {
    id: "jklkhjk",
    time: 1679521062069,
    value: 27000,
    volume: 1,
    type: "maker",
  },
  {
    id: "jkhj8jhk",
    time: 1679521063069,
    value: 24000,
    volume: 4,
    type: "maker",
  },
  {
    id: "jkhjkc9mm",
    time: 1679521063569,
    value: 25000,
    volume: 2,
    type: "taker",
  },
  {
    id: "jkhj09h4k",
    time: 1679521064069,
    value: 24900,
    volume: 1,
    type: "taker",
  },
  {
    id: "jkh678nhjk",
    time: 1679521064069,
    value: 24800,
    volume: 4,
    type: "taker",
  },
  {
    id: "jkh576bdrejk",
    time: 1679521064569,
    value: 26000,
    volume: 8,
    type: "taker",
  },
  {
    id: "jkhd67fswjk",
    time: 1679521065069,
    value: 27000,
    volume: 4,
    type: "taker",
  },
  {
    id: "jk14erc43jk",
    time: 1679521065569,
    value: 28000,
    volume: 4,
    type: "taker",
  },
  {
    id: "j587gvnkhjk",
    time: 1679521066069,
    value: 28500,
    volume: 1,
    type: "maker",
  },
  {
    id: "mk7hjkhjk",
    time: 1679521067000,
    value: 27000,
    volume: 8,
    type: "taker",
  },
  {
    id: "jkbgh6097hjk",
    time: 1679521067069,
    value: 25000,
    volume: 15,
    type: "maker",
  },
  {
    id: "jkhjjhkfrww2k",
    time: 1679521068069,
    value: 26000,
    volume: 4,
    type: "taker",
  },
  {
    id: "jkhjkui09lkmj",
    time: 1679521068969,
    value: 27000,
    volume: 4,
    type: "maker",
  },
  {
    id: "jkhjhju87bk",
    time: 1679521069069,
    value: 28000,
    volume: 5,
    type: "taker",
  },
  {
    id: "jkhhy876gcfejk",
    time: 1679521069569,
    value: 28050,
    volume: 1,
    type: "taker",
  },
];

export const computedOrders = computeOrders(buyOrders);
