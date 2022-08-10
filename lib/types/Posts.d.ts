interface MetaRaw {
  title: string;
  date: string;
  editedAt?: string;
  description: string;
  tags: string[];
  unpublished?: any;
}

interface PostMeta {
  title: string;
  date: number;
  editedAt?: number;
  description: string;
  slug: string;
  unpublished?: true;
}

interface TagMap {
  [key: string]: string;
}

interface TagInfoMap {
  [key: string]: { title: string; description?: string };
}

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
