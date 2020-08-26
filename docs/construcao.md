# Passo a passo de construção de projetos com o Skeleton

## Criação de projeto

-   Criação de projeto no grupo adequado, colocando o nome do projeto terminando em internal-front.
-   Solicitar a arquiteto ou líder técnico para criar o readme do projeto, para que esteja liberado o acesso.
-   Crie uma branch com nome relacionado a sprint e definido pelo Dev Team.
-   Realize o fork do projeto e adicione os dois remotes abaixo, um do skeleton e outro do projeto utilizado.

```
git remote add upstream git@gitlab.voxtecnologia.com.br:vox/GRUPO/PROJETO-internal-front.git
git remote add skeleton git@gitlab.voxtecnologia.com.br:vox/front-end/skeleton-interno-angular.git
```

## Definir termos

-   URL Projeto: https://deve.voxtecnologia.com.br/sigfacil/projeto
-   URL API: https://deve-nova-funcionalidade-service.voxtecnologia.com.br
-   Mapear funcionalidades para serem inseridas no banco na tabela (`comum.s_sistema_funcionalidade`) quanto a descrição
    e url, como:
    -   Descrição: Solicitar Parecer Pessoa Fisica
    -   URL: /sigfacil/pessoa-fisica/parecer
-   Dar permissão a algum usuário para tal(is) funcionalidade(s).

## Alterações iniciais de nomenclatura

-   Trocar tudo relacionado ao skeleton para o nome do projeto no: angular.json, package.json, package-lock.json,
    readme, app.component.spec.ts, app.e2e-spec.ts.
-   Trocar `nova-funcionalidade-service` por url da API.
-   Colocar as funcionalidades definidas com id cadastrado no banco em `src/app/core/enums/funcionalidade.enum.ts`.

## Mapear criações

-   **Interfaces** _(src/app/core/interfaces)_ - Para cada tipagem de valores enviados no corpo do request e response
    (dados a mais no response coloca opcional), como também quando há diversas propriedades num query parameter.
-   **Classes model** _(src/app/core/models)_ - Para cada corpo de request de post/put
-   **Pages Features** _(src/app/feature/pages)_ - Funcionalidades descritas nos cenários da documentação, para cada uma
    deve ser criada uma pasta em pages contendo componente pai da funcionalidade e subcomponentes pesquisa-form e
    visualizar-pesquisa.
    -   Deve ser copiado de uma funcionalidade existente, alterando o path da pasta e componente raiz.
    -   Essa funcionalidade deve ser mapeada também em: `src/app/app-routing.module.ts`,
        `src/app/core/enums/rotas.enum.ts` e `src/app/core/enums/funcionalidades.enum.ts`
-   **Services** _(src/app/feature/services/\*)_ - Cada enpoint deve ser mapeado de acordo com um grupo de endpoints.
-   **CommonService** _(src/app/core/services/common.service.ts)_ - Mapear todos os endpoints GET sem query parameters.
    Geralmente são os combobox.
-   **Forms** - Criação de form dentro do component especifico, colocando cada campo de formulário declarado na página.
-   **Rotas de verificação da aplicação** - Estando ok a autentitação, vhost, funcionalidade no banco e permissão, pode
    ser removido os mockys em `src/app/core/services/user.service.ts`.
-   **Cards** _(src/app/core/components)_ - Cada card pode ser criado separadamente nessa página, se o endpoint for
    individual ou no próprio component da feature se o endpoint for pela página.
