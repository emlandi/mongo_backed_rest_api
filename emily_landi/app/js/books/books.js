module.exports = function(app) {
  require('./controllers/books_controller')(app);
  require('./directives/book_directive')(app);
  require('./directives/book_transclude_directive')(app);
};
