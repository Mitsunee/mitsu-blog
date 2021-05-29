export default function buildTags(rawTags) {
  if (!rawTags) return false;
  const tags = rawTags.split(",").map(tag => tag.trim());
  return JSON.stringify(tags);
}
