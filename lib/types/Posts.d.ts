interface MetaRaw {
  title: string;
  date: string;
  editedAt?: string;
  description?: string;
  tags: string[];
}

interface PostMeta {
  title: string;
  date: number;
  editedAt?: number;
  description?: string;
  slug: string;
}

declare interface TagMap {
  [key: string]: string;
}
