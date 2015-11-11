var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  rating: {type: String, default: 'excellent'}
});

module.exports = mongoose.model('Book', bookSchema);
