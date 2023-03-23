import 'styles/global.scss'
import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "styles/theme";
import createEmotionCache from "styles/createEmotionCache";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [
    // eslint-disable-next-line @cspell/spellchecker
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
