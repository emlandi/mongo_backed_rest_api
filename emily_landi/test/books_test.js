var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/book_test';

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

  it('should not add book without title', function(done) {
    var addBook = {author: 'test'};
    chai.request('localhost:3000')
      .post('/api/books')
      .send(addBook)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Server Error');
        expect(res.body).to.not.have.property('_id');
        done();
      });
  });

  it('should not add book over 500 pages', function(done) {
    var addBook = {title: 'test', pages: 555};
    chai.request('localhost:3000')
      .post('/api/books')
      .send(addBook)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Server Error');
        expect(res.body).to.not.have.property('_id');
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

  describe('put & delete routes', function() {
    beforeEach(function(done) {
      (new Book({title: 'test'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.book = data;
        done();
      }.bind(this));
    });

    it('should edit existing book', function(done) {
      chai.request('localhost:3000')
        .put('/api/books/' + this.book._id)
        .send({title: 'new test title'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Put successful!');
          done();
        });
    });

    it('should delete existing book', function(done) {
      chai.request('localhost:3000')
        .delete('/api/books/' + this.book._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Delete successful!');
          done();
        });
    });

    it('should get number of existing books', function(done) {
      chai.request('localhost:3000')
        .get('/api/books/' + this.book._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('The number of books is: 1');
          done();
        });
    });
  });
});

