const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('..app.js');

const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require('../models/user');

describe('User', function() {

    // Login
    it('should not be able to login if they are not registered', done => {
        agent.post('/login', { email: 'wrong@wrong.com', password: 'nope' }).end(function(err, res) {
            res.status.should.be.equal(401);
            done();
        });
    });

    // Signup
    describe('should be able to signup', done => {
        User.findOneAndRemove({ username: 'testone'}, function() {
            agent.post('/signup')
            .send({username: 'testone', password: 'password'})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.have.cookie('nToken');
                done();
            });
        });
    });

    // Logout
    describe('should be able to logout', done => {
        agent.get('/logout')
        .end( function( err, res) {
            res.should.have.status(200);
            res.should.not.have.cookie('nToken');
            done();
        });
    });

    // Login
    describe('should be able to login', done => {
        agent.post('/login')
        .send({username: 'testone', password: 'password'})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.have.cookie('nToken');
            done();
        })
    })
});


