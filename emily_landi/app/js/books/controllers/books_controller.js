module.exports = function(app) {
  app.controller('BooksController', ['$scope', '$http', function($scope, $http) {
    $scope.books = [];
    var defaults = {rating: 'Excellent'};
    $scope.newBook = Object.create(defaults);

    $scope.getAll = function() {
      $http.get('/api/books')
      .then(function(res) {
        $scope.books = res.data;
      }, function(err) {
        console.log(err.data);
      });
    };

    $scope.create = function(book) {
      $http.post('/api/books', book)
      .then(function(res) {
        $scope.books.push(res.data);
        $scope.newBook = Object.create(defaults);
      }, function(err) {
        console.log(err.data);
      });
    };

  }]);
};
