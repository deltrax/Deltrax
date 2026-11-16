# Deltrax — banner e logo animados (GGMAX)

Estilo inspirado nas intros do logo antigo de Roblox: letras em bloco pretas caindo e quicando,
brilho passando nas letras, explosão de desenho animado, o bonequinho clássico acenando e
transições em círculo. O "A" de **DELTRAX** é um quadrado vermelho inclinado com furo preto
(como o "O" do logo antigo), e o mesmo quadrado é o ícone da marca.

As cores do quadrado ficam em `SQ_BODY` e `SQ_HOLE`, no começo de `src/deltrax-anim.html`.

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `banner.gif` | 1500×500, loop de 8 s | capa/banner do perfil |
| `banner-leve.gif` | 1000×334 | se o site recusar o arquivo por tamanho |
| `logo.gif` | 512×512, loop de 7 s | foto/avatar do perfil |
| `logo-leve.gif` | 256×256 | se o site recusar o arquivo por tamanho |
| `banner.png` / `logo.png` | estático | caso o site não aceite GIF animado |
| `banner.mp4` / `logo.mp4` | vídeo | redes sociais, Discord etc. |
| `banner-leve.mp4` / `logo-leve.mp4` | vídeo menor | 1000×334 e 256×256 |

O primeiro quadro de cada GIF já é a arte completa, então até a miniatura parada fica boa.
O logo deixa tudo dentro do círculo central, então pode ser cortado redondo.

## Editar e gerar de novo

- `src/deltrax-anim.html` — abra no navegador para ver a animação ao vivo. Textos como
  `CONTAS ROBLOX ANTIGAS` e as etiquetas (`OG`, `RARAS`, `CLÁSSICAS`) ficam nesse arquivo.
- `src/render.js` — exporta tudo de novo: `node src/render.js` (precisa de Node, Playwright e ffmpeg).

Fonte: [Lilita One](https://fonts.google.com/specimen/Lilita+One) (licença SIL Open Font License).
