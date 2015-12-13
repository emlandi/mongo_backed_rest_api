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
    $httpBackend.expectPOST('/api/books').respond(200, [{_id: 1, title: 'test title'}]);

    var addBook = {title: 'test title'};
    booksResource.create(addBook, function(err, data) {
      expect(err).toBe(null);
      expect(typeof data).toBe('object');
      expect(data[0].title).toBe('test title');
      expect(data[0]._id).toBe(1);
    });
  $httpBackend.flush();
  });

  it('should make a put request(edit book)', function() {
    $httpBackend.expectPUT('/api/books/1').respond(200, [{_id: 1, title: 'test title'}]);

    var editBook = {_id: 1, title: 'test title'};
    booksResource.update(editBook, function(err, data) {
      expect(err).toBe(null);
      expect(typeof data).toBe('object');
      expect(data[0].title).toBe('test title');
      expect(data[0]._id).toBe(1);
    });
  $httpBackend.flush();
  });

  it('should make a delete request', function() {
    $httpBackend.expectDELETE('/api/books/1').respond(200, [{_id: 1, title: 'test title'}]);

    var deleteBook = {_id: 1, title: 'test title'};
    booksResource.delete(deleteBook, function(err, data) {
      expect(err).toBe(null);
      expect(typeof data).toBe('object');
    });
  $httpBackend.flush();
  });
});
