---
title: "Map Wizard"
date: 2023-08-30T18:42:35-03:00
description: "A cross platform toolset for osu! mappers."
hideSummary: false
ShowWordCount: false
cover:
  image: "/code.svg"
  alt: "Project Logo"
  hidden: false
author: "Me"
draft: false
---

Cross-platfrom-first tools for osu! standard beatmaps (for now) written in TypeScript, using tauri and osu!lazer's logic as the foundation. It was done so we could have a mapping toolset solution that was friendly to run on Linux without the need of third party tools (aka. wine and VMs).

{{< button icon="external-link" text="Check it out on GitHub" href="https://github.com/maotovisk/map-wizard" >}}

### Built with

- Tauri
- TypeScript
- [osu-parsers](https://github.com/kionell/osu-parsers)

## Tools

- Hitsound Copier
- Metadata Manager

## TODOs

- Add map cleaner funcionality.
- Add support to persist the data.
- Add colourhax helper functionality.
- Fix some unnecessary greenlines being generated.
- Release to flathub.

<br/>

## Running

You can either grab the [latest release](https://github.com/octo-org/octo-repo/releases/latest) or build it by yourself.

### Building

If you wish to run the project on your local machine, follow the instructions below:

Requirements

- [NodeJS](https://nodejs.org/en) (18 or higher)
- [pnpm](https://pnpm.io/)
- [rust](https://rustup.rs/)

#### 1. Clone the project

```bash
git clone https://github.com/maotovisk/hitsound-copier.git
```

#### 2. Install the project's dependencies

```bash
pnpm install
```

#### 3. Run the project

```bash
pnpm tauri dev
```

## Special thanks

- OliBomby for buildig the [Mapping Tools](https://github.com/OliBomby/Mapping_Tools) project, which is the our main inspiration.
- kionell for building [this amazing library](https://github.com/kionell/osu-parsers) that we are using to parse the .osu files.
- Seto Kousuke for waiting for me to finish working on this to play some switch games.
