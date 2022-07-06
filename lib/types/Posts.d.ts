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

declare interface TagMap {
  [key: string]: string;
}
