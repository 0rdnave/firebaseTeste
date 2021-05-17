const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/files', (req, res) => {
  const dir = fs.readdirSync(path.resolve('./md'))
  res.send(dir)

  console.log("Deu certo get")
});

app.get('/files/:id', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve('./md', req.params.id));
    res.send(file.toString());
    console.log("Deu certo get file")
  } catch (error) {
    res.status(404).send({ error: 'Arquivo não encontrado' });
  }
});

app.get('/files/:id/preview', (req, res) => {
  if (fs.existsSync(path.resolve('./md', req.params.id))) {
    const file = fs.readFileSync(path.resolve('./md', req.params.id));
    res.send(marked(file.toString()));
  } else {
    res.send("Arquivo não encontrado para Preview")
    console.log("Preview falhou")
  }
});

app.post('/add', (req, res) => {
  console.log(req.body);
  fs.writeFileSync(path.resolve('./md', req.body.id), req.body.content);
  res.send('Arquivo criado');
});

app.post('/del', (req, res) => {
  console.log(req.body)
  console.log(req.body.id);
  fs.rmSync(path.resolve('./md', req.body.id));
  res.send("Arquivo Deletado")
});

app.listen(process.env.port ||
  3000,
  () => {
    console.log('listenig http://localhost:3000');
  },
)