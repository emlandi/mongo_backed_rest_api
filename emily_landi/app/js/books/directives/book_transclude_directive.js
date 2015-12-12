module.exports = function(app) {
  app.directive('bookTranscludeDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/book_transclude_directive.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        book: '=',
        save: '&'
      }
    }
  });
};
