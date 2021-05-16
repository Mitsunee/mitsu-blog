import Head from "next/head";
import Meta from "@components/Meta";
import TestComponent from "@components/test/test";
import { stylesheet, css } from "astroturf";
import Link from "next/link";

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
            "Freelance Frontend Dev | Weeb | Linux user | Music-Addict | rants too much"
          }
          image={"assets/avi_small.jpg"}
          route={""}
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
        <TestComponent />
        <Link href="/test">
          <a>Go to test</a>
        </Link>
      </main>
    </>
  );
};

export default Index;
