import { stylesheet, css } from "astroturf";
import Link from "next/link";

import Meta from "@components/Meta";

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

export default function Index() {
  return (
    <>
      <Meta
        description={
          "Freelance Frontend Dev | Weeb | Linux user | Music-Addict | rants too much"
        }
        image={"assets/avi_small.jpg"}
        route={""}
      />
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
        <Link href="/blog">
          <a>Go to blog</a>
        </Link>
      </main>
    </>
  );
}
