import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import * as React from "react";
import createEmotionCache from "styles/createEmotionCache";
import "styles/global.scss";
import theme from "styles/theme";
import {
  configureChains,
  createClient,
  goerli,
  WagmiConfig,
  useQueryClient,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
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

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        {/* <ReactQueryDevtools /> */}
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
