import buildTags from "./helpers/buildTags";

const postDataDefaults = {
  showImage: true,
  youtubeVideo: null
};

// applies defaults, adds slug and turns tags into JSON Array (stringified)
export default function buildPostData(data, post) {
  if (data === undefined || !post) {
    console.log({ data, post });
    throw new TypeError(`data is incomplete for ${post}`);
  }

  const slug = post.replace(/\.md$/, "");
  const tags = buildTags(data.tags);

  return {
    ...postDataDefaults,
    ...data,
    slug,
    tags
  };
}
