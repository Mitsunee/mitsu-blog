import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";

export default async function parseMarkdown(markdown) {
  return await remark().use(html).use(prism).process(markdown);
}
