import { format } from "date-fns";
import { Order, OrderObj } from "@/types";
import { fixPrecision } from "./converters";

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

export const briefing = (number: number, precision: number) => {
  if (number > 999 && number < 1000000) {
    return fixPrecision(number / 1000, precision) + "K";
  } else if (number > 1000000) {
    return fixPrecision(number / 1000000, precision) + "M";
  } else if (number > 1000000000) {
    return fixPrecision(number / 1000000, precision) + "B";
  } else {
    return number.toString();
  }
};

export const formatBigNumber = (value: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "standard",
    maximumFractionDigits: 3,
  }).format(value);
};

export function truncate(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function shuffleArray<T>(array: T[]) {
  const copyArray = [...array];

  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copyArray[i];
    copyArray[i] = copyArray[j];
    copyArray[j] = temp;
  }
  return copyArray;
}

export const formatDateToTime = (date: number) => {
  return format(new Date(date), "HH:mm:ss");
};

export const formatDateToFullDate = (date: number) => {
  return format(new Date(date), "HH:mm:ss dd/MM/yy");
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
