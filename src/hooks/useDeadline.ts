import { CREATE_ORDER_DEADLINE } from "@/config/constants";
import { useEffect, useState } from "react";

export const useDeadline = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Math.round(Date.now() / 1000) + CREATE_ORDER_DEADLINE);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return time;
};
