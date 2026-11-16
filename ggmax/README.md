# Deltrax — banner e logo animados (GGMAX) · v2

Identidade inspirada no Roblox clássico (2008–2012), em vermelho, preto e branco.

- **Símbolo:** quadrado inclinado (a geometria do logo antigo do Roblox) com o miolo
  vazado em forma de **D**. Ele também é a primeira letra do nome: **[D]ELTRAX**.
- **Nome:** letras em bloco refeitas, com espaçamento ajustado par a par, contorno branco
  e volume vermelho-escuro (efeito de peça 3D).
- **Fundo:** luz vermelha com textura de *studs* (as bolinhas das peças antigas) e explosão branca.
- **Boneco:** o noob clássico com sombreado e a estampa do símbolo na camisa.

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

- `src/deltrax-anim.html` — abra no navegador para ver a animação ao vivo. Os textos
  (`CONTAS ROBLOX ANTIGAS`, `OG`, `RARAS`, `CLÁSSICAS`) ficam nesse arquivo.
- `src/render.js` — exporta tudo de novo: `node src/render.js` (precisa de Node, Playwright e ffmpeg).

Fonte dos textos secundários: [Inter](https://fonts.google.com/specimen/Inter) (licença SIL Open Font License).
A primeira versão (com o Δ) continua no histórico do git.
