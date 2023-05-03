import { EmotionCache } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MUIThemeProvider from "@/Providers/MUIThemeProvider";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import Web3Provider from "@/Providers/Web3Provider";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import createEmotionCache from "@/styles/createEmotionCache";
import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <ReactQueryProvider>
      <Web3Provider>
        <ReactQueryDevtools />
        <MUIThemeProvider emotionCache={emotionCache}>
          <ToastContainer position="bottom-left" autoClose={false} />
          <Component {...pageProps} />
        </MUIThemeProvider>
      </Web3Provider>
    </ReactQueryProvider>
  );
}
