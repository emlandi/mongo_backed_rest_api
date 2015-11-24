var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basic_http_auth');
var User = require(__dirname + '/../models/auth');

var authRouter = module.exports = exports = express.Router();
authRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPW(req.body.password);

  user.save(function(err, data) {
    if (err) return handleError(err, res);

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      res.json({token: token});
    });
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('No basic Auth provided.');
    return res.status(401).json({msg: 'Access denied.'});
  };

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('No basic Auth provided.');
      return res.status(401).json({msg: 'Access denied.'});
    }

    if (!user) {
      console.log('No basic Auth provided.');
      return res.status(401).json({msg: 'Access denied.'});
    }

    if (!user.checkPW(req.auth.password)) {
      console.log('No basic Auth provided.');
      return res.status(401).json({msg: 'Access denied.'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      res.json({token: token});
    });
  });
});
