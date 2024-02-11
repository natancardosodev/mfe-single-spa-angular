| **Tópico**                 | **Descrição**                                                                               |
| :------------------------- | :------------------------------------------------------------------------------------------ |
| **Dependência de MR**      | <ul><li>MR 1</li><li>MR 2</li></ul>                                                         |
| **Problema / Necessidade** | Descreva o problema ou que foi solicitado fazer.                                            |
| **Regra**                  | Descreva um pouco a regra.                                                                  |
| **Documentação**           | Link                                                                                        |
| **O que foi feito?**       | <ul><li>Descreva o que realmente foi alterado</li><li>Pontos da solução empregada</li></ul> |
| **Página**                 | Link                                                                                        |
| **Dados do teste**         | Coloque o protocolo ou dados utilizados durante o teste local e o banco.                    |
| **Informações ao QA**      | Coloque o que deve ser testado e um passo a passo, caso seja necessário.                    |
| **Evidências**             | Imagem antes e depois, por exemplo                                                          |
| **Análise**                | @all                                                                                        |

#### Pontos de impacto da alteração

-   [ ] Consulta Prévia Localização

#### Nível de impacto

-   [ ] Liberação de Módulo para determinada UF
-   [ ] Adequação visual / textual
-   [ ] Pequena correção de issue
-   [ ] Estrutural do projeto, sem alterar a regra de negócio
-   [ ] Alteração Lógica ou Comportamental
-   [ ] Atualização de biblioteca / framework
-   [ ] Grande alteração visual
-   [ ] Correção de grande travamento

#### Checklist para projeto front

-   [ ] Executei `npm run lint:fix`, corrigi os erros e busquei corrigir ao máximo os warning
-   [ ] Executei `npm run build` para fins de teste caso tenha tido muitas alterações

#### Declarações

-   [ ] Declaro que realizei todos os testes que acredito serem necessários para esta alteração
-   [ ] Declaro que o teste não é cabivel de reprodução
