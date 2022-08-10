import { readFileJson } from "@foxkit/node-util/fs";
import { Meta } from "lib/Meta";
import { PostCard, PostCardList } from "lib/PostCard";
import { Pagination } from "lib/Pagination";
import { useRouter } from "next/router";
import { Section } from "lib/Section";

interface PageProps {
  pageInfo: PostListInfo;
  posts: StaticPost[];
  tags: TagMap;
}

interface StaticPath {
  params: { page: string };
}

const PAGE_SIZE = 10;

export default function PostIndexPage({ pageInfo, posts, tags }: PageProps) {
  const router = useRouter();
  const setPage = (n: number) => {
    router.push(`/posts/${n}`);
  };

  return (
    <>
      <Meta
        title={`All Posts | Page ${pageInfo.current.page} | Mitsunee | Blog`}
        description={`Browse all Posts`} // PLACEHOLDER: Idk how to write good descriptions, pls help
      />
      <PostCardList title={`Page ${pageInfo.current.page}`} pageInfo={pageInfo}>
        {posts.map(post => (
          <PostCard
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slug}
            key={post.slug}
            tags={Object.fromEntries(post.tags.map(key => [key, tags[key]]))}
          />
        ))}
      </PostCardList>
      {pageInfo.total.pages > 1 && (
        <Section>
          <Pagination
            page={pageInfo.current.page}
            length={pageInfo.total.pages}
            setPage={setPage}
          />
        </Section>
      )}
    </>
  );
}

export async function getStaticPaths(): Promise<{
  paths: StaticPath[];
  fallback: false;
}> {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  const paths = new Array<StaticPath>();
  const posts = staticData.posts.filter(post => !post.unpublished);
  const pages = Math.ceil(posts.length / PAGE_SIZE);
  for (let i = 1; i <= pages; i++) {
    paths.push({ params: { page: i.toString() } });
  }

  return { paths, fallback: false };
}

export async function getStaticProps(
  context: StaticPath
): Promise<{ props: PageProps }> {
  const page = +context.params.page;
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  const allPosts = staticData.posts.filter(post => !post.unpublished);
  const pages = Math.ceil(allPosts.length / PAGE_SIZE);
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageEnd = page * PAGE_SIZE;
  const posts = allPosts.slice(pageStart, pageEnd);

  // map tag slugs in posts
  const tagsSeen = new Set(posts.flatMap(post => post.tags));
  const tags = Object.fromEntries(
    Array.from(tagsSeen.values()).map(key => [key, staticData.tags[key].title])
  );

  return {
    props: {
      pageInfo: {
        current: {
          page,
          from: pageStart + 1,
          to: pageStart + posts.length
        },
        total: {
          pages,
          posts: allPosts.length
        }
      },
      posts,
      tags
    }
  };
}
