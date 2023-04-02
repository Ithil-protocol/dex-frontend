import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MUIThemeProvider from "Providers/MUIThemeProvider";
import ReactQueryProvider from "Providers/ReactQueryProvider";
import Web3Provider from "Providers/Web3Provider";
import { AppProps } from "next/app";
import createEmotionCache from "styles/createEmotionCache";
import "styles/global.scss";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <ReactQueryProvider>
      <Web3Provider>
        <ReactQueryDevtools />
        <MUIThemeProvider emotionCache={emotionCache}>
          <Component {...pageProps} />
        </MUIThemeProvider>
      </Web3Provider>
    </ReactQueryProvider>
  );
}
