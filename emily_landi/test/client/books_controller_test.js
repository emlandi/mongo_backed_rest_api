require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('books_controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('BookstoreApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('BooksController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.books)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('BooksController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

//GET
    it('should add an array to books with getAll()', function() {
      $httpBackend.expectGET('/api/books').respond(200, [{_id: 1, title: 'test title'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.books[0].title).toBe('test title');
    });

//POST
    it('should be able to create a new book', function() {
      $httpBackend.expectPOST('/api/books', {title: 'test title', rating: 'Excellent'}).respond(200, {title: 'newBook title'});

      expect($scope.books.length).toBe(0);
      expect($scope.newBook).toEqual($scope.defaults);

      $scope.newBook.title = 'test title';
      $scope.create($scope.newBook);
      $httpBackend.flush();

      expect($scope.books[0].title).toBe('newBook title');
      expect($scope.newBook).toEqual($scope.defaults);
    });

//PUT
    it('should modify a book with update()', function() {
      $scope.books[0] = {title: 'edited title', rating: 'good', _id: 1};

      $httpBackend.expectPUT('/api/books/1', $scope.books[0]).respond(200);
      $scope.update($scope.books[0]);
      $httpBackend.flush();

      expect($scope.books[0].title).toBe('edited title');
      expect($scope.books[0]._id).toBe(1);
      expect($scope.books[0].editing).toBe(false);
    });

//DELETE
    it('should remove a book with delete()', function() {
      $scope.books[0] = {title: 'title1', author: 'author1', pages: '100', rating: 'good', _id: 1};
      $scope.books[1] = {title: 'title2', author: 'author2', pages: '200', rating: 'great', _id: 2};

      $httpBackend.expectDELETE('/api/books/1').respond(200);
      $scope.delete($scope.books[0]);
      $httpBackend.flush();

      expect($scope.books[0].title).toBe('title2');
      expect($scope.books[0].author).toBe('author2');
      expect($scope.books[0].pages).toBe('200');
      expect($scope.books[0].rating).toBe('great');
      expect($scope.books[0]._id).toBe(2);
    });
  });
});
