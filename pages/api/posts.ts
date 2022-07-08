import type { NextApiRequest, NextApiResponse } from "next";
import { clamp } from "@foxkit/util/clamp";
import staticData from "../../posts.json";

export interface ReqBody {
  ps?: number;
  page?: number;
  tag?: string;
  sort?: "desc" | "asc";
}
export interface ResBody {
  posts: StaticPost[];
  tags: TagMap;
  page: number;
  pages: number;
}

const staticPosts: StaticPost[] = (staticData.posts as StaticPost[]).filter(
  post => !post.unpublished
);
const staticTags: TagMap = staticData.tags;

// TODO: text search?

export default function GetPostList(req: NextApiRequest, res: NextApiResponse) {
  const body: ReqBody = req.body;
  const pageSize: number = clamp({ min: 3, value: body.ps || 10, max: 50 });
  const page: number = clamp({ min: 1, value: body.page || 1 });
  const responseBody: ResBody = { posts: [], tags: {}, page, pages: 1 };
  const sortAsc = body.sort == "asc" ? true : false;

  // Tags
  const includedTags = new Set<string>();
  const searchedTags: string[] = body.tag ? body.tag.split(",") : [];

  // Filter list
  const results = new Array<StaticPost>();
  for (
    let i = sortAsc ? staticPosts.length - 1 : 0;
    sortAsc ? i >= 0 : i < staticPosts.length;
    sortAsc ? i-- : i++
  ) {
    const post = staticPosts[i];

    // filter by searched tag
    if (
      searchedTags.length &&
      !searchedTags.every(tag => post.tags?.includes(tag))
    ) {
      continue;
    }

    // include tags in response
    for (const tag of post.tags) {
      if (includedTags.has(tag)) continue;
      includedTags.add(tag);
      responseBody.tags[tag] = staticTags[tag];
    }

    // add to list
    results.push(post);
  }

  // add slice and page count to response
  responseBody.posts = results.slice((page - 1) * pageSize, page * pageSize);
  responseBody.pages = clamp({
    min: 1,
    value: Math.ceil(results.length / pageSize)
  });

  // send response
  res.status(200).json(responseBody);
}
