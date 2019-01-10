var User = require('../models/user');

var authenticate = (req, res, next) => {
  //middleware func
  var token = req.header('x-auth'); //gets the x-auth header data of the request, where the authentication token is stored

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send();
    });
};

module.exports = authenticate;
