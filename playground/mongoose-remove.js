const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

// Todo.findByIdAndDelete('5c1a1a18ffa70af38cf7be99').then(res => {
//   console.log(res);
// });

// Todo.findOneAndDelete({ completed: true }).then(res => {
//   console.log(res);
// });
