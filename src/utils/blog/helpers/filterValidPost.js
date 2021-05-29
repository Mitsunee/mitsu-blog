// returns true if post matter contained all required fields and at least one tag exists
export default function filterValidPost(post) {
  // check that slug is set
  if (typeof post.slug !== "string") {
    console.error(`A post was filtered due to missing slug`);
    return false;
  }

  // check for required meta
  for (let prop of ["title", "description", "image"]) {
    if (typeof post[prop] !== "string") {
      console.warn(
        `'${prop}' is not string for post '${post.slug}'. This post was filtered.`
      );
      return false;
    }
  }

  // check converted date
  if (isNaN(post.date) || typeof post.hasTime !== "boolean") {
    console.warn(`Date was not properly converted for ${post.slug}`);
    return false;
  }

  // check that at least one tag exists
  if (typeof post.tags !== "string" || JSON.parse(post.tags).length < 1) {
    console.warn(
      `No tags were found on post ${post.slug}. This post was filtered.`
    );
    return false;
  }

  return true;
}
