import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { network } from "./network.ts";
import { ChainProviderFn } from "wagmi";

const blockpiBaseHttpUrl = "https://ethereum-sepolia.blockpi.network/v1/rpc/";
const blockpiBaseWssUrl = "wss://ethereum-sepolia.blockpi.network/v1/ws/";

export const allProviders: ChainProviderFn<typeof network>[] = [
  jsonRpcProvider({
    rpc: () => ({
      http:
        network.rpcUrls.alchemy.http +
        "/" +
        process.env.NEXT_PUBLIC_ALCHEMY_ID!,
      webSocket:
        network.rpcUrls.alchemy.webSocket +
        "/" +
        process.env.NEXT_PUBLIC_ALCHEMY_ID!,
    }),
  }),
  jsonRpcProvider({
    rpc: () => ({
      http:
        network.rpcUrls.infura.http + "/" + process.env.NEXT_PUBLIC_INFURA_ID!,
      webSocket:
        network.rpcUrls.infura.webSocket +
        "/" +
        process.env.NEXT_PUBLIC_INFURA_ID!,
    }),
  }),
  jsonRpcProvider({
    rpc: () => ({
      http: blockpiBaseHttpUrl + process.env.NEXT_PUBLIC_BLOCKPI_ID!,
      webSocket: blockpiBaseWssUrl + process.env.NEXT_PUBLIC_BLOCKPI_ID!,
    }),
  }),
];
