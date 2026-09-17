# Portfólio — Giovanni Trivellato

Portfólio pessoal estático em desenvolvimento, com páginas em português e inglês.

## Páginas

| Conteúdo | Português | Inglês |
|---|---|---|
| Início | `pages/home.html` | `pages/en/home.html` |
| Sobre | `pages/about.html` | `pages/en/about.html` |

`index.html` é a entrada da raiz e encaminha para a home em português. As páginas de Habilidades, Projetos e Contato ainda não foram criadas; os atalhos na home são preparatórios.

## Estrutura

```text
index.html          Entrada do site
pages/              HTML das páginas, incluindo pages/en/
css/main.css        Estilos da home
css/about.css       Entrada dos estilos da página Sobre
css/about/           Conteúdo, navegação, botões e responsividade da página Sobre
css/components/      Menu flutuante compartilhado
css/global/          Regras gerais e fontes
css/utilities/       Cores, transições e controles
css/pages/           Layout de cada página
css/responsive/      Ajustes responsivos da home
js/                 Seletor de idioma, menu Sobre e controlador Lottie
lotties/            Animação local do menu
fonts/              Fontes locais
imgs/               Imagens e ícones
```

Abra `index.html` no navegador ou use um servidor local. O projeto não precisa de instalação ou etapa de build.

## Conteúdo em evolução

A página Sobre reúne apresentação, formação, desenvolvimento, motion/design e ferramentas. Seu menu lateral navega entre essas seções. O botão flutuante abre a navegação entre páginas e links externos nas páginas Sobre e Início. A animação usa `lotties/hamburger.json` com `lottie-web` carregado por CDN; se a biblioteca não carregar, permanece um ícone CSS funcional.
