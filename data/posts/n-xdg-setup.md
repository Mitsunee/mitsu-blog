---
title: Install Node.js/NPM with no sudo on Linux
date: 2022-07-23 12:26 UTC+2
editedAt: 2022-08-20 12:12 UTC+2
description: >-
  This guide will showcase how to use environment variables,
  XDG user dirs and the version manager n to install Node.js
  and global NPM packages in your home directory.
tags:
  - Linux
  - Guide
---

# Install Node.js/NPM with no sudo on Linux

This guide will showcase how to use environment variables, XDG user dirs and the version manager n to install Node.js and global NPM packages in your home directory.

In the end you will have Node.js installed entirely within `~/.local/share/node` with simple version switching through `n` making it easy to test your code on any version.

## Preparations

We will be doing a completely fresh install, so uninstall any version of Node.js and NPM you might already have installed and delete/backup your configs. The following would delete all the default locations:

```bash
rm -rf ~/.npmrc
rm -rf ~/.npm
rm -rf ~/.node
```

## Environment Setup

Our best friend for this setup will be environment variables. They are commonly put in your `~/.bash_profile` (or similar for other shells) or any file it sources such as `~/.bashrc`. It is recommended to have XDG user dirs in your profile file as it gets loaded when you log into your operating system.

If you do not have XDG dirs set up already edit your `~/.bash_profile` to include the following variables:

```bash
# XDG USER
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CACHE_HOME="$HOME/.cache"
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_STATE_HOME="$HOME/.local/state"
```

Then edit your `~/.bashrc` or therein `source`d file to include the following:

```bash
# Node.js
export N_PREFIX="$XDG_DATA_HOME/node"
export N_CACHE_PREFIX="$XDG_CACHE_HOME"
export N_PRESERVE_NPM=1
export N_PRESERVE_COREPACK=1
export NPM_CONFIG_USERCONFIG="$XDG_CONFIG_HOME/npm/npmrc"
export COREPACK_HOME="$XDG_DATA_HOME/corepack"
export NODE_REPL_HISTORY="$XDG_STATE_HOME/node_repl/history"

# Add Node.js to PATH
if [[ $PATH != *"$N_PREFIX/bin"* ]]; then
    export PATH="$PATH:$N_PREFIX/bin";
fi
```

If you want other applications like your IDE to be able to find `node`, you may want to include at least `$N_PREFIX` as well as the last three lines somewhere actually `source`d by your `~/.bash_profile`!

Now run the following commands:

```bash
mkdir -p "$XDG_STATE_HOME/node_repl"
touch "$NODE_REPL_HISTORY"
mkdir -p "$XDG_CONFIG_HOME/npm"
```

And create your npmrc (with `nano $NPM_USER_CONFIG` or your editor of choice) with the following values:

```
prefix=${N_PREFIX}
cache=${XDG_CACHE_HOME}/npm
init-module=${XDG_CONFIG_HOME}/npm/config/npm-init.js
```

**Note**: You may now want to reboot to commit your environment variable changes. To continue with this guide closing and reopening your terminal is sufficient.

## Installation with N

As `n` is a bash script we can download the latest build to a temporary location and use it from there. You may replace `lts` with any version of your choice here.

```bash
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /tmp/n
bash /tmp/n --no-preserve lts
npm install -g n@latest npm@latest corepack@latest
```

Out of the box our setup preserves both `npm` and `corepack` versions instead of replacing them with the versions found in the tarball of the `node` version we are installing. As we're doing a fresh install we do not yet have these packages and thus need to use `--no-preserve` to get an initial install with `npm` included.

## Corepack/Yarn/PNPM

If you'd like to use corepack run `corepack enable`. ~~Note that this will eventually create a `~/.node` directory containing the versions of package managers Corepack provides!~~
**Edit**: This was fixed in 0.13.0. Corepack now uses `$XDG_CACHE_HOME/node/corepack` (or `$HOME/.cache/node/corepack` as a fallback). You can override this location with the `COREPACK_HOME` env variable as seen above.

If you do not want to use Corepack you can uninstall it and install Yarn and PNPM manually:

```bash
npm uninstall -g corepack
npm i -g yarn@latest pnpm@latest
```

## Updating

To switch between node versions you can simply use `n`. See its [Documentation](https://www.npmjs.com/package/n) for more detailed information. Simply put running `n 16` (or any other version number) will install the latest possible version of Node.js matching your input. Running `n` by itself provides a list of all cached versions.

You do not need to worry about NPM as it is preserved by `n` thanks to the enviroment variable `N_PRESERVE_NPM` (same for corepack and `N_PRESERVE_COREPACK`).

To manage globally installed packages (such as your package managers, vercel/snyk cli and such) I recommend using the `npm-check-updates` package (see [Documentation](https://www.npmjs.com/package/npm-check-updates) here) with the `-g` flag. It will check for updated versions of your packages and provide a command to run to update all of them.
