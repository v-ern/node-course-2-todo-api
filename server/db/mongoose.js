const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // mongoose now knows to use Promises
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

module.exports = mongoose;

process.env.NODE_ENV === 'production';
