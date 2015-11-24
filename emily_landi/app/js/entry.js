require('angular/angular');
var angular = window.angular;

var bookApp = angular.module('bookstore', []);
bookApp.controller('BookController', ['$scope', function($scope) {
  $scope.book = 'What book would you like to read?';

  $scope.alertBook = function() {
    alert($scope.book);
  };
}]);
