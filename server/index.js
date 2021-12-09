const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const boardTransformer = require('./boardTransformer.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/dist')));


app.get('/newGame', (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate',
    params: req.query,
    headers: {
      'x-rapidapi-host': 'sudoku-generator1.p.rapidapi.com',
      'x-rapidapi-key': '6b2a968689msh85915ea72a3c6c5p19dd60jsnbec49b7e40d5'
    }
  };

  axios.request(options).then(function (response) {
    let board = boardTransformer(response.data.puzzle);
    let data = {difficulty: response.data.difficulty, board}
    res.status(200).send(data);

  }).catch(function (error) {
    console.error(error);
    req.status(400).send(error);
  });
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})