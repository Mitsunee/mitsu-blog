import { readFileSync } from "fs";
import joinPath from "@lib/joinPath";
import matter from "gray-matter";
import parseMarkdown from "@lib/blog/parseMarkdown";

export default async function getPostPropsBySlug(slug) {
  const file = readFileSync(joinPath("lib/blog/posts", `${slug}.md`));
  const { data, content } = matter(file);
  const parsedContent = await parseMarkdown(content);

  return {
    props: { data, content: parsedContent }
  };
}
