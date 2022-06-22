---
# BUG: prettier interferes with frontmatter :\

title: Test
description: >-
  Multi-line thingy test
  pls work

  linebreaks?
tags:
  - testing
  - pls ignore
---

# This is a test post

## gfm tables

| lorem | ipsum |
| :---- | ----- |
| gfm   | works |
| I     | hope  |

## emojis

:+1:

🧡

## prism

```bash
#!/usr/bin/env bash
echo "Hello $USER"
```

## breaks

Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
