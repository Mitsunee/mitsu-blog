import { useState } from "react";
//import { stylesheet, css } from "astroturf";
import Link from "next/link";

import Meta from "@components/Meta";
import getPostList from "@utils/blog/getPostList";

function handleSearch(postList, searchQuery) {
  if (searchQuery === "") return postList;
  const sanitizedQuery = searchQuery.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  if (sanitizedQuery === "") return postList;
  return postList.filter(({ title }) =>
    title.toLowerCase().includes(sanitizedQuery)
  );
}

export default function BlogIndex({ postList }) {
  const [search, setSearch] = useState("");
  const filteredList = handleSearch(postList, search);
  return (
    <>
      <Meta
        title={"Blog"}
        description={"Mitsunee's Blog"}
        // TODO: BlogIndex meta image
        route={"blog"}
      />
      <main>
        <input
          type="text"
          value={search}
          placeholder={"Search"}
          onChange={e => setSearch(e.target.value)}
        />
        {filteredList.length > 0 ? (
          <ul>
            {filteredList.map(post => (
              <li key={post.slug} title={post.slug}>
                <Link href={`/blog/${post.slug}/`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Posts found for query {`"${search}"`}</p>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const postList = await getPostList();
  // TODO: sort by date
  // TODO: tags
  return { props: { postList } };
}
