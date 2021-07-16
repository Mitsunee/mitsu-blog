import "modern-normalize/modern-normalize.css";
import "@styles/globals.css"; // TODO global stylesheet
import "@styles/prism.css"; // TODO adjust to match site design
import { useRouterLoading } from "@utils/hooks/useRouterLoading";
import Header from "@components/Header";
import Loading from "@components/Loading";

/* TODO:
  - fonts (Exo 2 as sans, ??? as alt, Fira Code as monospace)
  - figure out a way to `rm -rf out .next` in prebuild script
  - write todo script
  - purgeCSS?
  - replace nextjs' error page with a redirect to the error page in external repo
*/

function MyApp({ Component, pageProps }) {
  const loading = useRouterLoading();
  return (
    <>
      <Header />
      {loading ? <Loading /> : <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
