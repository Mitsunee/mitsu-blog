---
title: "Test"
description: "I am testing my implementation of markdown and prism for my blog"
image: "/assets/avi_small.jpg"
showImage: true
date: "19.5.2021 17:32 +2"
youTubeVideo: null
tags: "Testing, Image, Tag With Spaces In Name"
---

Image should display above

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
