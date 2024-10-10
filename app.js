const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function run() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB');

        const db = client.db('blog');

        // Endpoint para adicionar um artigo
        app.post('/new', async (req, res) => {
            const { category, title, description } = req.body;
            const createdAt = new Date();
            
            try {
                const result = await db.collection('articles').insertOne({ category, title, description, createdAt });
                res.status(201).send({ _id: result.insertedId, category, title, description, createdAt });
            } catch (error) {
                console.error(error);
                res.status(500).send('Erro ao adicionar o artigo');
            }
        });

        // Endpoint para listar todos os artigos
        app.get('/api/articles', async (req, res) => {
            try {
                const articles = await db.collection('articles').find({}).toArray();
                res.send(articles);
            } catch (error) {
                console.error('Erro ao listar artigos:', error);
                res.status(500).send('Erro ao listar artigos');
            }
        });

        // Endpoint para buscar o artigo
        app.get('/api/articles/:id', async (req, res) => {
            const { id } = req.params;
            const article = await db.collection('articles').findOne({ _id: new ObjectId(id) });
            res.send(article);
        });

        // Endpoint para editar um artigo
        app.put('/edit/:id', async (req, res) => {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'ID inválido' });
            }
            const { category, title, description } = req.body;
            const result = await db.collection('articles').updateOne(
                { _id: new ObjectId(id) }, 
                { $set: { category, title, description } }
            );
            res.send({ message: 'Artigo atualizado com sucesso' });
        });

        // Endpoint para deletar um artigo
        app.delete('/:id', async (req, res) => {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'ID inválido' });
            }
            await db.collection('articles').deleteOne({ _id: new ObjectId(id) });
            res.status(204).send(); // No content
        });

        // Endpoint para estatística dos artigos
        app.get('/api/estatistica', async (req, res) => {
            const result = await db.collection('articles').aggregate([
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                },
                {
                    $sort: { total: -1 }
                }
            ]).toArray();
            res.json(result);
        });

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        app.get('/new', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'new.html'));
        });

        app.get('/estatistica', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'estatistica.html'));
        });

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);
