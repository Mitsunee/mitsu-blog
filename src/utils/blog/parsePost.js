import matter from "gray-matter";
import parseMarkdown from "@utils/parseMarkdown";

async function parseToString(rawContent) {
  const content = await parseMarkdown(rawContent);
  return content.toString();
}

export default async function parsePost(postContent, parse = true) {
  const { data, content: rawContent } = matter(postContent);

  // parse markdown content
  const content =
    parse === false ? rawContent : await parseToString(rawContent);

  return { data, content };
}
