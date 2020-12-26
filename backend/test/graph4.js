require('should-http');

var should = require('should'),
    request = require('supertest'),
    expect = require('chai').expect;

var app = require('../src/app/app');

it('should respond with the boxPlot data', function(done) {
    request(app)
        .get('/graph4?from=2015-01-01&to=2020-01-01&approved=true&inUse=true')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            expect(err).to.not.exist;
            res.should.have.status(200);
            res.body.should.not.be.empty;
            done();
        });
});

it('should respond with no boxPlot data', function(done) {
    request(app)
        .get('/graph4?from=2015-01-01&to=2020-01-01&approved=true&inUse=false')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            expect(err).to.not.exist;
            res.should.have.status(200);
            res.body.should.be.empty;
            done();
        });
});