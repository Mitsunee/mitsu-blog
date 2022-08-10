---
title: Git Amend vs Git Rebase
date: 2022-08-10 16:19 UTC+2
description: >-
  You made a mistake in a previous commit, maybe forgot to delete a console.log or missed a Linter warning? There are many simple ways to add changes to previous commits!
tags:
  - Git
  - Guide
---

# Git Amend vs Git Rebase Squashing

You made a mistake in a previous commit, maybe forgot to delete a `console.log()` or missed a Linter warning? There are many simple ways to add changes to previous commits!

**Note:** Changing commits changes the history of your branch and thus should only be used on not yet pushed commits. You can of course just use `git push --force`, but this should only be a last resort and **never** be done on a branch other people are working with!

## Amending the previous commit

The simplest case is adding changes to the latest commit. Simply do your changes, `git add` the files and then run `git commit --amend`:

```sh
# Example:
nano my-file.txt # add some changes
git add my-file.txt
git commit --amend
```

Git may prompt you about changing the commit's name, simply save and quit to confirm the old name (or change it if you want to).

## Amend with Git Rebase

But what if you want to add changes to an older commit? Maybe you found a bug you missed and did other things since then. Git Rebase can help. First you'll want to create a commit with the changes you'd like to add to a previous commit and then run `git rebase -i HEAD~3` (or a larger number if the commit is further away from the top). Your editor will open with an output like this:

```git
pick 28b1f1c add: foobar
pick 4b0390c add: hello-world
pick cef220a fix: foobar
```

Git also includes a bunch of documentation for the file we are editing here. Feel free to read it now. The trick we will make use of is that you can change the order of commits to squash our "fix: foobar" commit into the "add: foobar" commit:

```git
pick 28b1f1c add: foobar
squash cef220a fix: foobar
pick 4b0390c add: hello-world
```

Now save and quit your editor. Git will now prompt you for the name of the new commit, change it as you like, or simply add `#` before anything you do not want included like:

```git
add: foobar

# This is the commit message #2:

#fix: foobar
```

Save and quit your editor again and git will squash the commit into your initial commit. You can check the result with `git log --oneline`:

```git
2382483 (HEAD -> main) add: hello-world
82eed14 add: foobar
d81ee9b Initial commit
```
