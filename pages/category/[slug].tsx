import { readFileJson } from "@foxkit/node-util/fs";
import { ReqBody, ResBody } from "pages/api/posts";
import { PostCardList, PostCard } from "lib/PostCard";
import { useEffect, useState } from "react";
import { Pagination } from "lib/Pagination";
import { Meta } from "lib/Meta";

interface PageProps {
  slug: string;
  fallback: ResBody;
}

const PAGE_SIZE: number = 10;

// TODO: Sorting mode (desc, asc)

export default function CategoryPage({ slug, fallback }: PageProps) {
  const [loading, setLoading] = useState<boolean>(false);

  // query props
  //const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // result props
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(fallback.pages);
  const [posts, setPosts] = useState<StaticPost[]>(fallback.posts);
  const [tags, setTags] = useState<TagMap>(fallback.tags);

  useEffect(() => {
    if (page == 1) {
      setCurrentPage(1);
      setPages(fallback.pages);
      setPosts(fallback.posts);
      return;
    }

    const body: ReqBody = {
      tag: slug,
      ps: PAGE_SIZE,
      page
      //, sort: sortAsc ? "asc" : "desc"
    };

    setLoading(true);
    fetch("/api/posts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      method: "post"
    })
      .then(res => res.json())
      .then((res: ResBody) => {
        setCurrentPage(res.page);
        setPages(res.pages);
        setPosts(res.posts);
        setTags(res.tags);
        setLoading(false);
      })
      .catch(e => {
        // TODO: Better Error handling
        console.error(e);
        setLoading(false);
      });
  }, [page, fallback.posts, fallback.pages, slug]);

  return loading ? (
    "LOADING" // PLACEHOLDER
  ) : (
    <>
      <Meta
        title={`${tags[slug]} | Mitsunee | Blog`}
        description={`All Posts in the "${tags[slug]}" category`}
      />
      <PostCardList title={tags[slug]}>
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
      <Pagination page={currentPage} length={pages} setPage={setPage} />
    </>
  );
}

export async function getStaticPaths() {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  const paths = Array.from(Object.keys(staticData.tags), tag => ({
    params: { slug: tag }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params
}): Promise<{ props: PageProps }> {
  const staticData = await readFileJson<StaticData>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  // collect all posts including tag
  const allPosts = staticData.posts.filter(
    post => !post.unpublished && post.tags.includes(params.slug as string)
  );
  const pages = Math.ceil(allPosts.length / PAGE_SIZE);
  const posts = allPosts.slice(0, PAGE_SIZE);

  // map tag slugs in posts
  const tagsSeen = new Set(posts.flatMap(post => post.tags));
  const tags = Object.fromEntries(
    Array.from(tagsSeen.values()).map(key => [key, staticData.tags[key]])
  );

  return {
    props: {
      slug: params.slug as string,
      fallback: {
        posts,
        pages,
        page: 1,
        tags
      }
    }
  };
}
