const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());

// C R U D

app.post('/todos', (req, res) => {
  var todo = new Todo({ text: req.body.text });
  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos }); // send back an object with todos instead of sending directly the array back => makes it more flexible and allows to add custom keys to the object later on, like status codes
    },
    err => {
      res.status(400).send(err);
    }
  );
});

//GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({});
  }
  Todo.findById(id).then(
    todo => {
      if (!todo) {
        res.status(404).send();
      } else {
        res.send({ todo });
      }
    },
    err => res.status(400).send()
  );
});

app.listen(3000, () => {
  console.log('Server started on Port 3000.');
});

module.exports = app;
