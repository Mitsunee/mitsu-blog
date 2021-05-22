import Link from "next/link";

import getPost from "@utils/blog/getPost";
import getPostList from "@utils/blog/getPostList";
import parsePost from "@utils/blog/parsePost";

import Meta from "@components/Meta";

export default function Test({ post, allPosts }) {
  const { data, content } = post;
  return (
    <>
      <Meta {...data} />
      <main>
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link href="/">
          <a>Return whence you came</a>
        </Link>
        <h3>All Posts:</h3>
        <ul>
          {allPosts.map(post => (
            <li key={post.filename}>
              {post.filename} - {post.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const test = getPost("test");
  const props = await parsePost(test);
  const allPosts = await getPostList();

  return { props: { post: props, allPosts } };
}
