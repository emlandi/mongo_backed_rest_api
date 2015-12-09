var mongoose = require('mongoose');
var express = require('express');
var app = express();
var booksRouter = require(__dirname + '/routes/books_routes');
// var authRouter = require(__dirname + '/routes/auth_routes');
// process.env.APP_SECRET = process.env.APP_SECRET || 'somethingelse';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/book_stream');

app.use(express.static(__dirname + '/build/'));

app.use('/api', booksRouter);

// app.use('/api', authRouter);

app.listen(3000, function() {
  console.log('Server up & running!');
});
