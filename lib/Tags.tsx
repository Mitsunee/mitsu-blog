//import cc from "classcat";
import { cloneElement } from "react";
import { AutoLink } from "./AutoLink";

import styles from "./Tags.module.css";

interface TagProps {
  text: string;
  slug: string;
  isList?: boolean;
}

// TODO: Link tags to /category/[slug] route when ready

export function Tag({ text, slug, isList = false }: TagProps) {
  return isList ? (
    <li title={text} className={styles.item}>
      <AutoLink href={`/category/${slug}`} className={styles.tag}>
        {text}
      </AutoLink>
    </li>
  ) : (
    <div title={text}>
      <AutoLink href={`/category/${slug}`} className={styles.tag}>
        {text}
      </AutoLink>
    </div>
  );
}

export function TagList({ children }) {
  function forceIsList(child) {
    return cloneElement(child, { isList: true });
  }

  return (
    <ul className={styles.list}>
      {Array.isArray(children)
        ? children.map(forceIsList)
        : forceIsList(children)}
    </ul>
  );
}
