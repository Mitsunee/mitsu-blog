import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import YAML from "yaml";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { readFile, writeFile } from "@foxkit/node-util/fs";
import { readFileYaml } from "@foxkit/node-util/fs-yaml";
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

const tagTitleMap = new Map();
const tagDescriptionMap = new Map();
const filePathMap = new Map();

async function readTagsData() {
  const data = await readFileYaml("data/tags.yml");
  for (const [slug, { title, description }] of Object.entries(data)) {
    tagTitleMap.set(slug, title);
    tagDescriptionMap.set(slug, description);
  }
}

async function processData(filePath) {
  // readFile and rerun unified processor
  const content = await readFile(filePath);
  const processed = await processor.process(content);

  // process frontmatter
  const slug = getFileName(filePath, false);
  const data = { ...processed.data, slug };

  // check for slug collision
  if (filePathMap.has(slug)) {
    throw new Error(
      `Slug collision for '${filePath}' and ${filePathMap.get(slug)}`
    );
  }
  filePathMap.set(slug, filePath);

  // check required types
  if (!data.title) throw new Error(`Missing Title in ${slug}`);
  if (!data.description) throw new Error(`Missing Description in ${slug}`);

  // transform dates
  if (!data.date) throw new Error(`Missing Date in ${slug}`);
  data.date = dateToEpoch(data.date);
  if (data.editedAt) {
    data.editedAt = dateToEpoch(data.editedAt);
  }

  // transform tags
  data.tags = (data.tags || []).map(text => {
    const tagSlug = slugify(text);
    const existingText = tagTitleMap.get(tagSlug);
    if (existingText) {
      if (existingText != text) {
        throw new Error(
          `Duplicate text for tag ${tagSlug}: '${text}' and ${existingText}`
        );
      }
    } else {
      tagTitleMap.set(tagSlug, text);
    }

    return tagSlug;
  });

  return data;
}

(async function main() {
  await readTagsData();
  const postPaths = await globby("data/posts/**/*.md");
  const posts = (await Promise.all(postPaths.map(processData))).sort(
    (a, b) => b.date - a.date
  );
  const tags = Object.fromEntries(
    Array.from(tagTitleMap.entries()).map(([slug, title]) => {
      if (tagDescriptionMap.has(slug)) {
        return [slug, { title, description: tagDescriptionMap.get(slug) }];
      }
      return [slug, { title }];
    })
  );

  await writeFile("posts.json", { posts, tags });
})();
