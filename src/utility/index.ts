import { OrderObj, Order } from "types";

export const convertOrdersArrayToUniqueObj = (orders: Order[]) => {
  const obj: OrderObj = {};
  orders.forEach((item) => {
    if (obj[item.value]) {
      obj[item.value].volume += item.volume;
    } else {
      obj[item.value] = item;
    }
  });
  return obj;
};

export const sortOrderObj = (orderObj: OrderObj) => {
  return Object.keys(orderObj)
    .sort((a, b) => +b - +a)
    .map((key) => orderObj[key]);
};

export const computeOrders = (orders: Order[]) => {
  const uniqueObj = convertOrdersArrayToUniqueObj(orders);
  return sortOrderObj(uniqueObj);
};
