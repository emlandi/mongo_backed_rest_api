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
      book.editing = false;
      $http.put('/api/books/' + book._id, book)
        .then(function(res) {
          console.log('Edit complete.');
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.delete = function(book) {
      $scope.books.splice($scope.books.indexOf(book), 1);
      $http.delete('/api/books/' + book._id)
        .then(function(res) {
          console.log('This book has been deleted.');
        }, function(res) {
          console.log(err.data);
          $scope.getAll();
        });
    };

    // $scope.delete = function(book) {
    //   $scope.books.splice($scope.books.indexOf(book), 1);
    //   booksResource.delete(book, function(err, data) {
    //     if (err) return err;
    //     $scope.getAll();
    //   });
    // };

  }]);
};

