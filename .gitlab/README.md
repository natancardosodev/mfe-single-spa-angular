## Git Lab Templates

### Escopo do Projeto

Esse projeto foi criado para centralizar os arquivos de templates para `issue`, `merge`, `ci` e `cd`

### Utilização

-   No projeto que for utilizar, acesse as configurações do fork do projeto
    -   Settings -> CI/CD -> clique em Expand em Runners -> Enable shared runners
-   Aguarde algumas horas para poder ter uma pipeline executada
-   A cada push nesse projeto será feito uma pipeline

##### Baixar esse template dentro do projeto que será adicionado:

_Obs.: Caso o projeto exista uma path com nome .gitlab remover!_

---

      cd /wsx/PROJETO
      git clone git@gitlab.wsxtecnologia.com.br:wsx/arquitetura/gitlab-templates.git .gitlab

---

##### BACK END

_Dependencias_

---

    composer req --dev phpmd/phpmd
    composer req --dev sebastian/phpcpd
    composer req --dev squizlabs/php_codesniffer
    composer req --dev symfony/phpunit-bridge

---

_Copiar o template do .gitlab-ci-back-end.yml para a raiz do projeto com nome .gitlab-ci.yml_

---

    cp .gitlab/ci/template/.gitlab-ci-back-end.yml .gitlab-ci.yml

---

_Alterar as variaveis dentro do arquivo .gitlab-ci.yml_

---

    CUSTOM_PROJECT_PATH: /wsx/portal
    SONAR_KEY_PROJECT: portal

---

##### FRONT END

###### Para projetos com novo padrão angular:

-   Copie os arquivos de .gitlab/ci/template-front para a raiz do projeto
    -   Verifique o arquivo stylelintrc adequado, considerando o .stylelintrc-antigo.json para projetos antigos, usando
        este retire o sufixo 'antigo'.
-   Retire as pastas template e os arquivos códigos não necessários
-   Verifique os arquivos a importar no include de .gitlab-ci.yml

###### Baixar esse template dentro do projeto que será adicionado:

_Dependencias_

---

    npm install --save-dev chromium-binary
    npm install --save-dev karma
    npm install --save-dev karma-chrome-launcher
    npm install --save-dev karma-cli
    npm install --save-dev karma-coverage-istanbul-reporter
    npm install --save-dev karma-jasmine
    npm install --save-dev karma-jasmine-html-reporter

---

_Copiar o template do .gitlab-ci-front-end.yml para a raiz do projeto com nome .gitlab-ci.yml_

---

    cp .gitlab/ci/template/.gitlab-ci-front-end.yml .gitlab-ci.yml

---

_Alterar as variaveis dentro do arquivo .gitlab-ci.yml_

---

    CUSTOM_PROJECT_PATH: wsx/GRUPO/PROJETO
    SONAR_KEY_PROJECT: analise-livro-front
    NPM_BUILD: build-gitlab-ci

---

##### MONOLITICO

###### Baixar esse template dentro do projeto que será adicionado:

_Dependencias_

---

    npm install --save-dev csslint
    npm install --save-dev eslint
    composer req --dev phpmd/phpmd
    composer req --dev sebastian/phpcpd
    composer req --dev squizlabs/php_codesniffer
    composer req --dev symfony/phpunit-bridge

---

_Copiar o template do .gitlab-ci-monolitico.yml para a raiz do projeto com nome .gitlab-ci.yml_

---

    cp .gitlab/ci/template/.gitlab-ci-monolitico.yml .gitlab-ci.yml

---

_Alterar as variaveis dentro do arquivo .gitlab-ci.yml_

---

    CUSTOM_PROJECT_PATH: wsx/GRUPO/PROJETO
    SONAR_KEY_PROJECT: assinatura-web

---

_Observe que os comando de execução de cada job está definido nad variaveis RUN, caso precise alterar o caminho onde se
encontra os executáveis pode fazê-lo_

_Você pode tambem não querer executar todos os jobs, basta remover ele na sessão include_
