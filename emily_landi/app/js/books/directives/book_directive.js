module.exports = function(app) {
  app.directive('bookDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/book_directive_template.html',
      scope: {
        book: '=',
      }
    }
  });
};
