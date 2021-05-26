import getPostList from "@utils/blog/getPostList";
import getPost from "@utils/blog/getPost";
import parsePost from "@utils/blog/parsePost";
import buildPostData from "@utils/blog/buildPostData";

import Meta from "@components/Meta";

export default function BlogPost({ data, content }) {
  // TODO: proper header section for blog posts (title, date)
  // TODO: proper footer section for blog posts (permalink)
  // TODO: handle optional image and youtube video

  return (
    <>
      <Meta
        title={data.title}
        description={data.description}
        image={data.image}
        route={`blog/${data.slug}`}
      />
      <main>
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const postList = await getPostList();
  const paths = postList.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const postRaw = await getPost(slug);
  const { data: rawData, content } = await parsePost(postRaw);
  const data = buildPostData(rawData, `${slug}.md`);
  return { props: { data, content } };
}
