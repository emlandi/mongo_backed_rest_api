var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/book_stream_test';

require(__dirname + '/../server');
var Book = require(__dirname + '/../models/book');

describe('book routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should add a new book', function(done) {
    var addBook = {title: 'test'};
    chai.request('localhost:3000')
      .post('/api/books')
      .send(addBook)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.title).to.eql('test');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get existing books', function(done) {
    chai.request('localhost:3000')
      .get('/api/books')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});
