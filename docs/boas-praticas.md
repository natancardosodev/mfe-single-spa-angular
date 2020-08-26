# Boas práticas de programação relacionado a este projeto

## Lint: Stylelint (.scss) e ESLint (.ts)

Sempre antes de submeter um Merge Request busque executar o comando `npm run lint:fix`, que fará uma análise estática do
código. Se houver algum erro, busque corrigir observando a documentação e execute o `npm run lint` para verificar se
está tudo certo.

### Extensões importantes no Visual Studio Code

Para facilitar as correções de lint instale as seguintes extensões: `dbaeumer.vscode-eslint esbenp.prettier-vscode`.
