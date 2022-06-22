import Link from "next/link";

export function Layout({ children }) {
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
