import { readdir } from "fs/promises";
import { resolvePath, getFileName } from "@foxkit/node-util/path";
import { readFile } from "@foxkit/node-util/fs";
import { slugify } from "modern-diacritics";
import { processor } from "lib/processor";
import { dateToEpoch } from "lib/time";

import styles from "styles/BlogPost.module.css";
import { renderer } from "lib/renderer";
import { Meta } from "lib/Meta";
import { Section } from "lib/Section";
import { Headline } from "lib/Headline";
import { Tag, TagList } from "lib/Tags";

type PagePropsData = PostMeta & { tags: TagMap };
interface PageProps {
  data: PagePropsData;
  content: string;
}

export default function BlogPost({ data, content }: PageProps) {
  const Content = renderer(content);
  return (
    <>
      <Meta
        title={`${data.title} | Mitsunee | Blog`}
        description={data.description}
        isError={true} // PLACEHOLDER: just in case google comes by early :)
      />
      <article id={styles.body}>{Content}</article>
      <Section>
        <hr />
        <h3>Tags</h3>
        <TagList>
          {Object.entries(data.tags).map(([slug, text]) => (
            <Tag slug={slug} key={slug} text={text} />
          ))}
        </TagList>
      </Section>
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
  const fileContent = await readFile(`data/posts/${params.slug}.md`);
  const processed = await processor.process(fileContent as string);
  const processedData = processed.data as any as MetaRaw;

  // process metadata
  const data: PagePropsData = {
    title: processedData.title,
    slug: params.slug,
    date: dateToEpoch(processedData.date),
    tags: Object.fromEntries(
      (processedData.tags || []).map(text => [slugify(text), text])
    )
  };

  if (processedData.description) {
    data.description = processedData.description;
  }

  if (processedData.editedAt) {
    data.editedAt = dateToEpoch(processedData.editedAt);
  }

  return {
    props: {
      data,
      content: String(processed)
    }
  };
}
