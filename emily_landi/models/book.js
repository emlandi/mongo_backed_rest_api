var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  pages: { type: Number, max: 1000 },
  rating: {type: String, default: 'Excellent'}
});

module.exports = mongoose.model('Book', bookSchema);
