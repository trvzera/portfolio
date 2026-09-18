# Lotties para o portfólio

As entradas das seções ao rolar já estão implementadas com CSS e JavaScript. Os arquivos abaixo são animações pontuais para complementar o conteúdo.

## 1. `scroll-indicator.json`

- **Onde:** abaixo da apresentação na página de projetos.
- **Arte:** uma seta fina apontando para baixo, com um ponto azul que desce 8 px e volta à posição inicial.
- **Tela:** 64 × 64 px, fundo transparente.
- **Duração:** 1,8 s; loop com 1 s de pausa visual entre ciclos.
- **Cores:** preto `#1c1c1e` e azul `#0267ff`.
- **Comportamento:** toca apenas quando o indicador está visível. A direção e o formato devem ser legíveis no primeiro quadro, caso a pessoa prefira menos movimento.

## 2. `ios-process.json`

- **Onde:** seção Desenvolvimento da página Sobre.
- **Arte:** três traços desenham a moldura de um iPhone; um retângulo de interface e um pequeno símbolo de código surgem dentro dele. Ao final, fica uma tela estática limpa.
- **Tela:** 160 × 160 px, fundo transparente.
- **Duração:** 2,2 s; sem loop.
- **Cores:** preto `#1c1c1e`, cinza `#8e8e93` e um único detalhe azul `#0267ff`.
- **Comportamento:** toca uma vez quando a seção aparece na tela.

## 3. `boostio-pc.json`

- **Onde:** ao lado do texto do projeto BOOSTio, abaixo da logo.
- **Arte:** gabinete simples em linhas; placa, memória e ventoinha entram em sequência; um pequeno check azul conclui a montagem. O quadro final deve permanecer estático.
- **Tela:** 180 × 180 px, fundo transparente.
- **Duração:** 2,4 s; sem loop.
- **Cores:** preto `#1c1c1e`, azul `#0267ff` e cinza `#8e8e93`.
- **Comportamento:** toca uma vez quando o projeto aparece na tela.

Exporte em JSON pelo Bodymovin/Lottie, com formas vetoriais e fontes convertidas em curvas. Evite imagens incorporadas, efeitos de blur e expressões para manter os arquivos leves. Coloque os três arquivos na pasta `lotties/`.
