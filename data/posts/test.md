---
title: Test
date: 2022-06-22 21:02 UTC+2
editedAt: 2022-08-18 16:39 UTC+2
description: >-
  Testing ground for remark/rehype features
tags:
  - Testing
unpublished: true
---

# This is a test post

I am testing different remark/rehype features here. The goal is to support:

- [x] Github Flavoured Markdown
- twemoji
  - using shortcodes similar to discord
  - as unicode characters
- prism code blocks
- frontmatter (yaml)

## gfm Tables

| lorem | ipsum |
| :---- | :---: |
| gfm   | works |
| I     | hope  |

## Emojis

:+1:

orange heart 🧡 :)

## Prism Syntax Highlighting

```bash
#!/usr/bin/env bash
echo "Hello $USER"
```

```js
// renderer.js
import { rehype } from "rehype";
import rehypeReact from "rehype-react";
import { createElement, Fragment } from "react";

export function renderer(content) {
  const rendered = rehype()
    .data("settings", { fragment: true })
    .use(rehypeReact, { createElement, Fragment })
    .processSync(content);

  return rendered.result;
}

// other tests
const _regex_dates =
  /^(?<date>\d{4}-\d{2}-\d{2}) (?<time>\d{2}:\d{2}) (?<timezone>UTC(?:\+|-)\d{1,2}(?::\d{2})?)$/i;
```

Also styled `inline code blocks` 🦊

## Line breaks

Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Links

- Should have rel set: [Link to my website](https://www.mitsunee.com)
- Should use next router: [Back to Home](/)
