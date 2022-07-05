//import cc from "classcat";
import { cloneElement } from "react";

import styles from "./Tags.module.css";

interface TagProps {
  text: string;
  slug: string;
  isList?: boolean;
}

// TODO: Link tags to /category/[slug] route when ready

export function Tag({ text, slug, isList = false }: TagProps) {
  slug; // PLACEHOLDER: unused until /category/[slug] route is made
  return isList ? (
    <li title={text} className={styles.tag}>
      {text}
    </li>
  ) : (
    <div title={text} className={styles.tag}>
      {text}
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
