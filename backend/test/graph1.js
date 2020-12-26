require('should-http');

var should = require('should'),
    request = require('supertest'),
    expect = require('chai').expect;

var app = require('../src/app/app');

it('should respond with the totalPower data', function(done) {
    request(app)
        .get('/graph1?from=2015-01-01&to=2020-01-01&approved=true&inUse=true')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            expect(err).to.not.exist;
            res.should.have.status(200);
            res.body.should.not.be.empty;

            var first = res.body[0];
            first.should.have.property('Datum');
            first.should.have.property('Leistung');
            first.should.have.property('Status');
            done();
        });
});

it('should respond with no totalPower data', function(done) {
    request(app)
        .get('/graph1?from=2015-01-01&to=2020-01-01&approved=false&inUse=false')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
            expect(err).to.not.exist;
            res.should.have.status(200);
            res.body.should.be.empty
            done();
        });
});