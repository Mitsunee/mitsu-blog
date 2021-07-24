import "modern-normalize/modern-normalize.css";
import "@styles/globals.css";
import "@styles/syntax.css";
import { useRouterLoading } from "@utils/hooks/useRouterLoading";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Footer from "@components/Footer";

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
