import { readFileSync } from "fs";
import joinPath from "@utils/joinPath";
import matter from "gray-matter";
import parseMarkdown from "@utils/blog/parseMarkdown";

export default async function getPostPropsBySlug(slug) {
  const file = readFileSync(joinPath("assets/blog/posts", `${slug}.md`));
  const { data, content } = matter(file);
  const parsedContent = await parseMarkdown(content);

  return {
    props: { data, content: parsedContent }
  };
}
