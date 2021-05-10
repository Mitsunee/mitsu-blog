import Head from "next/head";
import Meta from "../components/Meta";
import { stylesheet, css } from "astroturf";
//import Image from 'next/image'

// TEMP test astroturf-loader
const styles = stylesheet`
  .header {
    width: max-content;
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: rotate(-10deg);
    }
  }
`;

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
        <h1 className={styles.header}>Hello, world!</h1>
        <p
          // TEMP test astroturf css prop
          css={css`
            color: accent;
            &:hover {
              text-decoration: underline;
            }
          `}>
          I should be using the accent color via astroturf&#39;s css prop
        </p>
      </main>
    </>
  );
};

export default Index;
