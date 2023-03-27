import { format } from "date-fns";
import { Order, OrderObj } from "types";

// export const addOrderToOrderObj = (order: Order, orderObj: OrderObj) => {
//   if(orderObj[])
// };

export const convertOrdersArrayToUniqueObj = (orders: Order[]) => {
  const obj: OrderObj = {};
  orders.forEach((item) => {
    if (obj[item.value]) {
      obj[item.value].volume += +item.volume;
    } else {
      obj[item.value] = item;
    }
  });
  return obj;
};

export const sortOrderObj = (orderObj: OrderObj) => {
  return Object.keys(orderObj)
    .sort((a, b) => +a - +b)
    .map((key) => orderObj[key]);
};

export const computeOrders = (orders: Order[]) => {
  const uniqueObj = convertOrdersArrayToUniqueObj(orders);
  return sortOrderObj(uniqueObj);
};

export const briefing = (number: number) => {
  if (number > 999 && number < 1000000) {
    return (number / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else if (number > 1000000000) {
    return (number / 1000000).toFixed(0) + "B"; // convert to M for number from > 1 million
  } else {
    return number.toString(); // if value < 1000, nothing to do
  }
};

export const formatDate = (date: number) => {
  // const isoDate = new Date(date).toISOString();
  return format(new Date(date), "KK:mm:ss");
};
