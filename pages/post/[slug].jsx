import { readdir } from "fs/promises";
import { resolvePath, getFileName } from "@foxkit/node-util/path";
import { readFile } from "@foxkit/node-util/fs";
import { processor } from "lib/processor";
import { renderer } from "lib/renderer";
import { Meta } from "lib/Meta";

export default function PostPage({ data, content }) {
  const Content = renderer(content);
  return (
    <>
      <Meta
        title={`${data.title} | Mitsunee | Blog`}
        description={data.description}
        isError={true} // PLACEHOLDER: just in case google comes by early :)
      />
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
      {Content}
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
  const data = { ...processed.data, slug: params.slug };

  return {
    props: {
      data,
      content: String(processed)
    }
  };
}
