import { readFileJson } from "@foxkit/node-util/fs";

import Image from "next/image";
import styles from "styles/Home.module.css";
import { Meta } from "lib/Meta";
import { Section } from "lib/Section";
import { Headline } from "lib/Headline";
import { AutoLink } from "lib/AutoLink";

export default function Home({ tags, posts }) {
  return (
    <div className={styles.container}>
      <Meta />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to a <a href="https://nextjs.org">Next.js</a> Template :)
        </h1>

        <Section>
          <p className={styles.description}>
            This website is currently in development
          </p>
          <p className={styles.description}>
            <AutoLink href="/post/test">Test post</AutoLink>
          </p>
          <Headline>Debug</Headline>
          <pre>
            <code>{JSON.stringify({ tags, posts }, null, 2)}</code>
          </pre>
        </Section>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}>
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.mitsunee.com">
          &copy; 2022{" "}
          <span className={styles.logo}>
            <Image
              src="/assets/logo.svg"
              alt="Mitsunee Logo"
              width={60}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  // PLACEHOLDER: temporarily output everything here until api route is done
  const props = await readFileJson("posts.json");
  return { props };
}
