| **Tópico**                | **Descrição**                                                                 |
| :------------------------ | :---------------------------------------------------------------------------- |
| **O que foi feito?**      | <ul><li>Descreva o que realmente foi alterado</li><li>Pontos feitos</li></ul> |
| **Regra / Documentação**  | Descreva um pouco a regra ou que foi solicitado fazer.                        |
| **Mantis**                | [XXXX](http://mantis.voxtecnologia.com.br/view.php?id=)                       |
| **Dependência de MR**     | MR                                                                            |
| **URL**                   | Link                                                                          |
| **Protocolo de Teste**    | Coloque o protocolo ou dados utilizados durante o teste local e o banco.      |
| **Informações para o QA** | Coloque o deve ser testado e um passo a passo, caso seja necessário.          |
| **Análise**               | @all                                                                          |
| **Evidências**            | Imagem antes e depois, por exemplo                                            |

#### Pontos de impacto da alteração

-   [ ] Junta Digital - Autenticação
-   [ ] Consulta Prévia Localização

#### Nível de impacto

-   [ ] Adequação visual / textual
-   [ ] Grande alteração visual
-   [ ] Lógica ou Comportamental
-   [ ] Correção de grande travamento
-   [ ] Estrutura do projeto, sem alterar a regra de negócio
-   [ ] Atualização de biblioteca / framework

#### Checklist para projeto front

-   [ ] Executei `npm run lint:fix`, corrigi os erros e busquei corrigir ao máximo os warning
-   [ ] Executei `npm run build` para fins de teste caso tenha tido muitas alterações

#### Declarações

-   [ ] Declaro que realizei todos os testes que acredito serem necessários para esta alteração
-   [ ] Declaro que o teste não é cabivel de reprodução
