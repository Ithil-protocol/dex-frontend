import { contractABI } from './abi';
import { useContractRead } from "wagmi";
let abi = "";
let address:`0x${string}`= "0xjkhj";

export const getLatestTrade = () => {

}
export const getBuyOrders = () => {

}

export const getSellOrders = () => {

}
export const getPriceOrders = () => {
    let latest,highest,lowest;

}
export const getOpenOrders = () => {

}
export const getOrderHistory = () => {

}
export const cleanDataForDepthChart = () => {

}
export const submitMakerBuyOrder = () => {

}
export const submitMakerSellOrder = () => {

}
export const submitFulfillOrder = () => {

}



const useCustomContractRead = () => {

    const {data} = useContractRead({
        abi:contractABI,
        address,
        functionName:"previewOrder"
    }) 

}