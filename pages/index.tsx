import { readFileJson } from "@foxkit/node-util/fs";
import showMoreIconUrl from "iconoir/icons/report-columns.svg";

//import styles from "styles/Home.module.css";
import { Meta } from "lib/Meta";
import { Hero } from "lib/Hero";
import { PostCard, PostCardList } from "lib/PostCard";
import { Section } from "lib/Section";
import { ActionButton, LinkButton } from "lib/Button";

const PAGE_SIZE = 10;
const description = "Guides and Rants about Linux, Tech, Coding and Games";

export default function Home({ tags, posts }: StaticData) {
  return (
    <>
      <Meta title={`Home | Mitsunee | Blog`} description={description} />
      <Hero description={description} />
      <Section>
        <p style={{ textAlign: "center", fontSize: "2em" }}>
          This website is currently in development
        </p>
        <h2>Button Test</h2>
        <p>
          <ActionButton>Text</ActionButton>
          <ActionButton
            icon="/assets/icons/icon.svg"
            title="Mitsu"></ActionButton>
          <ActionButton icon="/assets/icons/icon.svg" title="Mitsu">
            Mitsu
          </ActionButton>
          <ActionButton
            icon="/assets/icons/steam.svg"
            title="Steam"
            mode="mask"></ActionButton>
          <ActionButton
            icon="/assets/icons/steam.svg"
            title="Steam"
            mode="mask">
            Steam
          </ActionButton>
          <LinkButton
            href="/"
            icon="/assets/icons/steam.svg"
            title="Steam"
            mode="mask">
            Steam
          </LinkButton>
        </p>
      </Section>
      <PostCardList title="Latest Posts">
        {posts.map(post => (
          <PostCard
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slug}
            key={post.slug}
            tags={Object.fromEntries(post.tags.map(key => [key, tags[key]]))}
          />
        ))}
      </PostCardList>
      <LinkButton
        href="/posts/1"
        icon={showMoreIconUrl.src as string}
        mode="mask"
        title="Show all Posts"
        style={{ marginLeft: "auto", marginRight: "auto" }}>
        Show all Posts
      </LinkButton>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: StaticData }> {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  // include newest posts
  const posts = staticData.posts
    .filter(post => !post.unpublished)
    .slice(0, PAGE_SIZE);

  // map tag slugs in posts
  const tagsSeen = new Set(posts.flatMap(post => post.tags));
  const tags = Object.fromEntries(
    Array.from(tagsSeen.values()).map(key => [key, staticData.tags[key]])
  );

  return { props: { posts, tags } };
}
