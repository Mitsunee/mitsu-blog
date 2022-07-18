import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import cc from "classcat";

import styles from "./Layout.module.css";

export function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a title="Mitsunee | Blog" className={styles.logo}>
            <img alt="Mitsunee" src="/assets/icons/icon.svg" />
          </a>
        </Link>
        <ul className={styles.links} role="navigation" aria-label="Main">
          <li>
            <Link href="/">
              <a className={cc([router.asPath == "/" && styles.curr])}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/posts/1">
              <a
                className={cc([
                  router.asPath.startsWith("/posts/") && styles.curr
                ])}>
                All Posts
              </a>
            </Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </>
  );
}
