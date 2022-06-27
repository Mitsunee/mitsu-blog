import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import YAML from "yaml";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { readFile, writeFile } from "@foxkit/node-util/fs";
import { getFileName } from "@foxkit/node-util/path";
import { slugify } from "modern-diacritics";
import { globby } from "globby";

import { dateToEpoch } from "./lib/time.mjs";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkExtractFrontmatter, { yaml: YAML.parse, remove: true })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

const tagMap = new Map();

async function processData(filePath) {
  // readFile and rerun unified processor
  const content = await readFile(filePath);
  const processed = await processor.process(content);

  // process frontmatter
  const slug = getFileName(filePath, false);
  const data = { ...processed.data, slug };

  // transform dates
  if (!data.date) throw new Error(`Missing Date in ${slug}`);
  data.date = dateToEpoch(data.date);
  if (data.editedAt) {
    data.editedAt = dateToEpoch(data.editedAt);
  }
  data.tags = (data.tags || []).map(text => {
    const tagSlug = slugify(text);
    const existingText = tagMap.get(tagSlug);
    if (existingText) {
      if (existingText != text) {
        throw new Error(
          `Duplicate text for tag ${tagSlug}: '${text}' and ${existingText}`
        );
      }
    } else {
      tagMap.set(tagSlug, text);
    }

    return tagSlug;
  });

  return data;
}

(async function main() {
  const postPaths = await globby("data/posts/**/*.md");
  const posts = await Promise.all(postPaths.map(processData));
  const tags = Object.fromEntries(tagMap.entries());

  await writeFile("posts.json", { posts, tags });
})();
