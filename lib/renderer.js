import { rehype } from "rehype";
import rehypeReact from "rehype-react";
import { createElement, Fragment } from "react";
import { AutoLink } from "./AutoLink";

export function renderer(content) {
  const rendered = rehype()
    .data("settings", { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: { a: AutoLink }
    })
    .processSync(content);

  return rendered.result;
}
