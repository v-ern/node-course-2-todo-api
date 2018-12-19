const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // mongoose now knows to use Promises
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'
);

module.exports = mongoose;
