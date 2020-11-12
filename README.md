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
`http://localhost:4200/sigfacil/skeleton/empresa`.

Adicione os remotes do git:

```shell
git remote add upstream git@gitlab....link-do-projeto-pai
git remote add skeleton git@gitlab.voxtecnologia.com.br:vox/front-end/skeleton-externo-angular.git
```

## Rotas

```sql
select * from comum.s_sistema_funcionalidade where ds_url ilike '%funcionalidade%'; -- ou por ds_nome
```

O id de funcionalidade deve ser salvo em `src/app/core/enums/funcionalidade.enum.ts`.

A rota base conforme o exemplo 'funcionalidade-pai' é salvo em baseHref no `angular.json`.

As sub funções em: `src/app/app-routing.module.ts` e em `src/app/core/enums/rotas.enum.ts`

-   Caso só tem uma funcionalidade no projeto:
    -   https://deve.voxtecnologia.com.br/sigfacil/funcionalidade-pai/visualizar
    -   https://deve.voxtecnologia.com.br/sigfacil/funcionalidade-pai/visualizar/:processo

Será salvo no banco: /sigfacil/funcionalidade-pai/

E a validaPermissaoFuncionalidade() não é necessária nesse caso.

-   Caso tenha várias funcionalidades no projeto:
    -   https://deve.voxtecnologia.com.br/sigfacil/funcionalidade-pai/subfuncao/visualizar
    -   https://deve.voxtecnologia.com.br/sigfacil/funcionalidade-pai/subfuncao/visualizar/:processo
    -   https://deve.voxtecnologia.com.br/sigfacil/funcionalidade-pai/subfuncoes/visualizar
    -   https://deve.voxtecnologia.com.br/sigfacil/funcionalidade-pai/subfuncoes/visualizar/:processo

Será salvo no banco na coluna ds_url: `/sigfacil/funcionalidade-pai/subfuncao/` e
`/sigfacil/funcionalidade-pai/subfuncoes/`

Deve-se duplicar o `src/app/feature/pages/visualizar-processo`
