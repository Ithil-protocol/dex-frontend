import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createClient, sepolia } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { network } from "@/config/network";

interface Props {
  children: React.ReactNode;
}

const { chains, provider, webSocketProvider } = configureChains(
  [network],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_INFURA_HTTP_ADDRESS as string,
        webSocket: process.env.NEXT_PUBLIC_INFURA_WSS_ADDRESS as string,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_ALCHEMY_HTTP_ADDRESS as string,
        webSocket: process.env.NEXT_PUBLIC_ALCHEMY_WSS_ADDRESS as string,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_BLOCKPI_HTTP_ADDRESS as string,
        webSocket: process.env.NEXT_PUBLIC_BLOCKPI_WSS_ADDRESS as string,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "wizardex",
  chains,
});

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors,
});

const Web3Provider: React.FC<Props> = ({ children }) => {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
