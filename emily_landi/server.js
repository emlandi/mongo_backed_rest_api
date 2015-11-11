var mongoose = require('mongoose');
var express = require('express');
var app = express();
var booksRouter = require(__dirname + '/routes/books_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/book_stream');

app.use('/api', booksRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
