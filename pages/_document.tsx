import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/assets/icons/icon.svg" type="image/svg+xml" />
          <link
            rel="apple-touch-icon"
            href="/assets/icons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Lexend:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
