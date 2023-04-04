import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createClient, goerli } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

interface Props {
  children: React.ReactNode;
}

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "ZLR2ae9uziqXiA-4OM8RB13sqjuMRVHy" }),
    infuraProvider({ apiKey: "40fc95ffa3e24163ab868f6f82e91969" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ithil dex",
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
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
