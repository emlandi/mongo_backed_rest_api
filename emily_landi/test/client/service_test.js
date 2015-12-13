require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('cf_resource service', function() {
  var $httpBackend;
  var booksResource;

  beforeEach(angular.mock.module('BookstoreApp'));

  beforeEach(angular.mock.inject(function(cfResource, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    booksResource = cfResource('books');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/books').respond(200, [{_id: 1, title: 'test title'}]);
    booksResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
      expect(data[0].title).toBe('test title');
    });
  $httpBackend.flush();
  });

  it('should make a post request(create new book)', function() {
    $httpBackend.expectPOST('/api/books', {title: 'test title', rating: 'Excellent'}).respond(200, {title: 'newBook title'});

    // expect($scope.books.length).toBe(0);
    // expect($scope.newBook).toEqual($scope.defaults);

    // $scope.newBook.title = 'test title';

    booksResource.create($scope.newBook, function(err, data) {
      expect(err).toBe(null);
      expect(data[0].title).toBe('newBook title');
      // expect($scope.newBook).toEqual($scope.defaults);
    });
  $httpBackend.flush();
  });

  it('should make a put request(edit book)', function() {
    var data = [{title: 'edited title', rating: 'good', _id: 1}];

    $httpBackend.expectPUT('/api/books/1', data[0]).respond(200);
    booksResource.update(data[0], function(err, data) {
      expect(err).toBe(null);
      expect(data[0].title).toBe('edited title');
      expect(data[0]._id).toBe(1);r
      expect(data[0].editing).toBe(false);
    });
  $httpBackend.flush();
  });

  it('should make a delete request', function() {
    var data = [{title: 'title1', author: 'author1', pages: '100', rating: 'good', _id: 1}, {title: 'title2', author: 'author2', pages: '200', rating: 'great', _id: 2}];

    $httpBackend.expectDELETE('/api/books/1').respond(200);
    booksResource.delete(data[0], function(err, data) {
      expect(err).toBe(null);
      expect(data[0].title).toBe('title2');
      expect(data[0].author).toBe('author2');
      expect(data[0].pages).toBe('200');
      expect(data[0].rating).toBe('great');
      expect(data[0]._id).toBe(2);
    });
  $httpBackend.flush();
  });
});
