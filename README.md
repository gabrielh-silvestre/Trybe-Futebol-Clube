## O que foi desenvolvido

![Exemplo app front](assets/front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

No time de desenvolvimento do `TFC`, seu _squad_ ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar _- através do docker-compose -_ as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, você vai construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento deve **respeitar regras de negócio** providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

Para adicionar uma partida é necessário pessoa usuária e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazermos as atualizações das partidas.

O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
