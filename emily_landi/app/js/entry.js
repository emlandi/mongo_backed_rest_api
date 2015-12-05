require('angular/angular');
var angular = window.angular;

var bookstoreApp = angular.module('BookstoreApp', []);
require('./services/services')(bookstoreApp);
require('./controllers/controllers')(bookstoreApp);
require('./books/books')(bookstoreApp);
