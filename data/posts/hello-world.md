---
title: Hello, World
date: 2022-07-22 12:11 UTC+2
description: >-
  ...and welcome to my new blog. I'm a gacha gamer, web developer, music enthusiast and Linux user from Germany.
tags:
  - Mitsunee
---

# Hello, World!

Hello, World and welcome to my new blog. I'm a gacha gamer, web developer, music enthusiast and Linux user (currently Fedora 36) from Germany 🇩🇪

## About Me

I currently play Fate/Grand Order and Azur Lane. In the past I have also played MMOs such as Tera, MapleStory 2 and spent plenty of hours grinding in Diablo 3 Seasons as a Crusader or Necromancer. I grew up with a Gameboy Advance (and later NDSlite) for consoles with Pokemon Emerald and Custom Robo Arena being my childhood favorites.

I often listen to music while pretty much doing anything from gaming to coding or taking a walk, currently mostly Melodic Death Metal (bands such as Be'lakor, Mors Principium Est, In Mourning and Swallow The Sun). Outside of Metal I've listened to EDM a lot during the early rise of Monstercat and found favorite genres in Drum&Bass, Future Bass and Hardstyle. I also occasionally listen to J-Rock/Pop and Dark Rock.

## As a developer

I got started with coding as a kid with AutoIT3, later learning HTML/CSS and eventually PHP as I developed an interest for Web Development. About a decade ago I made the effort to learn JavaScript and jQuery to be able to provide better applications such as my [Damage Calculator for Generation 3 of Pokemon](https://www.mitsunee.com/gen3dmgcalc). In 2019 I switched to Linux (then Kubuntu 19.04LTS) and also learned about Node.js and Bash scripting.

These days I write all sites in React (although I still wanna try svelte soon! Might rewrite the old Damage Calc?) in either ES2021 JavaScript or TypeScript depending on the scale of the project. For bundlers I like using rollup/vite or Next.js if I want to use more complex server functions.

In the future I'd like to learn more about backend technologies (got a good overview of Redis so far) and learn a "real" programming language (likely Rust). I have a [Trello Board](https://trello.com/b/Btyu4S9s/tech-coding) where I keep track of ideas and my progress with learning new things.

## About this blog

As the Hero subtitle on the Landing Page says, my plan here is to post rants and guides for games I play and coding stuff. If you'd like to be informed about new posts feel free to join my [Discord Server](https://discord.gg/ZncPkjw).

This blog is written in TypeScript using Next.js and unified. Although I am mostly using mostly publically available plugins, I chose to wrote a custom auto-sections plugin for my processor:

```ts
export const processor = unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkExtractFrontmatter, { yaml: YAML.parse, remove: true })
  .use(remarkGemoji)
  .use(remarkTwemoji, { ext: ".svg", folder: "svg" })
  .use(remarkGfm)
  .use(remarkPrism, { plugins: ["autolinker", "diff-highlight"] })
  .use(autoSections)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeMinify)
  .data("settings", { quote: '"', preferUnquoted: false })
  .use(rehypeLinks, { target: false, rel: ["noopener", "noreferrer"] })
  .use(rehypeStringify, { allowDangerousHtml: true });
```

To display the pre-processed posts I use rehype:

```ts
export function renderer(content) {
  const rendered = rehype()
    .data("settings", { fragment: true })
    .use(rehypeReact, {
      createElement, // React.createElement
      Fragment, // React.Fragment
      components: { a: AutoLink, section: Section }
    })
    .processSync(content);

  return rendered.result;
}
```

Currently all pages are statically generated, but I do have plans to implement a search function in the future, which will likely use API Routes and Server-Side Rendering, thus the use of Next.js.
