require('angular/angular');
require('angular-route');
var angular = window.angular;

var bookstoreApp = angular.module('BookstoreApp', ['ngRoute']);
require('./services/services')(bookstoreApp);
require('./books/books')(bookstoreApp);

bookstoreApp.config(['$routeProvider', function($route) {
  $route
    .when('/books', {
      templateUrl: '/templates/books_view.html',
      controller: 'BooksController'
    })
    .otherwise({
      redirectTo: '/books'
    })
}]);
