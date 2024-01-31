+++
title = 'Integrating the system native file manager with Wine'
date = 2022-09-30T20:24:04-03:00
draft = false
hideMeta = false
ShowWordCount = true
+++

This is mostly aimed at osu! mappers/storyboarders who need an easy way to access osu! beatmap folders through wine.

## Introduction

This is a quick tutorial on how you can edit some wine registry files to make wine open the native linux file explorer when clicking the `Open folder` menu on whatever application uses it, since the `explorer.exe` application doesn't integrate that well with the linux environment.

The main use-case for this workaround is the case of those who need to work with a high bandwidth of files being moved around and shared/edited/whatever it's needed to do with it. <sup>eg. osu!mappers</sup>

## Doing it...

### 1. Getting the useful info

First of all, you need to locate the path to your osu! prefix:

- for people using the `osu-wine` script, by default it's located at `~/.local/share/osu-wine/WINE.win32`;
- for people using lutris, it is asked to the user at the beginning of the installation process the path they wanted to install osu to;
- if you have a custom prefix, you may know its path.

#### IMPORTANT: Custom wine builds

Many osu! players use custom wine builds to achieve better audio latency, if you happen to do so, please get the path of the custom wine build.

### 2. Creating the linux winepath wrapper

#### IMPORTANT: Remember to make sure `~/.local/bin/` is in your PATH envvar.

We will create a shell script on `~/.local/bin/` named `run_as_linux`:

```bash
#!/bin/sh

# This will remove a single quote (') that comes with the argument for some reason
truepath=${2::-1}

# This will execute the first argument with the unix path provided by the second argument
echo "$truepath" | sed -e 's/\\/\//g' -e 's/://' | sed -r 's/^.{1}//' | xargs -d \\n $1
```

#### IMPORTANT:

- Remember to replace `/path/to/custom/wine/` with your custom wine path. If you're using the system wine, replace it with just `wine`;
- After finishing saving the file, remember to set its permissions correctly `chmod +x ~/.local/bin/run_as_linux`.

### 3. Editing Wine Registry

Now we need to set up the wine prefix to call the wrapper from the application running inside it, to do that, we will create a new registry entry for the `Open folder` command.

After opening wine registry (regedit) with `WINEPREFIX=/path/to/osu/prefix wine regedit`, we will do the following steps to create the association with the wrapper:

**IMPORTANT:** Remember to replace `/path/to/osu/prefix` with the path of your osu! installation wineprefix.

1. Create a `command` key inside `HKEY_CLASSES_ROOT\folder\shell\open`;
1. Delete the `ddeexec` key in `HKEY_CLASSES_ROOT\folder\shell\open`;
1. Set the `(Default)` value to `/bin/sh run_as_linux NATIVE_FILE_MANAGER "%1"`;

**IMPORTANT:** Remember to replace `NATIVE_FILE_MANAGER` with your native file manager binary (eg. nautilus, dolphin, thunar, etc.) or `xdg-open`.

## Done

Now you're able to open your beatmap folder (or every other folder) into your native file explorer from osu!

##

### References

- [Wine FAQ](https://wiki.winehq.org/FAQ#How_do_I_launch_native_applications_from_a_Windows_application.3F)
- [This post](https://unix.stackexchange.com/a/144330)
- openglfreak
