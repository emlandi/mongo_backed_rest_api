require('angular/angular');
var angular = window.angular;

var bookstoreApp = angular.module('BookstoreApp', []);
require('./controllers/controllers')(bookstoreApp);
require('./books/books')(bookstoreApp);
