interface PostMeta {
  title: string;
  date: number;
  editedAt?: number;
  description: string;
  slug: string;
  image?: string;
  unpublished?: true;
}

type TagMap = Record<string, string>;

type TagInfoMap = Record<string, { title: string; description?: string }>;

// posts.json
type StaticPost = PostMeta & { tags: string[] };

interface StaticData {
  posts: StaticPost[];
  tags: TagInfoMap;
}

interface PostListInfo {
  current: {
    page: number;
    from: number;
    to: number;
  };
  total: {
    pages: number;
    posts: number;
  };
}
