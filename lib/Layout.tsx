import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, PropsWithChildren, useEffect } from "react";
import cc from "classcat";
import homeIconUrl from "iconoir/icons/home.svg";
import postsIconUrl from "iconoir/icons/multiple-pages.svg";
import categoriesIconUrl from "iconoir/icons/archive.svg";
import hamburgerIconUrl from "iconoir/icons/menu.svg";

import styles from "./Layout.module.css";

interface NavigationItemProps {
  icon?: string;
  title: string;
  href: string;
  current: boolean;
}

interface IconStyles extends CSSProperties {
  "--bg": string;
}

function NavigationItem({ icon, title, href, current }: NavigationItemProps) {
  return (
    <li>
      <Link href={href}>
        <a className={cc([current && styles.curr])}>
          {icon && (
            <span
              className={styles.icon}
              style={{ "--bg": `url("${icon}")` } as IconStyles}
            />
          )}
          {title}
        </a>
      </Link>
    </li>
  );
}

function Navigation({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    document?.querySelector<HTMLElement>(":focus")?.blur();
  }, [router.asPath]);

  return (
    <>
      <ul
        className={cc([styles.nav, styles.navHorizontal])}
        role="navigation"
        aria-label="Main">
        {children}
      </ul>
      <button className={styles.mobile}>
        <span
          className={styles.icon}
          style={
            { "--bg": `url("${hamburgerIconUrl.src as string}")` } as IconStyles
          }
        />
        <ul
          className={cc([styles.nav, styles.navVertical])}
          role="navigation"
          aria-label="Main">
          {children}
        </ul>
      </button>
    </>
  );
}

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
        <Navigation>
          <NavigationItem
            title="Home"
            href="/"
            icon={homeIconUrl.src as string}
            current={router.asPath == "/"}
          />
          <NavigationItem
            title="All Posts"
            href="/posts/1"
            icon={postsIconUrl.src as string}
            current={router.asPath.startsWith("/posts/")}
          />
          <NavigationItem
            title="Categories"
            href="/categories"
            icon={categoriesIconUrl.src as string}
            current={router.asPath == "/categories"}
          />
        </Navigation>
      </header>
      <main>{children}</main>
    </>
  );
}
