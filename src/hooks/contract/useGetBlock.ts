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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return block;
};
