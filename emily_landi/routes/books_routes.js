var express = require('express');
var bodyParser = require('body-parser');
var Book = require(__dirname + '/../models/book');

var booksRouter = module.exports = exports = express.Router();

var handleError = function(err, res, next) {
  console.log(err);
  res.status(500).json({msg: 'server error'});
};

booksRouter.get('/books', function(req, res) {
  Book.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

booksRouter.post('/books', bodyParser.json(), function(req, res) {
  var newBook = new Book(req.body);
  newBook.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});
