import { readdir } from "fs/promises";
import { resolvePath, getFileName } from "@foxkit/node-util/path";
import { readFile, readFileJson } from "@foxkit/node-util/fs";
import { processor } from "lib/processor";
import { dateToEpoch } from "lib/time";

import styles from "styles/BlogPost.module.css";
import { renderer } from "lib/renderer";
import { Meta } from "lib/Meta";
import { Section } from "lib/Section";
import { Tag, TagList } from "lib/Tags";
import { TimeDisplay } from "lib/TimeDisplay";
import { slugify } from "modern-diacritics";
import { PostCard, PostCardList } from "lib/PostCard";
import { AutoLink } from "lib/AutoLink";
import { useRouter } from "next/router";

interface PageProps {
  data: StaticPost;
  content: string;
  more: StaticPost[];
  moreIs: "latest" | "similar";
  tags: TagMap;
}

const PAGE_SIZE = 2;

export default function BlogPost({
  data,
  content,
  tags,
  more,
  moreIs
}: PageProps) {
  const router = useRouter();
  const Content = renderer(content);
  return (
    <>
      <Meta
        title={`${data.title} | Mitsunee | Blog`}
        description={data.description}
        isError={data.unpublished || undefined}
      />
      <article id={styles.body}>{Content}</article>
      <Section>
        <hr />
        {data.unpublished ? "Date (TBD): " : "Published: "}
        <TimeDisplay time={data.date} />
        {data.editedAt && (
          <>
            <br />
            Last Edited: <TimeDisplay time={data.editedAt} />
          </>
        )}
        <br />
        <AutoLink href={router.asPath}>Permalink</AutoLink>
        <h3>Tags</h3>
        <TagList>
          {data.tags.map(slug => (
            <Tag slug={slug} key={slug} text={tags[slug]} />
          ))}
        </TagList>
      </Section>
      {more.length > 0 && (
        <PostCardList
          title={moreIs == "similar" ? "Similar Posts" : "Latest Posts"}>
          {more.map(post => (
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
      )}
    </>
  );
}

export async function getStaticPaths() {
  const dirPath = resolvePath("data/posts");
  const files = await readdir(dirPath);

  return {
    paths: files.map(file => ({ params: { slug: getFileName(file, false) } })),
    fallback: false
  };
}

export async function getStaticProps({
  params
}): Promise<{ props: PageProps }> {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");
  const fileContent = await readFile(`data/posts/${params.slug}.md`);
  const processed = await processor.process(fileContent as string);
  const processedData = processed.data as any as MetaRaw;

  // process metadata
  const data: StaticPost = {
    title: processedData.title,
    description: processedData.description,
    slug: params.slug,
    date: dateToEpoch(processedData.date),
    tags: processedData.tags.map(tag => slugify(tag))
  };

  if (processedData.editedAt) {
    data.editedAt = dateToEpoch(processedData.editedAt);
  }

  if (processedData.unpublished) {
    data.unpublished = true;
  }

  // find similar posts
  const similarityMap = new Map<string, number>(
    staticData.posts.map(post => [
      post.slug,
      // reduce tags of post to sum of tags shared with data.tags
      post.tags.reduce((sum, tag) => sum + (data.tags.includes(tag) ? 1 : 0), 0)
    ])
  );
  let moreIs: "latest" | "similar" = "similar";
  let more = staticData.posts
    // filter self and unpublished posts out
    .filter(
      post =>
        post.slug != data.slug &&
        !post.unpublished &&
        similarityMap.get(post.slug) > 0
    )
    // sort by similarity
    .sort((a, b) => {
      const similarTagsA = similarityMap.get(a.slug);
      const similarTagsB = similarityMap.get(b.slug);

      // if equal similarity sort by date (newest->oldest)
      if (similarTagsA == similarTagsB) {
        return b.date - a.date;
      }

      return similarTagsB - similarTagsA;
    })
    .slice(0, PAGE_SIZE);

  if (more.length < 1) {
    moreIs = "latest";
    more = staticData.posts
      .filter(post => post.slug != data.slug && !post.unpublished)
      .sort((a, b) => b.date - a.date)
      .slice(0, PAGE_SIZE);
  }

  // map tag slugs in posts
  const tagsSeen = new Set(data.tags.concat(more.flatMap(post => post.tags)));
  const tags = Object.fromEntries(
    Array.from(tagsSeen.values()).map(key => [key, staticData.tags[key].title])
  );

  return {
    props: {
      data,
      content: String(processed),
      more,
      moreIs,
      tags
    }
  };
}
