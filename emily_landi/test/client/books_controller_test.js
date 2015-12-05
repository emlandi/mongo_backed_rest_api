require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('books controller', function() {
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

    it('should add an array to books with GET all', function() {
      $httpBackend.expectGET('/api/books').respond(200, [{_id: 1, title: 'test title'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.books[0].title).toBe('test title');
    });

    it('should be able to create a new book', function() {
      $httpBackend.expectPOST('/api/books', {title: 'test title', rating: 'Excellent'}).respond(200, {title: 'new title'});
      expect($scope.books.length).toBe(0);
      expect($scope.newBook).toEqual($scope.defaults);
      $scope.newBook.title = 'test title';
      $scope.create($scope.newBook);
      $httpBackend.flush();
      expect($scope.books[0].title).toBe('new title');
      expect($scope.newBook).toEqual($scope.defaults);
    });
  });
});
