import { readFileJson } from "@foxkit/node-util/fs";
import { AutoLink } from "lib/AutoLink";
import { Meta } from "lib/Meta";
import { PostCardList } from "lib/PostCard";
import { TimeDisplay } from "lib/TimeDisplay";
import styles from "styles/CategoriesPage.module.css";

interface PageProps {
  tags: Array<{
    slug: string;
    title: string;
    description: string | null;
    posts: number;
    latest: number;
  }>;
}

export default function CategoriesPage({ tags }: PageProps) {
  return (
    <>
      <Meta title="Categories" description="List of all Categories" />
      <PostCardList title="Categories">
        {tags.map(({ slug, title, description, posts, latest }) => (
          <div className={styles.card} key={slug}>
            <h1>
              <AutoLink href={`/category/${slug}/1`}>{title}</AutoLink>
            </h1>
            {description && <p>{description}</p>}
            <p className={styles.info}>
              {posts} Post{posts > 1 && "s"} - Latest Post released{" "}
              <TimeDisplay time={latest} />
            </p>
          </div>
        ))}
      </PostCardList>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");
  const posts = {} as { [key: string]: { amount: number; latest: number } };

  // enumerate posts
  for (const post of staticData.posts) {
    if (post.unpublished) continue;
    for (const slug of post.tags) {
      if (posts[slug]) {
        posts[slug].amount++;
        posts[slug].latest = Math.max(posts[slug].latest, post.date);
      } else {
        posts[slug] = {
          amount: 1,
          latest: post.date
        };
      }
    }
  }

  // filter tags
  const tags: PageProps["tags"] = Array.from(Object.entries(staticData.tags))
    .filter(([slug]) => !!posts[slug])
    .map(([slug, { title, description }]) => ({
      slug,
      title,
      description: description || null,
      posts: posts[slug].amount,
      latest: posts[slug].latest
    }))
    .sort((a, b) => b.latest - a.latest);

  return {
    props: { tags }
  };
}
