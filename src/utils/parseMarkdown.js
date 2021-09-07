import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkPrism from "remark-prism";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import rehypeToString from "rehype-stringify";

const parser = unified()
  .use(remarkParse)
  .use(remarkPrism)
  .use(remarkUnwrapImages)
  .use(remarkToRehype)
  .use(rehypeSlug)
  .use(rehypeExternalLinks)
  .use(rehypeToString);

export default async function parseMarkdown(markdown) {
  return await parser.process(markdown);
}
