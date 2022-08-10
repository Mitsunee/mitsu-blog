import { readFileJson } from "@foxkit/node-util/fs";
import postsIconUrl from "iconoir/icons/multiple-pages.svg";
import categoriesIconUrl from "iconoir/icons/archive.svg";
import styles from "styles/Home.module.css";
import { Meta } from "lib/Meta";
import { Hero } from "lib/Hero";
import { PostCard, PostCardList } from "lib/PostCard";
import { LinkButton } from "lib/Button";
import { Section } from "lib/Section";

interface PageProps {
  tags: TagMap;
  posts: StaticPost[];
}

const PAGE_SIZE = 6;
const description = "Guides and Rants about Linux, Tech, Coding and Games";

export default function Home({ tags, posts }: PageProps) {
  return (
    <>
      <Meta title={`Home | Mitsunee | Blog`} description={description} />
      <Hero description={description} />
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
      <Section className={styles.buttons}>
        <LinkButton
          href="/posts/1"
          icon={postsIconUrl.src as string}
          mode="mask"
          title="Show all Posts">
          Show all Posts
        </LinkButton>
        <LinkButton
          href="/categories"
          icon={categoriesIconUrl.src as string}
          mode="mask"
          title="Browse Categories">
          Browse Categories
        </LinkButton>
      </Section>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  // include newest posts
  const posts = staticData.posts
    .filter(post => !post.unpublished)
    .slice(0, PAGE_SIZE);

  // map tag slugs in posts
  const tagsSeen = new Set(posts.flatMap(post => post.tags));
  const tags = Object.fromEntries(
    Array.from(tagsSeen.values()).map(key => [key, staticData.tags[key].title])
  );

  return { props: { posts, tags } };
}
