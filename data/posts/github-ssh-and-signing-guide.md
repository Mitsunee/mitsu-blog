---
title: Quick Guide to GitHub SSH and GPG Signing
date: 2022-09-13 11:15 UTC+2
description: >-
  Setup Guide for GitHub SSH and Git commit and tag signing using GPG.
tags:
  - Guide
  - Git
---

# Quick Guide to GitHub SSH and GPG Signing

GitHub SSH allows authenticating with GitHub's git servers via an SSH keypair. That way no login tokens are ever saved on your local machine. Setup is simple: generate a keypair, add it to your git config and give GitHub the public key. Similarly GPG Signing uses a GPG keypair to automatically sign your commits to confirm their authenticity. Git can even be configured to use different GPG keys based on the directory path!

## Setting up SSH

It is recommended to use separate SSH keypairs for every purpose, just like you would use unique passwords for every account. In your terminal of choice run the following command to start generating a new SSH keypair - replacing the example with an email address known to GitHub (you can add multiple addresses in your [Email Settings](https://github.com/settings/emails)):

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Save this key to `/home/YOUR_USER/.ssh/github_ed25519`. Using a passphrase is recommended as this key will grant access to your account - you can of course use a password manager like KeepassXC (see [below](#using-keepassxc-to-manage-ssh-keys)) for this. Next you will want to check if your ssh-agent is running so you can add your new key to it. At this point you can also print out your public key, which we will need in the next step!

```bash
eval `ssh-agent -s` # should respond with "Agent pid" followed by a number
ssh-add ~/.ssh/github_ed25519 # should prompt for your passphrase!
cat ~/.ssh/github_ed25519.pub # note the file extension for public key. NEVER share the private key!
```

## Adding the SSH key to GitHub

In your [SSH and GPG keys](https://github.com/settings/keys) settings you can now click "New SSH key" and paste your public key. You can title it something that lets you recognize which machine the key belongs to as you should be generating a separate keypair for each device. I usually use my hostname here.

You can now test your authentication by connecting to GitHub using ssh in your Terminal:

```bash
ssh -T git@github.com
```

This may prompt you to confirm the RSA key fingerprint of GitHub's servers. Check [the official documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints) if you'd like to confirm this fingerprint.

## Migrating to SSH Authentication

At this point you will want to switch all your local repositories to use SSH. Simply enter the directory of a local repository and use the following command:

```bash
git remote set-url git@github.com:GITHUB_USER/repo-name.git
```

You can also find this path on the GitHub page of your repository in the SSH tab when clicking the Clone button!

## Using KeepassXC to manage SSH keys

_(This step is optional)_

You can use [KeepassXC](https://keepassxc.org/) (also available on [flathub](https://flathub.org/apps/details/org.keepassxc.KeePassXC)) to manage SSH keys for you!

Enable the integration under Tools -> Settings -> SSH Agent and hit OK. Now when adding a New Entry you can open the SSH Agent tab and add your private key. It is recommended to enable the "Remove key from agent when database is closed/locked" setting. You can mess with the other settings as you wish. In the Entry tab add your key's passphrase as the Password of the entry and give it a nice title. If you like you can add `https://www.github.com` as the url and let KeepassXC fetch the favicon for you.

Now with your KeepassXC database open and unlocked you add and remove keys from the ssh-agent by rightclicking them in the list; passphrases are entered automatically.

## Setting up GPG

As with SSH we will generate a separate keypair for GitHub. Run the following command to generate a new GPG keypair:

```bash
gpg --full-gen-key
```

Use the `RSA (sign only)` key type with a size of `4096` and `2y` for 2 years of validity. Enter your GitHub username as your name. As your email address you can enter any address known to GitHub or the no-reply address provided in your [Email Settings](https://github.com/settings/emails).

You should now be able to list your GPG keys and see your new key and export the public key using its key ID:

```bash
gpg --list-secret-keys --keyid-format=long
# returns:
sec   rsa4096/KEYID_HERE 2022-01-01 [SC] [expires: 2024-01-01]
      REDACTED_REDACTED_REDACTED
uid         [ultimate] YourName <12346789+YourName@users.noreply.github.com>

gpg --armor --export KEYID_HERE
```

## Adding the GPG key to Github

In your GitHub [SSH and GPG Keys](https://github.com/settings/keys) settings page you can now hit New GPG key and copypaste this public key. **Note**: Do NOT delete old keys from this page. Doing so will mark all commits signed with that key as "Unverified" as GitHub will no longer recognize the key they were signed with.

## Configuring Git

Git needs to be configured to use the GPG key as well. Open your git config (on linux that is either `$XDG_CONFIG_HOME/git/config` or `~/.gitconfig`) in your text editor of choice and add the following configs (replace placeholders with the same details as your GPG key):

```git
[user]
        email = 123456789+YourName@users.noreply.github.com
        name = YourName
        signingKey = KEYID_HERE
[commit]
        gpgSign = true
[tag]
        gpgSign = true
```

_For Linux users_: This is a good time to move your git config file if you have set your `$XDG_CONFIG_HOME`.

```bash
mkdir -p $XDG_CONFIG_HOME/git
mv ~/.gitconfig $XDG_CONFIG_HOME/git/config
```

## Using a different Keys in specific Directories

If you work remotely you may be using a git server of your company/client. In this case you will want to repeat the steps above to generate separate SSH and GPG keys for this purpose using your real name (unless online aliases are permitted) or use the keys provided by the IT staff of your company according to their policies.

Git can include configs based on conditions such as the directory. In this example I will simply be using a "Work" directory in the home directory.

First copy the `[user]` section of your git config into a separate file (`.gitconfig_github` or similar) and create a similar file (`.gitconfig_work` or similar) with the details of your work GPG key. Now in your `.gitconfig` replace that section with the following (replacing the paths to match your own naming scheme):

```git
[include]
        path = ~/.gitconfig_default
[includeif "gitdir:~/Work/"]
        path = ~/.gitconfig_work
```
