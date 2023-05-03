import { useEffect, useState } from "react";

export const useGetBlock = (event) => {
  const [block, setBlock] = useState<{ timestamp: any }>({
    timestamp: 0,
  });

  useEffect(() => {
    const fn = async () => {
      const block = await event.getBlock();
      setBlock(block);
    };

    fn();
  }, [event]);

  return block;
};
