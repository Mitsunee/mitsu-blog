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

export default function BlogPost({ data, content }) {
  const Content = renderer(content);
  return (
    <>
      <Meta
        title={`${data.title} | Mitsunee | Blog`}
        description={data.description}
        isError={true} // PLACEHOLDER: just in case google comes by early :)
      />
      <Section>
        <Headline>Debug: Metadata</Headline>
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      </Section>
      <article id={styles.body}>{Content}</article>
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

export async function getStaticProps({ params }) {
  const fileContent = await readFile(`data/posts/${params.slug}.md`);
  const processed = await processor.process(fileContent);

  // process metadata
  const data = {
    ...processed.data,
    slug: params.slug,
    date: dateToEpoch(processed.data.date),
    tags: Object.fromEntries(
      (processed.data.tags || []).map(text => [slugify(text), text])
    )
  };
  if (data.editedAt) {
    data.editedAt = dateToEpoch(data.editedAt);
  }

  return {
    props: {
      data,
      content: String(processed)
    }
  };
}
