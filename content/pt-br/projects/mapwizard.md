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

Uma ferramenta de mapping multiplataforma para beatmaps do osu! standadard, escrita em TypeScript. Utiliza Tauri e a lógica do osu!lazer como base, permitindo que ela seja executada no Linux sem a necessidade de ferramentas de terceiros, como o Wine ou VMs. A ferramenta inclui recursos como o Hitsound Copier e o Metadata Manager.

{{< button icon="external-link" text="Confira no GitHub" href="https://github.com/maotovisk/map-wizard" >}}

### Construído com

- Tauri
- TypeScript
- [osu-parsers](https://github.com/kionell/osu-parsers)

## Ferramentas

- Hitsound Copier
- Metadata Manager

## Tarefas pendentes

- Adicionar funcionalidade de Map Cleaner.
- Adicionar suporte para persistir os dados.
- Adicionar funcionalidade auxiliar de ColourHax.
- Corrigir algumas linhas verdes desnecessárias sendo geradas.
- Lançar no flathub.

## Executando

Você pode obter a [última versão](https://github.com/octo-org/octo-repo/releases/latest) ou compilá-la você mesmo.

### Compilando

Para executar o projeto em sua máquina local, siga as instruções abaixo:

Requisitos

- [NodeJS](https://nodejs.org/en) (18 ou superior)
- [pnpm](https://pnpm.io/)
- [rust](https://rustup.rs/)

#### 1. Clonar o projeto

```bash
git clone https://github.com/maotovisk/hitsound-copier.git
```

#### 2. Instalar as dependências do projeto

```bash
pnpm install
```

#### 3. Executar o projeto

```bash
pnpm tauri dev
```

## Agradecimentos especiais

- OliBomby por construir o projeto [Mapping Tools](https://github.com/OliBomby/Mapping_Tools), nossa principal inspiração.
- kionell por criar [essa incrível biblioteca](https://github.com/kionell/osu-parsers) que usamos para parsear os arquivos .osu.
