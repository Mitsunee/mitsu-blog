---
title: Test
date: 2022-06-22 21:02 UTC+2
description: >-
  Multi-line thingy test
  pls work

  linebreaks?
tags:
  - testing
  - pls ignore
---

# This is a test post

I am testing different remark features here. The goal is to support Github Flavoured Markdown with twemoji (using shortcodes similar to github and discord, as well as unicode characters) and prism code blocks

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
const _regex_test = /\d+\.\d+\.\d+(?:-pre-\d+)?/;
```

Also styled `inline code blocks` 🦊

## breaks

Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
