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
líder técnico ou arquiteto para auxiliar nisso.

Adicione os remotes do git:

```shell
git remote add upstream git@gitlab....link-do-projeto-pai
git remote add skeleton git@gitlab.voxtecnologia.com.br:vox/front-end/skeleton-externo-angular.git
```

## Lint: Stylelint (.scss) e ESLint (.ts)

Sempre antes de submeter um Merge Request busque executar o comando `npm run lint:fix`, que fará uma análise estática do
código. Se houver algum erro, busque corrigir observando a documentação e execute o `npm run lint` para verificar se
está tudo certo.

### Configurações do Lint no Visual Studio Code

Para facilitar as correções de lint instale as seguintes extensões: `dbaeumer.vscode-eslint esbenp.prettier-vscode`.

## Sobre o projeto

O projeto tem finalidade de trazer uma pré configuração da estrutura dos principais componentes e serviços utilizados
para montar o layout interno do SigFácil. Trazendo com ele
[libs](https://gitlab.voxtecnologia.com.br/?sort=latest_activity_desc&utf8=%E2%9C%93&name=lib-&sort=latest_activity_desc)
internas da Vox que darão a base do sistema.

#### As três principais libs que dão identidade visual do projeto são:

---

-   **1** - [Lib-header](https://gitlab.voxtecnologia.com.br/vox/bibliotecas/front-end/lib-vox-header)
-   **2** - [Lib-menu](https://gitlab.voxtecnologia.com.br/vox/bibliotecas/front-end/lib-vox-menu)
-   **3** - [Lib-footer](https://gitlab.voxtecnologia.com.br/vox/bibliotecas/front-end/lib-vox-menu)

> Abaixo um exemplo visual da disposição dessas libs

![skeleton-interno-angular](/uploads/0bf87ede4478c02c59f0d49d3a90374d/skeleton-interno-angular.png)

Essa é a tela base do projeto, na área do conteúdo principal será acrescentado as funcionalidades da nova aplicação.

#### Gráfico de estrutura base

---

Veja o gráfico da estrutura de libs e components presentes no projeto base

```mermaid
  graph TD
  A[Aplicação] -->|Página Principal|root[HTML - APP]
  root -->|Lib|LB-vlg(vox-loading-global)
  root -->|Lib|LB-a(lib-alert)
  root -->|Lib|LB-h(lib-header)
  root -->|Conteúdo Principal|CONT-PRINCIPAL{router-outlet}
  root -->|Lib|LB-m(lib-menu)
  root -->|Component|app-breadcrumbs
  root -->|lib|LB-f(lib-footer)
```

---

#### Serviços

Para popular os componentes foram criado alguns mocks, quando for substituir os links dos mocks por end-point da api,
seguir o mesmo padrão de estrutura. Os mocks encontran-se no arquivo `src/app/services/user.service.ts`

Veja abaixo os endpoints nescessários:

[Lib-header](https://gitlab.voxtecnologia.com.br/vox/bibliotecas/front-end/lib-vox-header)

-   Dados do sistema, função `getSystem()` [Exemplo de estrutura](https://www.mocky.io/v2/5b645c5b2e00008d00414025)
-   Dados do usuário logado, função `getUser()` [Exemplo de estrutura](https://www.mocky.io/v2/5b23f0fb2f00007d00e097c4)
-   Logo do sistema, função `getPathLogo()` [Exemplo de estrutura](https://www.mocky.io/v2/5c98e8913200007402d906ab)
-   Hora do sistema, função `getTime()` [Exemplo de estrutura](https://www.mocky.io/v2/5b63630630000052006503ef)

[Lib-menu](https://gitlab.voxtecnologia.com.br/vox/bibliotecas/front-end/lib-vox-menu)

-   Módulos do menu, função `getModulos()` [Exemplo de estrutura](https://www.mocky.io/v2/5e16301b34000070eb406a2c)

## Exemplo de implementação de uma funcionalidade

Foi implementado uma nova funcionalidade para ter um exemplo de uso de outras Libs da vox, a estrutura dela é essa:

```mermaid
  graph TD
  CONT-PRINCIPAL{router-outlet}
  CONT-PRINCIPAL -->|Component|FUNCIONALIDADE[funcionalidade]
  FUNCIONALIDADE -->|Component|PESQUISA[pesquisa-form]
  FUNCIONALIDADE -->|lib|LB-g(vox-grid)
  FUNCIONALIDADE -->|Component|VISUALIZARPES[visualizar-pesquisa]
  PESQUISA -->|Component|INPUT-DATE[app-input-date]
  VISUALIZARPES -->|lib|LB-cards(lib-cards)
  VISUALIZARPES -->|Component|COMP-CARD-OF[app-card-oficio]
  VISUALIZARPES -->|Component|COMP-CARD-DOC[app-card-documentos]
  COMP-CARD-DOC -->|lib|LB-cards-up(lib-card-upload)
  COMP-CARD-OF -->|Component|LB-card-panel[app-card-panel]
```
