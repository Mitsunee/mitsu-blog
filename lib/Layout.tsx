import Link from "next/link";
import { PropsWithChildren } from "react";

// TODO: implement navbar with text link to Home and a search bar when /search page is implemented

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <Link href="/">
          <a title="Mitsunee | Blog">
            <img alt="Mitsunee" src="/assets/icons/icon.svg" />
          </a>
        </Link>
      </header>
      <main>{children}</main>
    </>
  );
}
