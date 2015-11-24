var mongoose = require('mongoose');
var express = require('express');
var app = express();
var booksRouter = require(__dirname + '/routes/books_routes');
var authRouter = require(__dirname + '/routes/auth_routes');
process.env.APP_SECRET = process.env.APP_SECRET || 'somethingelse';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/book_stream');

app.use('/api', booksRouter);
app.use('/api', authRouter);

var fs = require('fs');
app.use(express.static('app'));

app.get('/:filename', function(req, res, next) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if (err) {
      console.log(err);
      return next();
    }
    if (!stats.isFile())
    return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use(function(req, res) {
  res.status(404).send('Not found.');
});

app.listen(3000, function() {
  console.log('Server up & running!');
});


