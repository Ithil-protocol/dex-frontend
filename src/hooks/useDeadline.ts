import { useEffect, useState } from "react";

export const useDeadline = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Math.round(Date.now() / 1000) + 120);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return time;
};
