# Blog

Este é um blog simples desenvolvido com Node.js e Express, que permite criar, editar, visualizar e excluir artigos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para construção de aplicações web em Node.js.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Bootstrap**: Framework CSS para estilização da interface.

## Funcionalidades

- Criar novos artigos
- Editar artigos existentes
- Excluir artigos
- Visualizar detalhes de cada artigo

## Instalação

Siga as etapas abaixo para configurar o projeto localmente:

1- Abra a pasta no Visual Studio Code.
2- Certifique-se de ter o Node.js instalado. Você pode baixá-lo aqui: `https://nodejs.org/pt`.
3- Abra o terminal e instale o express e o mongodb com o seguinte comando: `npm install express mongodb`.

## Conexão MongoDB

1- Abra o MongoDB e certifique-se de que ele está rodando em `localhost:27017`.
2- Se o endereço for diferente, abra o arquivo `app.js` e configure a conexão conforme abaixo:

Linha 5:
const url = 'mongodb://localhost:27017'; // Altere para sua URL de conexão

3- Crie um banco de dados com o nome 'blog'.

## Iniciar aplicação

Após a instalação e configuração do banco de dados, você pode iniciar o servidor usando `node app.js` no terminal.
O servidor será iniciado em `http://localhost:3000`.