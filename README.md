# Mapeamento Tecnológico dos Projetos Vox

## Pre-requisitos

-   `Node` 20.10.0
-   `npm` 6.14.16

<details>
<summary>Instalar node/npm</summary>

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install 20.10.0
npm install -g npm@6.14.16
```

</details>

## Requisitos

-   apache-files _(Link simbólico com vhosts e certificados SSL)_
    -   [Faça a vinculação com o script vhosts-update.](https://gitlab.voxtecnologia.com.br/vox/front-end/docs-dev/tree/master/scripts#vhosts-update-atualizando-os-arquivos-do-apache)
-   Feito o fork,
    [habilite o Shared Runners](https://gitlab.voxtecnologia.com.br/vox/front-end/docs-dev/blob/master/imersao/gitlab-ci.md#habilite-o-shared-runners)
    para execução das pipelines do Gitlab CI.

## Instalação

```shell
npm install

npm run start
# ou
npm run build
```

## Acesso

-   https://deve.voxtecnologia.com.br/skeleton/interno/visualizar-processo - Visualizar Processo Skeleton

## Tecnologias

-   Angular 17
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
    -   lib-vox-ui (Vox)
    -   lib-vox-shared-codes (Vox)
    -   lib-vox-grid (Vox)
    -   ngx-bootstrap v5
    -   font-awesome v5.13.1
    -   ngx-currency v2

## Recomendações

-   Utilizar VSCode com as extensões `dbaeumer.vscode-eslint esbenp.prettier-vscode` e permitir a integração do ESLint
    do node_modules.
-   Executar `npm run lint:fix` antes de commitar e corrigir os erros
-   Não conseguindo resolver um erro de lint utilize o `// eslint-disable-next-line` com a regra, mas antes
    [consulte a doc](https://eslint.org/docs/rules/).
-   [Recomendações na construção](https://gitlab.voxtecnologia.com.br/vox/front-end/docs-dev/blob/master/training/construcao.md)
-   [Arquitetura do projeto](https://gitlab.voxtecnologia.com.br/vox/front-end/docs-dev/blob/master/imersao/arquitetura.md)
-   [Solução de erros comuns](https://gitlab.voxtecnologia.com.br/vox/front-end/docs-dev/blob/master/imersao/issues.md)
