import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import YAML from "yaml";
import remarkGemoji from "remark-gemoji";
// @ts-ignore
import remarkTwemoji from "remark-twemoji";
import remarkGfm from "remark-gfm";
// @ts-ignore
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeMinify from "rehype-preset-minify";
import rehypeLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

import autoSections from "./auto-sections";

export const processor = unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkExtractFrontmatter, { yaml: YAML.parse, remove: true })
  .use(remarkGemoji)
  .use(remarkTwemoji, { ext: ".svg", folder: "svg" })
  .use(remarkGfm)
  .use(remarkPrism)
  .use(autoSections)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeMinify)
  .data("settings", { quote: '"', preferUnquoted: false })
  .use(rehypeLinks, { rel: ["noopener", "noreferrer"] })
  .use(rehypeStringify, { allowDangerousHtml: true });
