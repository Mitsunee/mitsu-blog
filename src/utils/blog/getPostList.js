import { readdirSync } from "fs";
import joinPath from "@utils/joinPath";
import getPost from "./getPost";
import parsePost from "./parsePost";
import buildPostData from "./buildPostData";
import filterValidPost from "./helpers/filterValidPost";

export default async function getPostList() {
  // get file list by path
  const postFiles = readdirSync(joinPath("assets/blog/posts"));

  // parse frontmatter from all posts
  const postsData = await Promise.all(
    postFiles.map(async post => {
      const { data } = await parsePost(getPost(post), false); // parse matter only
      return buildPostData(data, post);
    })
  );

  return postsData.filter(filterValidPost);
}
