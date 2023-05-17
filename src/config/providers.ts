import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { network } from "./network.ts";
import { ChainProviderFn } from "wagmi";

const blockpiBaseHttpUrl = "https://ethereum-sepolia.blockpi.network/v1/rpc/";
const blockpiBaseWssUrl = "wss://ethereum-sepolia.blockpi.network/v1/ws/";

export const allProviders: ChainProviderFn<typeof network>[] = [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
  infuraProvider({
    apiKey: process.env.NEXT_PUBLIC_INFURA_ID!,
  }),
  publicProvider(),
  jsonRpcProvider({
    rpc: () => ({
      http: blockpiBaseHttpUrl + process.env.NEXT_PUBLIC_BLOCKPI_ID!,
      webSocket: blockpiBaseWssUrl + process.env.NEXT_PUBLIC_BLOCKPI_ID!,
    }),
  }),
];
