require('should-http');

var should = require('should'),
    request = require('supertest'),
    expect = require('chai').expect;

var app = require('../src/app/app');

it('should respond with the count', function(done) {
    request(app)
        .get('/count')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            expect(err).to.not.exist;
            res.should.have.status(200);
            res.body.should.be.above(4675);
            done();
        });
});

