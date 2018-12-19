const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

var userId = '5c19e8af452cfd25290535c0';

if (!ObjectID.isValid(userId)) {
  console.log('User ID not valid!');
} else {
  User.findById(userId)
    .then(user => {
      if (!user) {
        return console.log('User not found.');
      }
      console.log(user);
    })
    .catch(err => console.log(err));
}

// var id = '5c19fe3806c0c92a40878ce111';

// if (!ObjectID.isValid(id)) {
//   console.log('The given ID is not a valid Object ID');
// }
// Todo.find({
//   _id: id
// }).then(todos => console.log('Todos:', todos));

// Todo.findOne({
//   _id: id
// }).then(todo => console.log('Todo:', todo));

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('ID not found!');
//     }
//     console.log('Todo By Id:', todo);
//   })
//   .catch(e => console.log('Error'));

//User find by id

// id works, but no user > print error
// user was found > print user
// errror > print error
