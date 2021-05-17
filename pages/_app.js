import "modern-normalize/modern-normalize.css";
import "@styles/globals.css"; // TODO global stylesheet
import "@styles/prism.css"; // TODO adjust to match site design
import { useRouterLoading } from "@lib/hooks/useRouterLoading";

/* TODO:
  - fonts (Exo 2 as sans, ??? as alt, Fira Code as monospace)
  - figure out a way to `rm -rf out .next` in prebuild script
  - write todo script
  - purgeCSS?
  - replace nextjs' error page with a redirect to the error page in external repo
*/

function MyApp({ Component, pageProps }) {
  const loading = useRouterLoading();
  const Loading = () => <>LOADING</>; // PLACEHOLDER loading component goes here
  return loading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
