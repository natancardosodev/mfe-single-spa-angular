# Micro-frontend Angular com Single-SPA

## Pre-requisitos

-   `Node` 20.10.0
-   `npm` 6.14.16
-   [Aplicativo contêiner](https://github.com/natancardosodev/root-config) com single-spa.

<details>
<summary>Instalar node/npm</summary>

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install 20.10.0
npm install -g npm@6.14.16
```

</details>

## Instalação

```shell
nvm install 20.10.0
nvm use 20
npm i --force

npm run start
# ou
npm run serve
# ou
npm run build
```

## Acesso

Acesso via [Projeto Root Config](https://github.com/natancardosodev/root-config)

-   https://mfe.testes.com/

## Observação sobre microfrontends

Esta aplicação só roda via single-spa que é uma estrutura para microfrontends. Para executar da forma normal terá que
ajustar o:

-   `tsconfig.app.json` (trocando o main.ts),
-   `angular.json` (trocando @angular-builders/custom-webpack:browser por @angular-devkit/build-angular:browser,
    trocando o main.ts e retirando o deployUrl),
-   `AppRoutingModule` (retirando o baseHref das rotas).

## Tecnologias

-   Angular 17
-   Single-SPA e single-spa-angular
-   Typescript 5.2
-   ES2022
-   Sass
-   Análise estática do código e formatação
    -   ESLint
        [(Necessário extensão VSCode)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    -   Stylelint
    -   Prettier
        [(Necessário extensão VSCode)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   Gitlab CI: pipeline para o lint
-   Sentry: monitoramento de erros
-   Estruturas de pasta principais:
    -   core: enuns, interfaces, utils, components base
    -   feature: components de páginas e serviços
    -   shared: diretivas e pipes
-   Bibliotecas importantes:
    -   ngx-bootstrap v5
    -   font-awesome v5.13.1
    -   ngx-currency v2

## Recomendações

-   Utilizar VSCode com as extensões `dbaeumer.vscode-eslint esbenp.prettier-vscode` e permitir a integração do ESLint
    do node_modules.
-   Executar `npm run lint:fix` antes de commitar e corrigir os erros
-   Não conseguindo resolver um erro de lint utilize o `// eslint-disable-next-line` com a regra, mas antes
    [consulte a doc](https://eslint.org/docs/rules/).
