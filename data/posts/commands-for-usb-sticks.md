---
title: Helpful Linux Commands for USB Sticks and microSDs
date: 2022-10-05 20:33 UTC+2
description: >-
  Collection of Commands to help with interfacing with USB Sticks and microSD cards on Linux
tags:
  - Guide
  - Linux
---

# Helpful Linux Commands for USB Sticks and microSDs

This post serves as an intro to using USB Sticks and microSD cards in the Terminal as well as a collection of commands useful for troubleshooting. Please read at least the first section on Device Names before skipping ahead :)

## Device Names

In Linux the `/dev/` directory displays all the physical and virtual devices connected to your machine, which most importantly for this guide includes all storage devices. SATA harddrives are usually named something similar to _"sda"_ or _"sdb"_ with _"sda1"_ being (one of) the partion(s) on this drive, while NVME SSDs could be something like _"nvme0n1"_. The commands used in this guide will usually use partions of devices.

A very useful command to find your storage devices an partitions is `lsblk`:

```bash
$ lsblk -l
NAME                                      MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINTS
sda                                         8:0    0   2,7T  0 disk
sda1                                        8:1    0   128M  0 part
sda2                                        8:2    0   2,7T  0 part  /mnt/My-Storage
zram0                                     252:0    0     8G  0 disk  [SWAP]
luks-927619eb-f07f-4595-bc87-762b7d84a50a 253:0    0 337,2G  0 crypt /home
nvme0n1                                   259:0    0 465,8G  0 disk
nvme0n1p1                                 259:1    0   512M  0 part  /boot/efi
nvme0n1p2                                 259:2    0   128G  0 part  /
nvme0n1p3                                 259:3    0 337,3G  0 part
```

To find easily find the name of your USB Stick or microSD Card simply run the command before and after plugging in the storage medium or compare the SIZE column with what you expect. For the purpose of this guide we will assume that our USB stick's main partition is `devname-here1`.

## Mounting a partition

To mount a storage medium partition we will need an empty directory - commonly the `/mnt` directory is used for this purpose, but you can of course create one on your Desktop or in your home directory if you prefer. After creating the directory use `mount` to mount the partition:

```bash
sudo mkdir /mnt/USB-Stick # any name really, sudo needed for access to /mnt
sudo mount /dev/devname-here1 /mnt/USB-Stick
```

You should now be able to access your storage medium in the chosen location.

## Safely unmounting a partition

To unmount a partition simply use the `umount` command with either the device name or location where you mounted the partition:

```bash
sudo umount /mnt/USB-Stick
# or
sudo umount /dev/devname-here1
```

You may get an error if there are still processes doing operations on your device, such as your filemanager still being open or a terminal currently being at a location inside the mounted partition. To see a list of processes using your device run `lsof` with the either the device name or location where you mounted the partition:

```bash
lsof /mnt/USB-Stick
# or
lsof /dev/devname-here1
```

Note that you **must** safely unmount devices to prevent data corruption!

## Fixing broken filesystems

While there is an entire science to fixing broken filesystems a very useful command is `fsck`. If you encounter problems with the filesystem such as corrupted files you can try running `fsck -tvn /dev/devname-here1` on the partition. The command will guide you through what it wants to try and give you choices for dealing with broken files and similar issues. Note that it will not apply any changes until you confirm so as the last step. Should you not get a prompt it is likely that `fsck` did not detect your issue.

## Changing the name of your Storage Device

The `mlabel` command can be used to change the label (or name) of any FAT32 storage device:

```bash
mlabel -i /dev/devname-here1
```
