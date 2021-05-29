import buildTags from "./helpers/buildTags";
import dateStringToUnix from "./helpers/dateStringToUnix";

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
  const date = dateStringToUnix(data.date);

  // throw in case of unparsable date
  if (date === false) throw new Error(`Could not convert date for ${post}`);

  return {
    ...postDataDefaults, // default values for optional props showImage and youTubeVideo
    ...data, // parsed matter
    ...date, // contains props: date (as timestamp), hasTime
    slug, // slug as string
    tags // tags as stringified array
  };
}
