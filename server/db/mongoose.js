const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // mongoose now knows to use Promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = mongoose;
