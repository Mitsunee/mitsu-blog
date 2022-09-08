---
title: Copy Games to your Steam Deck via WiFi
date: 2022-09-08 18:52 UTC+2
description: >-
  Sync already downloaded Steam games to your Steam Deck using rsync.
tags:
  - Guide
  - Linux
  - Steam Deck
---

# Copy Games to your Steam Deck via WiFi

Using rsync you can sync files between two devices - even Steam games! To follow this guide you need both of your devices in the same network. On the Steam Deck simply enter Desktop Mode (by holding the Power button and then selecting the Desktop Mode option). You can do the same thing with two PCs as well if you install an SSH Server on the target system. The Steam Deck already comes with `sshd` preinstalled.

## Setup

First open Konsole (Start Menu -> System -> Konsole). To use the included SSH server on your Steam Deck you'll first want to set a root password. This is recommended to prevent unauthorized access to your Deck while the SSH server is active. If you have not yet set a root password use the `passwd` command. To open the keyboard simply hold the Steam button and press X. Now type in your password, press enter, repeat your password and press enter again.

```bash
$ passwd
New password:
Retype new password:
```

To start the SSH server run the following command in Konsole:

```bash
sudo systemctl start sshd
```

## Test Login

On your Deck run the `hostname -I` (that's a capitalized i) command to get your IP (usually something like 192.168.2.xxx). This address will be used to log into the SSH server. On your PC open a terminal and try to log into your deck:

```bash
ssh deck@192.168.2.xxx
```

You should see a password prompt asking you for the root password you set above. You should get a shell like `deck@steamdeck $` if the login succeeds. To exit simply type `exit` or press CTRL+D; you will be returned to your shell on your PC.

## Rsync

Now navigate to where your games are installed (the default path is `~/.steam/steam/steamapps/common`) and use ls to get a list of your games' folder names:

```bash
cd ~/.steam/steam/steamapps/common
ls
```

We will be using two rsync options to sync our games to the default path on the Deck:

- `-r` (recursive): This flag is required to sync directories
- `-P` (progress): This flag prints which files are getting synced and what the current progress is to your PC's shell. Useful so you can see that the sync is still running.

Note that folder names with spaces require `""` quotation marks!

```bash
# Examples of Portal and Untitled Goose Game
rsync -rP Portal deck@192.168.2.155:/home/deck/.steam/steam/steamapps/common
rsync -rP "Untitled Goose Game" deck@192.168.2.155:/home/deck/.steam/steam/steamapps/common
```

After the sync finishes you can return to Game Mode on your Deck. You'll now want to hit _Install_ on the games you have synced to tell Steam about it. Steam will find the synced files and verify their integrity.
