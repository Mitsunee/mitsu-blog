import Link from "next/link";

import getPostPropsBySlug from "@utils/blog/getPostPropsBySlug";

import Meta from "@components/Meta";

export default function Test({ data, content }) {
  return (
    <>
      <Meta {...data} />
      <main>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link href="/">
          <a>Return whence you came</a>
        </Link>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { props } = await getPostPropsBySlug("test");
  return { props };
}
