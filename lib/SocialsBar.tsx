import cc from "classcat";
import type { ComponentProps, CSSProperties, PropsWithChildren } from "react";
import styles from "./SocialsBar.module.css";

interface SocialsBarItemProps extends Omit<ComponentProps<"a">, "className"> {
  src: string | { src: string; width: number; height: number };
  className?: string | string[];
  href: string;
  title: string;
  hover?: string;
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
  hover,
  style = {},
  className,
  ...props
}: SocialsBarItemProps) {
  const aStyle: SocialsBarItemJSXStyle = {
    ...style,
    "--bg": `url("${typeof src == "string" ? src : src.src}")`
  };

  if (hover) aStyle["--hover"] = hover;

  return (
    <a {...props} className={cc([styles.item, className])} style={aStyle}>
      <div className={styles.inner}></div>
    </a>
  );
}
