<h1 align="center">Blog</h1>
<p align="center">
  <img src="https://img.shields.io/badge/STATUS-CONCLUIDO-green?style=plastic">
  <img src="https://img.shields.io/github/stars/deboradrf?style=social">
</p>

### 📚 Descrição
Projeto desenvolvido para disciplina de Banco de Dados NoSQL, do curso de Análise e Desenvolvimento de Sistemas, que simula um blog que permite criar, editar, visualizar e excluir artigos.

### 🎨 Layout
<img src="https://github.com/user-attachments/assets/060175f6-a16f-4732-9f13-d81bf48ce683">

### ✔️ Tecnologias utilizadas
- ``Visual Studio Code``
- ``CSS``
- ``Bootstrap``
- ``JavaScript``
- ``Node.js``
- ``Express``
- ``MongoDB``

### ⚙️ Funcionalidades
- Criar novos artigos
- Editar artigos existentes
- Excluir artigos
- Visualizar detalhes de cada artigo

### 📁 Como executar
``1`` Abra a pasta do projeto no Visual Studio Code. <br>
``2`` Certifique-se de ter o Node.js instalado. Você pode baixá-lo aqui: `https://nodejs.org/pt`. <br>
``3`` Abra o terminal e instale o express e o mongodb com o seguinte comando: `npm install express mongodb`. <br>
``4`` Abra o MongoDB e certifique-se de que ele está rodando em `localhost:27017`. <br>
``5`` Se o endereço for diferente, abra o arquivo `app.js` e configure a conexão conforme abaixo: 

Linha 5:
const url = 'mongodb://localhost:27017'; // Altere para sua URL de conexão

``6`` Crie um banco de dados com o nome 'blog'.  <br>
``7`` Abra o terminal e inicie o servidor com `node app.js`. O servidor será iniciado em `http://localhost:3000`.  <br>
