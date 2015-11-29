var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/book_test';
require(__dirname + '/../server');

var mongoose = require('mongoose');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var basicHttp = require(__dirname + '/../lib/basic_http_auth');
var User = require(__dirname + '/../models/auth');

describe('basicHttp', function() {
  it('should parse basic http auth', function() {
    var req = {
      headers: {
        authorization: 'Basic: ' + new Buffer('testUsername:testPassword').toString('base64')
      }
    };

    basicHttp(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('testUsername');
      expect(req.auth.password).to.eql('testPassword');
    });
  });
});

describe('authorization routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('POST route should create a user', function(done) {
    chai.request('localhost:3000/api')
      .post('/signup')
      .send({username: 'testUsername', password: 'testPassword'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  describe('existing user', function() {
    beforeEach(function(done) {
      var user = new User();
      user.username = 'testUsername';
      user.basic.username = 'testUsername';
      user.hashPW('testPassword', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
          }.bind(this));
        }.bind(this));
      }.bind(this));
      done();
    });

    it('GET route should sign in existing user', function(done) {
      chai.request('localhost:3000/api')
        .get('/signin')
        .auth('testUsername', 'testPassword')
        .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
    });
  });
});
