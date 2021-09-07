import "modern-normalize/modern-normalize.css";

import "@styles/globals.css";
import { useRouterLoading } from "@utils/hooks/useRouterLoading";
import Header from "@components/Header/Header";
import Loading from "@components/Loading/Loading";
import Footer from "@components/Footer/Footer";

function MyApp({ Component, pageProps }) {
  const loading = useRouterLoading();
  return (
    <>
      <Header />
      {loading ? <Loading /> : <Component {...pageProps} />}
      <Footer />
    </>
  );
}

export default MyApp;
