---
title: "Test"
description: "I am testing my implementation of markdown for my blog"
---

# Test

I **am** using [Next] with [Remark] and [Prism] :)

```js
import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";

export default async function parseMarkdown(markdown) {
  const result = await remark().use(html).use(prism).process(markdown);
  return result.toString();
}
```

[next]: https://nextjs.org
[remark]: https://remark.js.org/
[prism]: https://prismjs.com/
