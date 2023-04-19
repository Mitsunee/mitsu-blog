---
title: Restoring old deleted files with git
date: 2023-04-19 23:03 UTC+2
description: >-
  I recently wanted to restore a bunch of old files in a directory using git. The files had been incrementally deleted over time to save space.
tags:
  - Git
  - Guide
---

# Restoring old deleted files with git

I recently wanted to restore a bunch of old files in a directory using git. The files had been incrementally deleted over time to save space. While restoring a single file is rather trivial if you know the commit, maybe it even is the previous commit or there is a dedicated commit for the deletion you could revert, the process is not as simple for an entire directory

## The Situation

My FGO Timers site's main feature are timers relating to ingame events and campaigns. To facilitate this I manually author YAML files that are converted to JSON through a zod schema parser, which is then consumed by the Next.js app. Since each file equals a new route to statically render at build time I decided to delete events that don't show up on the landing page anymore.

Recently I took the time to add a dedicated Events page which intended to show all events and provide a simple text search for old events. I then stopped deleting the older event files and build times started getting longer over time. Luckily Next.js provides a solution with getStaticPaths to only prerender specified paths (I decided all the currently ongoing and upcoming events are good enough here), but allow for other paths to be generated on demand.

With all downsides removed I decided to look into ways of restoring all the old event files, which are still somewhere in the commit history amongst the over 700 commits.

## Restoring a single file with git

Basics first, figuring out how to restore a single file. Let's use `src/old-module.js` as our example path for a file to be restored. Using `git revlist` you can get a list of commits that affect the file by simply appending two dashes and the path to the command:

```bash
git revlist HEAD -- src/old-module.js
```

This provides us with a list of commits that affect our file. We only need the latest commit - the one that deleted the file - so the `-n 1` flag (put before the double dash) could give us just that one commit in the future!

Our next piece of the puzzle is a way to actually get the file using the commit hash we just got. `git checkout` can do just that, with a little trick; Appending `^` to a commit hash gives us the commit immediatly before the given hash, so we can checkout the file from the last commit that still had the file:

```bash
git checkout COMMITHASHGOESHERE^ src/old-module.js
```

The file should now be back in our working tree and automatically staged for the next commit. You can of course use `git restore --staged` to unstage the file again.

## Restoring an entire directory

Now thinking back to the original problem, I am wanting to restore ALL deleted files in `assets/data/events` in my repository, so we will need something to find all the file names again. After a lot of searching around I stumbled upon a [blog post by Waylon Walker](https://waylonwalker.com/git-find-deleted-files/) with a combination of flags for `git log` that output only the filenames that we are looking for:

```bash
git log --diff-filter D --pretty="format:" --name-only "assets/data/events"
```

The `--diff-filter` option finds all the commits that delete files, exactly what we are looking for. The combination of `--pretty="format:" --name-only` makes `git log` output only the complete filepaths of the files in question. Finally providing the path to the directory acts as a filter, so git will only consider files in our target directory.

At this point I decided to save the result in a text file to manually sort out some old test files and other event files I did not need restored. I then loaded the file into a bash variable as an array like this:

```bash
EVENT_FILES=$(<events.txt)
```

Now all we need to do is combine the commands from the previous section into a for loop with our new array:

```bash
for FILE in $EVENT_FILES; do git checkout "$(git rev-list HEAD -n 1 -- $FILE)"^ $FILE; done
```

## Complete Commands

For a **single file** (replace `$FILE` with the path to the file or create the variable):

```bash
git checkout "$(git rev-list HEAD -n 1 -- $FILE)"^ $FILE
```

For a **full directory** (replace `path/to/dir` with the path to restore):

```bash
git log --diff-filter D --pretty="format:" --name-only path/to/dir > files.txt
# manually clean up files.txt as needed using your preferred editor
FILES=$(<files.txt)
for FILE in $FILES; do git checkout "$(git rev-list HEAD -n 1 -- $FILE)"^ $FILE; done
```

Thanks again to [Waylon Walker](https://waylonwalker.com/) for the `git log` command!
