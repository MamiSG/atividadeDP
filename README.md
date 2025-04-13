
# Sistema de Gerenciamento de RPG (JavaScript)

Este projeto é um sistema de gerenciamento de personagens e itens mágicos para jogos de RPG, desenvolvido em **JavaScript puro**

## Funcionalidades

### Personagens
Você pode:
- **Criar personagens** com os seguintes campos:
  - Nome do aventureiro
  - Classe (`Mago`, `Guerreiro`, `Arqueiro`, `Bardo` e `Ladino`)
  - Pontos de força
  - Pontos de defesa

- **Listar todos os personagens** cadastrados.
- **Excluir personagens** individualmente.

### Itens Mágicos
Você pode:
- **Criar itens mágicos** com os seguintes campos:
  - Nome do item
  - Tipo (`Arma`, `Armadura` ou `Amuleto`)
  - Pontos de força
  - Pontos de defesa

- **Vincular um item mágico a um personagem**.
- **Excluir itens mágicos** individualmente de cada personagem.

### Restrição de Amuletos
Cada personagem **só pode possuir 1 Amuleto**. Tentar adicionar mais de um resultará em uma mensagem de erro.

## Como Usar

1. Clone ou baixe o projeto.
2. Abra o arquivo `index.html` no navegador.
3. Use os formulários para:
   - Criar personagens
   - Adicionar itens aos personagens
4. Os personagens e itens serão listados dinamicamente na tela.
5. Use os botões para remover personagens ou itens.

## Exemplo de Uso

- Crie um **Guerreiro chamado Thoran**.
- Crie uma armadura **Armadura de Aço** e adicione ao Thoran.
- Crie um amuleto **Olho do destino** e adicione ao Thoran.
- crie outro amuleto **Pena dos ceus** e ao tentar adicionar ao Thoran, uma mensagem te alertará que não será possivel ter outro amuleto.

## Tecnologias Utilizadas

- JavaScript
- HTML5
- CSS3

## Organização do Código

- `index.html`: estrutura da interface.
- `style.css`: estilos básicos da aplicação.
- `script.js`: lógica principal do sistema.

## Autora

Desenvolvido por Mami - Liz Brito 🧙‍♀️ .  