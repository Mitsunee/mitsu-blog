import type { CSSProperties, PropsWithChildren } from "react";
import styles from "./SocialsBar.module.css";

interface SocialsBarItemProps {
  src: string | { src: string; width: number; height: number };
  href: string;
  title?: string;
  hover?: false | string;
}

interface SocialsBarItemJSXStyle extends CSSProperties {
  "--bg": string;
  "--hover"?: string;
}

export function SocialsBar({ children }: PropsWithChildren) {
  return <div id={styles.socials}>{children}</div>;
}

export function SocialsBarItem({
  src,
  href,
  title,
  hover = false
}: SocialsBarItemProps) {
  const style: SocialsBarItemJSXStyle = {
    "--bg": `url("${typeof src == "string" ? src : src.src}")`
  };

  if (hover) style["--hover"] = hover;

  return (
    <a href={href} title={title} className={styles.item} style={style}>
      <div className={styles.inner}></div>
    </a>
  );
}
