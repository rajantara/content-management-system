'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../app');
const User = require('../models/user');


const should = chai.should();
chai.use(chaiHttp);


describe('users', function () {
    it('seharusnya menampilkan semua users on /api/users GET', function(done){
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.have.be.json;
            res.body.should.be.a('Array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('email');
            res.body[0].should.have.property('password');
            res.body[0].should.have.property('token');
            done();
        })
    })
})

describe('users', function () {

    // User.collection.drop();

    beforeEach(function (done) {
        let user = new User({
            email: 'rajanpensas@gmail.com',
            password: '12345',
            token : ''
        })
        user.save(function (err){
            done();
        })
    })

    afterEach(function(done){
        User.collection.drop();
        done()
    })
    it('seharusnya menampilkan semua user on /api/users GET', function(done){
        chai.request(server)
        .post('/api/users/register')
        .send({})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.have.be.json;
            res.body.should.be.a('Array');
            res.body[0].should.have.property('message');
            res.body[0].should.have.property('data');
            res.body[0].should.have.property('token');
            done();
        })
    })
})