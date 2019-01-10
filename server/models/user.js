const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail, // is the same as value => validator.isEmail(value)
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  //INSTANCE method, gets called with the individual document, so in this case "user"
  var user = this;
  var access = 'auth';
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'abc123')
    .toString();

  user.tokens.push({ access, token });

  return new Promise((resolve, reject) => {
    user.save().then(doc => {
      resolve(token);
    });
  });
};

UserSchema.statics.findByToken = function(token) {
  //STATICS methods get called with the model, in this case "User"
  var User = this;
  var decoded;
  try {
    //try-catch-blocks: if an error happens in the try block, execution is immediately stopped and the catch-block is executed
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token, //quotes are required if there's a dot in the value
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
