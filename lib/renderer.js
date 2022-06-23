import { rehype } from "rehype";
import rehypeReact from "rehype-react";
import { createElement, Fragment } from "react";

export function renderer(content) {
  const rendered = rehype()
    .data("settings", { fragment: true })
    .use(rehypeReact, { createElement, Fragment })
    .processSync(content);

  return rendered.result;
}
