+++
title = 'Screenshoting and uploading files to a file hosting service on Linux'
date = 2023-06-05T20:57:17-03:00
draft = false
ShowWordCount = false
+++

Based on the work found at [s-ul-curl-uploader](https://github.com/remanifest/s-ul-curl-uploader) and [this issue](https://github.com/flameshot-org/flameshot/issues/178#issuecomment-719898433), this is a bash script to quickly upload your flameshot screenshots into the [s-ul.eu](https://s-ul.eu) service.

## Dependencies

- flameshot
- curl
- libnotify
- xclip
- wl-clipboard
- jq

### Arch dependency installation

```
sudo pacman -S flameshot curl libnotify xclip wl-clipboard jq
```

## Installation

### Download

```
curl -o /home/$USER/.local/bin/sul-uploader https://gist.github.com/maotovisk/1a6a50c90982535bbaa69f6d8203ac74/raw/356f80ecc41587d09c0c68c84099c1c81f326002/sul-uploader
```

### The script

```bash
#!/bin/bash

app_name="S-UL"

# Dependencies: curl, notify-send, xclip, wl-clipboard, jq
function _notify()
{
    notify-send --expire-time 1000 \
        --app-name "$app_name" \
        --icon 'flameshot' \
        "$1" "$2"
}

store_directory=/home/$USER/s-ul
if [[ ! -e $store_directory ]]; then
    mkdir $store_directory
fi

current_date=`date +"%Y-%m-%d %H-%M-%S"`
filename="Screenshot_$current_date.png"
complete_path="${store_directory}/${filename}"

flameshot gui -r >> "$complete_path"

if [[ $(file --mime-type -b "$complete_path") != "image/png" ]]; then
    rm "$complete_path"
    _notify "$app_name" "Screenshot aborted" && exit 1
fi

key="YOUR_API_KEY_HERE"

method=POST
postURL=https://s-ul.eu/api/v1/upload
wizard=true
file="$complete_path"

actualsize=$(wc -c <"$file")
maxsize=209714177

if [ $actualsize -ge $maxsize ]; then
    _notify "\nSorry, your file is too large to be uploaded. Please try a smaller file.\n";
fi

_notify "$app_name" 'Uploading screenshot...'

read url < <(echo $(curl -s -X ""$method"" """$postURL""?key=""$key""&wizard=""$wizard""" -F"file=@\"""$file""\"" | jq -r '.url'))
if [ -z "$url" ]; then
    _notify "$app_name" "Error: Error while uploading"
else
    if [ $XDG_SESSION_TYPE = "x11" ]; then
        echo -n "$url" | xclip -selection clipboard
    else
        wl-copy "$url"
    fi
    _notify "$app_name" 'Success! The link was sent to your clipboard'
fi
```

### Installation

- Make it executable `chmod +x .local/bin/sul-uploader`
- Edit the file and put your s-ul API Key into the `key` variable at line 30, you can find your api key at https://s-ul.eu/account/configurations
- Add a new shortcut to run the script in yout desktop enviroment settings
  - Remember to add it with the full path `/home/$USER/.local/bin/sul-uploader`, since most DEs don't add .local/bin into $PATH by default.
