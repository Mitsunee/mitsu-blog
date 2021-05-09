import "modern-normalize/modern-normalize.css";
import "../styles/globals.css"; // TODO global stylesheet

/* TODO:
  - figure out a way to `rm -rf out .next` in prebuild script
  - add markdown tooling
  - write todo script
*/

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
