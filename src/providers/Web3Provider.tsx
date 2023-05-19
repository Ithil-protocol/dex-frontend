import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { network } from "@/config/network";
import { allProviders } from "@/config/providers";
import { QueryClient } from "@tanstack/react-query";
import { reactQueryConfig } from "./ReactQueryProvider";

interface Props {
  children: React.ReactNode;
}

const { chains, provider, webSocketProvider } = configureChains(
  [network],
  allProviders
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
  queryClient: new QueryClient(reactQueryConfig),
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
