import Head from "next/head";
import Meta from "../components/Meta";
//import Image from 'next/image'

const Index = () => {
  return (
    <>
      <Head>
        <Meta
          title={"Mitsunee"}
          description={
            "Nonbinary | Weeb | Linux user | Frontend Dev | Music-Addict | rants too much"
          }
          image={"assets/avi_small.jpg"}
        />
      </Head>
      <main>
        <h1>Hello, world!</h1>
      </main>
    </>
  );
};

export default Index;
