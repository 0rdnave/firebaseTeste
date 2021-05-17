const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});


app.get('/files', (req, res) => {
  const dir = fs.readdirSync(path.resolve('./md'))
  res.send(dir)

  console.log("Deu certo get")
});

app.get('/fi', (req, res) => {
  try {
    // let getID = req.body.input_getFile;
    // // if (getID) {
    // console.log(getID)
    // const file = fs.readFileSync(path.resolve('./md', req.params.input_getFile));
    // res.send(file.toString());
    // // } else {
    const file = fs.readFileSync(path.resolve('./md', req.params.id));
    res.send(file.toString());
    console.log("Deu certo get file")
    // }
  } catch (error) {
    res.status(404).send({ error: 'Produto não encontrado' });
  }
});

app.get('/files/:id/preview', (req, res) => {
  if (fs.existsSync(path.resolve('./md', req.params.id))) {
    const file = fs.readFileSync(path.resolve('./md', req.params.id));
    res.send(marked(file.toString()));
  } else {
    res.send("deu ruim")
    console.log("Deu mto ruim")
  }
});

// app.post('/files', (req, res) => {
//   console.log(req.body);
//   fs.writeFileSync(path.resolve('./md', req.body.id), req.body.content);
//   res.send('Ok');
// });

app.post('/add', (req, res) => {
  const postID = req.body.idPost;
  const postContent = req.body.postContent;
  if (postID && postContent) {
    fs.writeFileSync(path.resolve('./md', req.body.idPost), req.body.postContent);
    res.send('Ok');
  } else {
    fs.writeFileSync(path.resolve('./md', req.body.id), req.body.content);
    res.send('Ok');
  }
});

app.delete('/files/', (req, res) => {
  fs.rmSync(path.resolve('./md', res.body.id));
  console.log("Ae")
  res.send("Foi")
});


app.use('/', router);

app.listen(process.env.port ||
  3000,
  () => {
    console.log('listenig http://localhost:3000');
  },
)

/**
 *
 *
 *
 var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var body = {"id": "README.md", "content": "# teste do coiso"};

var myInit = { method: 'POST', headers: myHeaders, body: JSON.stringify(body)  };

fetch('http://localhost:3000/files', myInit)
.then(function(response) {
  return response.json();
})
.then((a) => console.log(a))
 *
 */