import { readFileJson } from "@foxkit/node-util/fs";

//import styles from "styles/Home.module.css";
import { Meta } from "lib/Meta";
import { Hero } from "lib/Hero";
import { Section } from "lib/Section";
import { Headline } from "lib/Headline";
import { AutoLink } from "lib/AutoLink";

type PagePropsPost = PostMeta & { tags: string[] };
interface PageProps {
  tags: TagMap;
  posts: PagePropsPost[];
}

const description = "Guides and Rants about Linux, Tech, Coding and Games";

export default function Home({ tags, posts }: PageProps) {
  return (
    <>
      <Meta title={`Home | Mitsunee | Blog`} description={description} />
      <Hero description={description} />
      <Section>
        <p style={{ textAlign: "center", fontSize: "2em" }}>
          This website is currently in development
        </p>
        <Headline>Debug</Headline>
        <p>
          <AutoLink href="/post/test">Test post</AutoLink>
        </p>
        <pre>
          <code>{JSON.stringify({ tags, posts }, null, 2)}</code>
        </pre>
      </Section>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const staticData = await readFileJson<PageProps>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  // include newest 6 posts
  const posts = staticData.posts.slice(0, 6);

  // map tag slugs in posts
  const tagsSeen = new Set(posts.flatMap(post => post.tags));
  const tags = Object.fromEntries(
    Array.from(tagsSeen.values()).map(key => [key, staticData.tags[key]])
  );

  return { props: { posts, tags } };
}
