import type { AppProps } from "next/app";
import "styles/app.css";
import { Layout } from "lib/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
