import { processor } from "./lib/processor.mjs";
import { readFile } from "@foxkit/node-util/fs";

(async function main() {
  const file = await processor.process(await readFile("data/posts/test.md"));

  console.log("DATA:");
  console.log(file.data);
  console.log("\nVALUE:");
  console.log(String(file));
})();
