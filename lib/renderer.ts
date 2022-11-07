import { rehype } from "rehype";
import rehypeReact from "rehype-react";
import { createElement, Fragment } from "react";
import { AutoLink } from "./AutoLink";
import { Section } from "./Section";

export function renderer(content: string) {
  const rendered = rehype()
    .data("settings", { fragment: true })
    .use(
      rehypeReact,
      // @ts-ignore: the types of rehype-react love to not agree, don't care as long as it works
      {
        createElement,
        Fragment,
        components: { a: AutoLink, section: Section }
      }
    )
    .processSync(content);

  return rendered.result;
}
