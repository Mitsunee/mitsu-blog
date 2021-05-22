import { readdirSync } from "fs";
import joinPath from "@utils/joinPath";
import getPost from "@utils/blog/getPost";
import parsePost from "@utils/blog/parsePost";

export default async function getPostList() {
  // get file list by path
  const dir = readdirSync(joinPath("assets/blog/posts"));

  // parse frontmatter from all posts
  const postsData = await Promise.all(
    dir.map(async post => {
      let { data } = await parsePost(getPost(post), false);
      data.filename = post;
      return data;
    })
  );

  return postsData;
}
