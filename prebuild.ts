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

import { TagsInfo, TagsInfoSchema } from "lib/schema/TagsInfo";
import { PostFrontmatterSchema } from "lib/schema/PostFrontmatter";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkExtractFrontmatter, { yaml: YAML.parse, remove: true })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

const tagTitleMap = new Map<string, string>();
const tagDescriptionMap = new Map<string, string>();
const filePathMap = new Map<string, string>();

async function readTagsData() {
  const data = await readFileYaml<TagsInfo>("data/tags.yml");
  if (!data) {
    throw new Error("Could not read 'data/tags.yml'");
  }

  const check = TagsInfoSchema.safeParse(data);
  if (!check.success) {
    check.error.errors.forEach(error =>
      console.error(`${error.path}: ${error.message}`)
    );
    throw new Error("Stopping due to Schema validation error");
  }

  for (const [slug, { title, description }] of Object.entries(data)) {
    tagTitleMap.set(slug, title);
    tagDescriptionMap.set(slug, description);
  }
}

async function processData(filePath: string) {
  // readFile and rerun unified processor
  const content = await readFile(filePath);
  if (!content) {
    throw new Error(`Could not read ${filePath}`);
  }
  const processed = await processor.process(content);

  // process frontmatter
  const slug = getFileName(filePath, false);
  const check = PostFrontmatterSchema.safeParse(processed.data);
  if (!check.success) {
    check.error.errors.forEach(error =>
      console.error(`${error.path}: ${error.message}`)
    );
    throw new Error("Stopping due to Schema validation error");
  }

  const data = check.data;

  // check for slug collision
  if (filePathMap.has(slug)) {
    throw new Error(
      `Slug collision for '${filePath}' and ${filePathMap.get(slug)}`
    );
  }
  filePathMap.set(slug, filePath);

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

  return { ...data, slug } as PostMeta;
}

(async function main() {
  await readTagsData();
  const postPaths = await globby("data/posts/**/*.md");
  const posts = await Promise.all(postPaths.map(processData));
  const tags = Object.fromEntries(
    Array.from(tagTitleMap.entries(), ([slug, title]) => {
      if (tagDescriptionMap.has(slug)) {
        return [slug, { title, description: tagDescriptionMap.get(slug)! }];
      }
      return [slug, { title }];
    })
  );

  posts.sort((a, b) => b.date - a.date);

  await writeFile("posts.json", { posts, tags });
})();
