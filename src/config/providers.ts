import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { network } from "./network.ts";
import { ChainProviderFn } from "wagmi";

const blockpiBaseUrl = "://ethereum-sepolia.blockpi.network/v1/rpc/";

export const allProviders: ChainProviderFn<typeof network>[] = [
  // jsonRpcProvider({
  //   rpc: () => ({
  //     http: network.rpcUrls.alchemy.http + "/" + process.env.NEXT_PUBLIC_ALCHEMY_ID!,
  //     webSocket: network.rpcUrls.alchemy.webSocket + "/" + process.env.NEXT_PUBLIC_ALCHEMY_ID!,
  //   }),
  // }),
  // jsonRpcProvider({
  //   rpc: () => ({
  //     http: network.rpcUrls.infura.http + "/" + process.env.NEXT_PUBLIC_INFURA_ID!,
  //     webSocket: network.rpcUrls.infura.webSocket + "/" + process.env.NEXT_PUBLIC_INFURA_ID!,
  //   }),
  // }),
  jsonRpcProvider({
    rpc: () => ({
      http: "https" + blockpiBaseUrl + process.env.NEXT_PUBLIC_BLOCKPI_ID!,
      webSocket: "wss" + blockpiBaseUrl + process.env.NEXT_PUBLIC_BLOCKPI_ID!,
    }),
  }),
];
