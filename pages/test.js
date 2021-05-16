import Head from "next/head";
import Meta from "@components/Meta";

export default function Test() {
  return (
    <>
      <Head>
        <Meta route={"test"} />
      </Head>
      <h1>TEST</h1>
    </>
  );
}
