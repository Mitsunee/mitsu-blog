import { readFileSync } from "fs";
import joinPath from "@utils/joinPath";

export default function getPost(filename) {
  return readFileSync(
    joinPath(
      "assets/blog/posts",
      filename.endsWith(".md") ? filename : `${filename}.md`
    )
  );
}
