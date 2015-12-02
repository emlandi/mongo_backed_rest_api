var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  pages: { type: Number, validate: {
    validator: function(val) {
      Number.max = 500;
      return val == 1;
    },
    message: '{VALUE} is above the maximum number of pages.'
    }
  },
  rating: {type: String, default: 'Excellent'}
});

module.exports = mongoose.model('Book', bookSchema);
