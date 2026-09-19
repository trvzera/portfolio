# Brief de animações Lottie

As animações devem funcionar como microinterações da interface. O primeiro e o último quadro precisam ser desenhos completos, porque o site pode interromper ou inverter a direção durante o hover.

## Prioridade 1 — ícones das habilidades

### `skill-mobile.json`

- **Uso:** card “Desenvolvimento mobile”.
- **Desenho:** contorno de um iPhone com duas camadas de interface. No hover, uma camada sobe, a outra desce e um pequeno símbolo Swift aparece no centro.
- **Tamanho:** 96 × 96 px.
- **Duração:** 28 a 34 frames em 30 fps.
- **Interação:** quadro inicial parado; avança no hover e retorna com `setDirection(-1)` ao sair.

### `skill-code.json`

- **Uso:** card “Front-end”.
- **Desenho:** os caracteres `</>` se separam e três linhas de interface são desenhadas entre eles.
- **Tamanho:** 96 × 96 px.
- **Duração:** 24 a 30 frames em 30 fps.
- **Interação:** mesma lógica reversível do ícone mobile.

### `skill-motion.json`

- **Uso:** card “Motion para interfaces”.
- **Desenho:** dois pontos de uma curva Bézier movimentam as alças; a curva termina formando um pequeno botão de play.
- **Tamanho:** 96 × 96 px.
- **Duração:** 32 a 38 frames em 30 fps.
- **Interação:** reage ao hover e ao foco do teclado.

Esses três arquivos formam um conjunto visual e devem usar a mesma espessura de traço.

## Prioridade 2 — envio do formulário

### `contact-send.json`

- **Uso:** botão “Preparar e-mail”.
- **Desenho:** envelope fechado; no hover ele abre e uma seta curta sai na diagonal. Ao sair, tudo retorna ao envelope.
- **Tamanho:** 64 × 64 px.
- **Duração:** 26 a 32 frames em 30 fps.
- **Interação:** reversível por direção, sem loop.

## Prioridade 3 — projeto BOOSTio

### `boostio-build.json`

- **Uso:** próximo da descrição do projeto BOOSTio.
- **Desenho:** gabinete em linha; placa, memória e ventoinha encaixam em três etapas; um check azul conclui a montagem.
- **Tamanho:** 160 × 160 px.
- **Duração:** 60 a 72 frames em 30 fps.
- **Interação:** toca quando o projeto entra na tela; retorna ao início quando sai para poder repetir no próximo scroll.

## Prioridade 4 — estados da página de contato

### `contact-status.json`

- **Uso:** área de retorno do formulário, quando existir envio direto pelo site.
- **Segmentos:** `idle` com um ponto; `sending` com três pontos; `success` formando um check; `error` formando um sinal de atenção.
- **Tamanho:** 80 × 80 px.
- **Duração:** até 24 frames por segmento.
- **Interação:** controlada por segmentos nomeados no After Effects.

## Padrão de exportação

- Fundo transparente.
- Preto `#1c1c1e`, cinza `#8e8e93` e azul `#0267ff` apenas nos detalhes importantes.
- Formas vetoriais; textos convertidos em curvas.
- Sem imagens incorporadas, blur, sombras rasterizadas ou expressões.
- Evitar loop contínuo nos cards.
- Manter cada JSON abaixo de 80 KB quando possível.
- Exportar pelo Bodymovin/LottieFiles e testar em SVG antes de entregar.
