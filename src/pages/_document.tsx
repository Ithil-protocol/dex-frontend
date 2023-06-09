import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import createEmotionCache from "@/styles/createEmotionCache";
import { MyAppProps } from "./_app";
import { useTheme } from "@mui/material";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  const theme = useTheme();

  return (
    <Html lang="en">
      <script
        dangerouslySetInnerHTML={{
          __html: "<!-- Developed by SPILA. All right reserved for ITHIL -->",
        }}
      />
      <Head>
        <title>WizarDex - by Ithil</title>
        <meta
          name="description"
          content="A fully on-chain feeless orderbook dex"
        />
        <meta property="og:title" content="WizarDex - by Ithil" />
        <meta property="og:site_name" content="WizarDex" />
        <meta property="og:url" content="https://dex.ithil.fi" />
        <meta
          property="og:description"
          content="A fully on-chain feeless orderbook dex"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
