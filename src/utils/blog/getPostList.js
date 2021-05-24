import { readdirSync } from "fs";
import joinPath from "@utils/joinPath";
import getPost from "@utils/blog/getPost";
import parsePost from "@utils/blog/parsePost";

const postDataDefaults = {
  showImage: true,
  youtubeVideo: null
};

// applies defaults, adds slug and turns tags into JSON Array (stringified)
function buildPostData(data, filename) {
  return {
    ...postDataDefaults,
    ...data,
    filename,
    slug: filename.replace(/\.md/g, ""),
    tags: JSON.stringify(data.tags?.split(",").map(tag => tag.trim())) || "[]"
  };
}

// returns true if post matter contained all required fields and at least one tag exists
function filterValidPost(post) {
  // check for required meta
  if (!post.image || !post.title || !post.description) return false;

  // check that at least one tag exists
  if (JSON.parse(post.tags).length < 1) return false;

  return true;
}

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
