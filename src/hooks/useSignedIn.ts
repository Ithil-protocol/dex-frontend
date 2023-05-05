import { useAccount } from "wagmi";

export const useSignedIn = () => {
  const { isConnected } = useAccount();
  return isConnected;
};
