# Portfólio — Giovanni Trivellato

Portfólio pessoal bilíngue criado para apresentar minha trajetória, habilidades, projetos de desenvolvimento e trabalhos de motion design.

O projeto combina uma interface inspirada na clareza visual dos produtos Apple com movimento sutil, navegação acessível e componentes reutilizáveis em HTML, CSS e JavaScript.

## Páginas

| Página | Português | English |
| --- | --- | --- |
| Início | [`index.html`](index.html) | [`pages/en/home.html`](pages/en/home.html) |
| Sobre mim | [`pages/about.html`](pages/about.html) | [`pages/en/about.html`](pages/en/about.html) |
| Habilidades | [`pages/skill.html`](pages/skill.html) | [`pages/en/skill.html`](pages/en/skill.html) |
| Projetos | [`pages/projects.html`](pages/projects.html) | [`pages/en/projects.html`](pages/en/projects.html) |
| Processo & inspirações | [`pages/inspirations.html`](pages/inspirations.html) | [`pages/en/inspirations.html`](pages/en/inspirations.html) |
| Contato | [`pages/contact.html`](pages/contact.html) | [`pages/en/contact.html`](pages/en/contact.html) |

O arquivo [`index.html`](index.html) contém a página inicial em português, sem redirecionamento. Para gerar as rotas sem `.html` e publicar na HostGator, veja [o guia de publicação](docs/publicacao.md).

## Recursos principais

- Layout responsivo para desktop, tablet e celular.
- Conteúdo completo em português e inglês.
- Menu flutuante com navegação, redes sociais e troca de idioma.
- Navegação lateral com indicação automática da seção ativa.
- Fundo em vídeo e suporte a movimento reduzido.
- Telas de entrada em vídeo específicas para cada página e idioma.
- Transições de página, animações de entrada e cursor personalizado.
- Storytelling por rolagem com referências visuais e comparação do processo criativo.
- Animações Lottie reversíveis em setas, menu, formulário e habilidades.
- Lottie Web compartilhado entre os controles animados.
- Formulário que prepara a mensagem no aplicativo de e-mail do visitante.
- Atalho `Esc` para retornar à página inicial.
- Rótulos acessíveis, foco visível e respeito a `prefers-reduced-motion`.

## Tecnologias

- HTML5 semântico
- CSS modular com propriedades personalizadas
- JavaScript em módulos ES
- Lottie Web
- SVGs locais para ícones de interface, tecnologias e redes
- WebP e WebM para mídia otimizada

## Estrutura

```text
portfolio/
├── index.html
├── pages/
│   ├── en/
│   ├── home.html
│   ├── about.html
│   ├── skill.html
│   ├── projects.html
│   ├── inspirations.html
│   └── contact.html
├── css/
│   ├── components/
│   ├── dist/
│   ├── utilities/
│   ├── pages/
│   ├── responsive/
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── inspirations/
│   └── contact/
├── js/
│   └── components/
├── imgs/
│   └── icons/
│       ├── apps/
│       ├── brands/
│       └── interface/
├── lotties/
├── loading-screens/
│   ├── pt/
│   └── en/
├── media/
├── scripts/
└── fonts/
```

Os arquivos principais de CSS, como [`css/main.css`](css/main.css), [`css/about.css`](css/about.css), [`css/skills.css`](css/skills.css), [`css/projects.css`](css/projects.css), [`css/inspirations.css`](css/inspirations.css) e [`css/contact.css`](css/contact.css), organizam os módulos usados por cada página. O comando abaixo reúne e minifica esses módulos em um único arquivo por página dentro de `css/dist/`:

```bash
npm run build:css
```

Edite os módulos CSS e execute esse comando antes de testar ou publicar o site.

## Animações Lottie

| Arquivo | Uso |
| --- | --- |
| `lotties/hamburger.json` | Abertura e fechamento do menu flutuante |
| `lotties/arrow.json` | Links internos, externos e retorno ao topo |
| `lotties/send.json` | Botão de envio do formulário |
| `lotties/iconsLottieSkill.json` | Card de motion para interfaces |

As animações interativas mudam de direção durante o movimento. Isso evita saltos quando o usuário passa rapidamente pelo elemento.

## Executar localmente

O projeto não exige instalação de dependências. Gere os arquivos CSS e execute o site por um servidor local:

```bash
npm run build
npm run preview
```

Depois, acesse:

```text
http://127.0.0.1:8000/
```

## Conteúdo externo

- [GitHub](https://github.com/trvzera)
- [Behance](https://www.behance.net/trvzera)
- [LinkedIn](https://www.linkedin.com/in/giovanni-trivellato-7662bb336/)
- [Instagram](https://www.instagram.com/trvzera/)
- [Site pessoal](https://www.trvzera.com.br/)

## Autor

Desenvolvido e desenhado por **Giovanni Trivellato**, estudante de Desenvolvimento Web & Mobile com foco em desenvolvimento iOS, interfaces e motion design.

<!-- This action will have consequences: siga @trvzera no Instagram e arrume mais alguma coisa para fazer da vida. -->
