const articlesList = document.getElementById('articlesList');
const form = document.getElementById('articleForm');
const messageDiv = document.getElementById('message');
const editForm = document.getElementById('editForm');

// ----------------- Funções para Listar Artigos ----------------- //

listArticles();

async function listArticles() {
    const response = await fetch('/api/articles');
    const articles = await response.json();
    articlesList.innerHTML = '';

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card mt-4';
        card.innerHTML = `
            <div class="card-body">
                <h6 class="card-subtitle text-muted mb-2">
                    ${article.category.toUpperCase()}
                </h6>
                <h4 class="card-title">
                    ${article.title}
                </h4>
                <div class="card-subtitle text-muted mb-2">
                    <p>${new Date(article.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <div class="card-text mb-2">
                    ${article.description}
                </div>
                <a href="/show.html?id=${article._id}" class="btn btn-primary btn-sm">Ler mais</a>
                <a href="/edit.html?id=${article._id}" class="btn btn-warning btn-sm">Editar</a>
                <button class="btn btn-danger btn-sm" onclick="deleteArticle('${article._id}')">Deletar</button>
            </div>
        `;
        articlesList.appendChild(card);
    });
}

// ----------------- Funções para Adicionar Artigos ----------------- //

async function addArticle(category, title, description) {
    const response = await fetch('/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, title, description }),
    });
    return response;
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const category = document.getElementById('category').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        const response = await addArticle(category, title, description);

        if (response.ok) {
            messageDiv.innerHTML = '<p class="text-success">Artigo adicionado com sucesso!</p>';
            form.reset(); // Limpa o formulário
            listArticles(); // Atualiza a lista de artigos
        } else {
            messageDiv.innerHTML = '<p class="text-danger">Erro ao adicionar o artigo.</p>';
        }
    });
}

// ----------------- Funções para Mostrar Artigos ----------------- //

function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function readArticle() {
    const id = getArticleIdFromUrl();
    const response = await fetch(`/api/articles/${id}`);
    const article = await response.json();
    
    document.getElementById('title').innerText = article.title;
    document.getElementById('category').innerText = `${article.category}`;
    document.getElementById('createdAt').innerText = `${new Date(article.createdAt).toLocaleDateString('pt-BR')}`;
    document.getElementById('description').innerText = article.description;
}

if (document.location.pathname === '/show.html') {
    readArticle();
}

// ----------------- Funções para Editar Artigos ----------------- //

async function loadArticle() {
    const id = getArticleIdFromUrl();
    if (!id) {
        console.error('ID inválido');
        return;
    }
    const response = await fetch(`/api/articles/${id}`);
    if (response.ok) {
        const article = await response.json();
        document.getElementById('category').value = article.category || '';
        document.getElementById('title').value = article.title || '';
        document.getElementById('description').value = article.description || '';
    } else {
        console.error('Erro ao carregar artigo:', response.statusText);
    }
}

async function editArticle(id, category, title, description) {
    const response = await fetch(`/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, title, description }),
    });
    return response;
}

if (editForm) {
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = getArticleIdFromUrl();
        const category = document.getElementById('category').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        const response = await editArticle(id, category, title, description);

        if (response.ok) {
            messageDiv.innerHTML = '<p class="text-success">Artigo atualizado com sucesso!</p>';
        } else {
            messageDiv.innerHTML = '<p class="text-danger">Erro ao atualizar o artigo.</p>';
        }
    });

    loadArticle();
}

// ----------------- Funções para Deletar Artigos ----------------- //

async function deleteArticle(id) {
    const response = await fetch(`/${id}`, {
        method: 'DELETE',
    });
    listArticles();
}

// ----------------- Funções para Listar Estatísticas ----------------- //

async function listStats() {
    const response = await fetch('/api/estatistica');
    const stats = await response.json();
    const statsTableBody = document.getElementById('statsTableBody');

    stats.forEach(stat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stat._id.toUpperCase()}</td>
            <td>${stat.total}</td>
        `;
        statsTableBody.appendChild(row);
    });
}

if (document.getElementById('statsTableBody')) {
    listStats();
}