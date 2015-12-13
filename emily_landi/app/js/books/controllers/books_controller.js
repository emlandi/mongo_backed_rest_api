var angular = window.angular;
module.exports = function(app) {
  app.controller('BooksController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource) {
    $scope.books = [];
    $scope.defaults = {rating: 'Excellent'};
    $scope.newBook = angular.copy($scope.defaults);
    $scope.orig = {};
    var booksResource = cfResource('books');

    $scope.getAll = function() {
      booksResource.getAll(function(err, data) {
        if (err) return err;
        $scope.books = data;
      });
    };

    $scope.create = function(book) {
      booksResource.create(book, function(err, data) {
        if (err) return err;
        $scope.books.push(data);
        $scope.newBook = angular.copy($scope.defaults);
      });
    };

    $scope.update = function(book) {
      booksResource.update(book, function(err, data) {
        book.editing = false;
        if (err) return (err);
        console.log('Edit submitted.');
      });
    };

    $scope.edit = function(book) {
      $scope.orig = angular.copy(book);
      book.editing = true;
      console.log('Edit button clicked.');
    };

    $scope.cancelEdit = function(book) {
      angular.copy($scope.orig, book);
      book.editing = false;
      console.log('Edit cancelled.');
    };

    $scope.delete = function(book) {
      $scope.books.splice($scope.books.indexOf(book), 1);
      booksResource.delete(book, function(err, data) {
        if (err) {
          $scope.getAll();
          return err;
        }
      });
    };

  }]);
};

