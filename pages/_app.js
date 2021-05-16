import "modern-normalize/modern-normalize.css";
import "@styles/globals.css"; // TODO global stylesheet
import "@styles/prism.css"; // TODO adjust to match site design

/* TODO:
  - fonts (Exo 2 as sans, ??? as alt, Fira Code as monospace)
  - figure out a way to `rm -rf out .next` in prebuild script
  - write todo script
  - purgeCSS?
  - replace nextjs' error page with a redirect to the error page in external repo
*/

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
