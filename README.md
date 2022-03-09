# Skeleton Projetos Interno Sigfacil Angular

## Pre-requisitos

-   Node 12.18.2
-   NPM 5.10.0

## Requisitos

-   Assets Sigfácil
-   Sigfácil
-   Portal
-   Security
-   Projeto XXX Internal Service

## Instalação

Faça o fork deste projeto e altere o nome de acordo com o definido.

```shell
npm install
npm run start
```

No comando start ou build a pasta é buildada, necessitando servir o diretório com virtualHost do apache. Busque seu
líder técnico ou arquiteto para auxiliar nisso. Não estando configurado isto deve executar: `npm run dev` e abrir
`http://localhost:4200/sigfacil/skeleton/empresa`.

Adicione os remotes do git:

```shell
git remote add upstream git@gitlab....link-do-projeto-pai
git remote add skeleton git@gitlab.voxtecnologia.com.br:vox/front-end/skeleton-externo-angular.git
```

## Acesso

-   https://deve.voxtecnologia.com.br/sigfacil/skeleton/empresa - Visualizar Processo Skeleton
-   http://localhost:4200/sigfacil/skeleton/empresa

## Recomendações

-   Utilizar VSCode com as extensões `esbenp.prettier-vscode` e permitir a integração do ESLint do node_modules.
-   Executar `npm run lint:fix` antes de commitar e corrigir os erros
-   Não conseguindo resolver um erro de lint utilize o `disable-eslint-next-line` com a regra, mas antes
    [consulte a doc](https://eslint.org/docs/rules/)
-   [Outras recomendações...](https://gitlab.voxtecnologia.com.br/vox/front-end/docs-dev/blob/master/training/construcao.md)

## Mock API para testes

Enquanto não tiver a API pronta, pode se utilizar uma API fake através de um mock. Há um arquivo em `db/db.json` que em
cada primeiro nó do json representa um endpoint. Colocando os dados lá e chamando no service conforme exemplo abaixo,
obterá a partir do json server uma API fake com os principais métodos http. Ao fazer os ajustes rode em terminal
paralelo o comando: `npm run mock`.

```ts
private urlMock = 'http://localhost:3000/';

public getDadosInscricao = (solicitacao: number): Observable<any> => {
    return this.http.get(this.urlMock + 'inscricao');
    // return this.get(`inscricao/solicitacao/${solicitacao}`);
};
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

### Utilizar Jarvis ou Assets Sigfacil pelo Skeleton

-   Devido a política de CORS esses serviços só funcionam dentram de produtos vox, como localhost é teste, se faz
    necessário habilitar a
    [extensão de navegador CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
    durante os testes.

### Para não utilizar o Jarvis realize as seguintes remoções:

-   this.carregarJarvis() e this.commonService.getAllOptions() no src/app/app.component.ts
-   CommonService e JarvisInterceptor nos providers de src/app/app.module.ts
