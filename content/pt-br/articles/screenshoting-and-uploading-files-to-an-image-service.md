+++
title = 'Enviando capturas de tela para um serviço de hospedagem de arquivos no linux automaticamente'
date = 2023-06-05T20:57:17-03:00
draft = false
hideMeta = false
+++

Com base no trabalho encontrado em [s-ul-curl-uploader](https://github.com/remanifest/s-ul-curl-uploader) e [neste problema](https://github.com/flameshot-org/flameshot/issues/178#issuecomment-719898433), este é um script bash para fazer o upload rápido de capturas de tela do Flameshot para o serviço [s-ul.eu](https://s-ul.eu).

## Dependências

- flameshot
- curl
- libnotify
- xclip
- wl-clipboard
- jq

### Instalação de dependências no Arch

```
sudo pacman -S flameshot curl libnotify xclip wl-clipboard jq
```

## Instalação

### Download automático

```
curl -o /home/$USER/.local/bin/sul-uploader https://gist.github.com/maotovisk/1a6a50c90982535bbaa69f6d8203ac74/raw/356f80ecc41587d09c0c68c84099c1c81f326002/sul-uploader
```

### O script

```bash
#!/bin/bash

nome_aplicativo="S-UL"

# Dependências: curl, notify-send, xclip, wl-clipboard, jq
function _notificar()
{
    notify-send --expire-time 1000 \
        --app-name "$nome_aplicativo" \
        --icon 'flameshot' \
        "$1" "$2"
}

diretorio_armazenamento=/home/$USER/s-ul
if [[ ! -e $diretorio_armazenamento ]]; then
    mkdir $diretorio_armazenamento
fi

data_atual=`date +"%Y-%m-%d %H-%M-%S"`
nome_arquivo="Screenshot_$data_atual.png"
caminho_completo="${diretorio_armazenamento}/${nome_arquivo}"

flameshot gui -r >> "$caminho_completo"

if [[ $(file --mime-type -b "$caminho_completo") != "image/png" ]]; then
    rm "$caminho_completo"
    _notificar "$nome_aplicativo" "Captura de tela cancelada" && exit 1
fi

chave="SUA_CHAVE_API_AQUI"

metodo=POST
url_post="https://s-ul.eu/api/v1/upload"
assistente=true
arquivo="$caminho_completo"

tamanho_real=$(wc -c <"$arquivo")
tamanho_maximo=209714177

if [ $tamanho_real -ge $tamanho_maximo ]; then
    _notificar "\nDesculpe, seu arquivo é muito grande para ser enviado. Por favor, tente um arquivo menor.\n"
fi

_notificar "$nome_aplicativo" 'Enviando captura de tela...'

read url < <(echo $(curl -s -X ""$metodo"" """$url_post""?key=""$chave""&wizard=""$assistente""" -F"file=@\"""$arquivo""\"" | jq -r '.url'))
if [ -z "$url" ]; then
    _notificar "$nome_aplicativo" "Erro: Erro ao enviar"
else
    if [ $XDG_SESSION_TYPE = "x11" ]; then
        echo -n "$url" | xclip -selection clipboard
    else
        wl-copy "$url"
    fi
    _notificar "$nome_aplicativo" 'Sucesso! O link foi enviado para a sua área de transferência'
fi
```

### Instalação

- Torne-o executável \`chmod +x .local/bin/sul-uploader\`
- Edite o arquivo e coloque sua Chave API do s-ul na variável \`key\` na linha 30, você pode encontrar sua chave API em https://s-ul.eu/account/configurations
- Adicione um novo atalho para executar o script nas configurações do seu ambiente de desktop
  - Lembre-se de adicioná-lo com o caminho completo \`/home/$USER/.local/bin/sul-uploader\`, já que a maioria dos ambientes de desktop não adiciona .local/bin ao $PATH por padrão.
