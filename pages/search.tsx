import { readFileJson } from "@foxkit/node-util/fs";
import { Headline } from "lib/Headline";
import { Meta } from "lib/Meta";
import { ChangeEventHandler, useEffect, useReducer, useState } from "react";
import { ReqBody, ResBody } from "pages/api/posts";
import { PostCard, PostCardList } from "lib/PostCard";
import styles from "styles/SearchPage.module.css";

interface PageProps {
  tags: TagMap;
}

interface TagFilterMap {
  [key: string]: boolean;
}

function tagsFilterReducer(state: TagFilterMap, action: string): TagFilterMap {
  return { ...state, [action]: state[action] ? !state[action] : true };
}

type Post = PostMeta & { tags?: string[] };

// TODO: pagination
// TODO: possibly handle url query params?
// TODO: implement text search field
// TODO: responsive layouts

export default function SearchPage({ tags }: PageProps) {
  const [loading, setLoading] = useState<boolean>(false);

  // search props
  const [tagsFilter, tagsDispatch] = useReducer(tagsFilterReducer, {});
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [page /*, setPage*/] = useState<number>(1);

  // result props
  const [currentPage, setCurrentPage] = useState<number>(1);
  currentPage; // PLACEHOLDER
  const [pages, setPages] = useState<number>(1);
  pages; // PLACEHOLDER
  const [posts, setPosts] = useState<Post[]>([]);

  // handlers
  const handleSort: ChangeEventHandler<{ value: string }> = event => {
    setSortAsc(event.target.value === "asc");
  };

  useEffect(() => {
    // TODO: AbortSignal
    // TODO: Debounce

    const filter = Object.entries(tagsFilter)
      .filter(val => val[1] == true)
      .map(val => val[0])
      .join(",");

    const body: ReqBody = {
      ps: 10,
      page,
      tag: filter,
      sort: sortAsc ? "asc" : "desc"
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
        setLoading(false);
      })
      .catch(e => {
        setPosts([]);
        setLoading(false);
        console.error(e);
      });
  }, [tagsFilter, sortAsc, page]);

  return (
    <>
      <Meta
        title="Search | Mitsunee | Blog"
        description="Search for Posts" // PLACEHOLDER: need a better text here
        isError={true} // don't want this indexed
      />
      <form className="content-section">
        <Headline>Search</Headline>
        <div className={styles.filters}>
          <h2>By Category</h2>
          <ul className={styles.cols}>
            {Object.entries(tags).map(([tagSlug, tagText]) => (
              <li key={tagSlug}>
                <input
                  type="checkbox"
                  id={`filter-by-${tagSlug}`}
                  checked={tagsFilter[tagSlug] || false}
                  onChange={() => tagsDispatch(tagSlug)}
                />
                <label htmlFor={`filter-by-${tagSlug}`}>{tagText}</label>
              </li>
            ))}
          </ul>
          <h2>Sort by Date</h2>
          <ul>
            <li>
              <input
                type="radio"
                name="sort"
                value="desc"
                id="sort-by-desc"
                onChange={handleSort}
                checked={!sortAsc}
              />
              <label htmlFor="sort-by-desc">Descending</label>
            </li>
            <li>
              <input
                type="radio"
                name="sort"
                value="asc"
                id="sort-by-asc"
                onChange={handleSort}
                checked={sortAsc}
              />
              <label htmlFor="sort-by-asc">Ascending</label>
            </li>
          </ul>
        </div>
      </form>
      {loading
        ? "LOADING" // PLACEHOLDER
        : posts.length > 0 && (
            <PostCardList title="Result">
              {posts.map(post => (
                <PostCard
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  slug={post.slug}
                  key={post.slug}
                  tags={Object.fromEntries(
                    post.tags.map(key => [key, tags[key]])
                  )}
                />
              ))}
            </PostCardList>
          )}
    </>
  );
}

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const staticData = await readFileJson<PageProps>("posts.json");
  if (!staticData) throw new Error("Could not read posts.json");

  return { props: { tags: staticData.tags } };
}
