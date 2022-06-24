import "styles/app.css";
import "styles/blog.css";
import { Layout } from "lib/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
