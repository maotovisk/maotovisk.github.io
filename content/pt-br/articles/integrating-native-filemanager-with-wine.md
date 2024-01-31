+++
title = 'Integrando o explorador de arquivos nativo do linux com o Wine.'
date = 2022-09-30T20:24:04-03:00
draft = false
hideMeta = false
ShowWordCount = true
+++

Isto se destina principalmente a osu! mappers/storyboarders que precisam de uma maneira fácil de acessar as pastas de um mapa de osu! através do wine.

## Introdução

Este é um tutorial rápido sobre como você pode editar alguns arquivos de registro de vinho para fazer o vinho abrir o explorador de arquivos nativo do linux ao clicar no menu "Abrir pasta" em qualquer aplicativo que o utilize, uma vez que o aplicativo "explorer.exe" não se integra tão bem com o ambiente do linux.

O principal caso de uso para esta solução é o caso daqueles que precisam trabalhar com uma grande largura de banda de arquivos sendo movimentados e compartilhados/editados/alguma coisa que seja necessária para fazer com ele. <sup>eg. osu!mappers</sup>

## Fazendo o trabalho...

### 1. Obtendo as informações úteis

Antes de tudo, você precisa localizar o caminho para o seu prefixo osu!

- para pessoas que utilizam o script 'osu-wine', por padrão ele está localizado em `~/.local/share/osu-wine/WINE.win32`;
- para pessoas que utilizam lutris, é solicitado ao usuário no início do processo de instalação o caminho para o qual eles queriam instalar o osu.
- se você tiver um prefixo personalizado, você pode conhecer seu caminho.

#### IMPORTANTE: Builds customizadas do wine

Muitos osu! jogadores usam builds personalizadas do wine para alcançar uma melhor latência de áudio, se por acaso você fizer isso, por favor, obtenha o path da build customizada do wine.

### 2. Criando o wrapper do winepath no linux

#### IMPORTANTE: Lembre-se de ter certeza que `~/.local/bin/` está no seu PATH.

Criaremos um script shell em `~/.local/bin/` chamado `run_as_linux`:

```bash
#!/bin/sh

# This will remove a single quote (') that comes with the argument for some reason
truepath=${2::-1}

# This will execute the first argument with the unix path provided by the second argument
echo "$truepath" | sed -e 's/\\/\//g' -e 's/://' | sed -r 's/^.{1}//' | xargs -d \\n $1
```

#### IMPORTANTE:

- Lembre-se de substituir `/path/para/o/wine/customizado` por seu caminho do wine personalizado. Se você estiver utilizando o wine do sistema, substitua-o por apenas "wine".
- Após terminar de salvar o arquivo, lembre-se de definir corretamente suas permissões `chmod +x ~/.local/bin/run_as_linux`.

### 3. Editando o registro do WINE

Agora precisamos chamar o wrapper do winepath, para fazer isso, criaremos uma nova entrada de registro para o comando `Open folder`.

Após abrir o registro do wine (regedit) com `WINEPREFIX=/path/para/o/prefixo/do/osu/ wine regedit`, faremos os seguintes passos para criar a associação com o wrapper:

**IMPORTANTE:** Lembre-se de substituir `/path/para/o/prefixo/do/osu/` pelo caminho para seu prefixo da instalação do osu! .

1. Crie uma chave "command" dentro da pasta `HKEY_CLASSES_ROOT\folder\shell\open`;
1. Apague a chave `ddeexec` em `HKEY_CLASSES_ROOT\folder\shell\open`;
1. Defina o valor `(Padrão)` para `/bin/sh run_as_linux NATIVE_FILE_MANAGER "%1"`.
   **IMPORTANTE:** Lembre-se de substituir `NATIVE_FILE_MANAGER` pelo binário de seu gerenciador de arquivos nativo (por exemplo: nautilus, dolphin, thunar, etc.).

## Pronto

Agora você pode abrir sua pasta de beatmap (ou qualquer outra pasta) em seu explorador de arquivos nativo do osu!

##

#### Referências

- [FAQ do Wine](https://wiki.winehq.org/FAQ#How_do_I_launch_native_applications_from_a_Windows_application.3F)
- [Este post](https://unix.stackexchange.com/a/144330)
- openglfreak

Traduzido com a versão gratuita do tradutor - www.DeepL.com/Translator - adaptado e revisado por maot.
