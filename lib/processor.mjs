import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import YAML from "yaml";
import remarkTwemoji from "remark-twemoji";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeMinify from "rehype-preset-minify";
import rehypeLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

export const processor = unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkExtractFrontmatter, { yaml: YAML.parse, remove: true })
  .use(remarkTwemoji, { ext: ".svg", folder: "svg" }) // BUG: not working?
  .use(remarkGfm)
  .use(remarkPrism, { plugins: ["autolinker", "diff-highlight"] }) // TODO: add stylesheet
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeMinify) // BUG: possibly interferes with prism
  .data("settings", { quote: '"', preferUnquoted: false })
  .use(rehypeLinks, { target: false, rel: ["noopener", "noreferrer"] })
  .use(rehypeStringify);
