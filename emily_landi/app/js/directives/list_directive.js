module.exports = function(app) {
  app.directive('listDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/list_directive_template.html',
      transclude: true,
      replace: true,
      scope: {
        resource: '=',
        title: '@'
      }
    }
  });
};
