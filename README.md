# Skeleton Projetos Interno Sigfacil Angular

Projeto gerado com [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Pre-requisitos

-   Node 12.13.0
-   NPM 5.10.0

## Instalação

Faça o fork deste projeto e altere o nome de acordo com o definido.

```shell
npm install
npm run start
```

No comando start ou build a pasta é buildada, necessitando servir o diretório com virtualHost do apache. Busque seu
líder técnico ou arquiteto para auxiliar nisso. Não estando configurado isto deve executar: `ng serve` e abrir
`http://localhost:4200/sigfacil/skeleton/visualizar-processo`.

Adicione os remotes do git:

```shell
git remote add upstream git@gitlab....link-do-projeto-pai
git remote add skeleton git@gitlab.voxtecnologia.com.br:vox/front-end/skeleton-externo-angular.git
```

## Documentações

-   [Arquitetura do Skeleton](/docs/arquitetura.md)
-   [Construção de um projeto](/docs/construcao.md)
-   [Boas Práticas](/docs/boas-praticas.md)
-   [VirtualHost](/docs/vhost.md)
