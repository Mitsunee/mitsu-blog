interface MetaRaw {
  title: string;
  date: string;
  editedAt?: string;
  description?: string;
  tags: string[];
}

interface MetaBase {
  title: string;
  date: number;
  editedAt?: number;
  description?: string;
  slug: string;
}

declare interface PostMeta extends MetaBase {
  tags: string[];
}

declare interface TagMap {
  [key: string]: string;
}

declare interface PostMetaWithTagMap extends MetaBase {
  tags: TagMap;
}
