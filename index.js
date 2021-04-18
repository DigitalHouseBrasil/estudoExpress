const express = require('express');
const app = express();
const { uuid } = require('uuidv4');
app.use(express.json());
const usuarios = [];

app.get('/usuarios', (req, res) => {

    return res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const { nome, sobrenome } = req.body;
    console.log(nome);
    console.log(sobrenome);

    const usuario = { id: uuid(), nome, sobrenome };

    usuarios.push(usuario);
    return res.json(usuario);
})

app.put('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const {nome, sobrenome} = req.body;

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);

    if (usuarioIndex < 0) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const usuario = {
        id,
        nome, 
        sobrenome
    }

    usuarios[usuarioIndex] = usuario;


    return res.json(usuario);
})

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);

    if (usuarioIndex < 0) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    usuarios.splice(usuarioIndex, 1);

    return res.status(204).send();
})

app.listen(3000, (req, res) => {
    console.log('Servidor rodando')
})