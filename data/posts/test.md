---
title: Test
date: 2022-06-22 21:02 UTC+2
editedAt: 2022-07-01 12:56 UTC+2
description: >-
  Multi-line thingy test
  pls work

  linebreaks?
tags:
  - Testing
  - pls ignore
---

# This is a test post

I am testing different remark features here. The goal is to support:

- [x] Github Flavoured Markdown
- twemoji
  - using shortcodes similar to discord
  - as unicode characters
- prism code blocks
- frontmatter

## gfm tables

| lorem | ipsum |
| :---- | :---: |
| gfm   | works |
| I     | hope  |

## emojis

:+1:

orange heart 🧡 :)

## prism

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

## line breaks

Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
