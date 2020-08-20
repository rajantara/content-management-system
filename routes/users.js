'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const secret = 'secret';
const {
  response
} = require('express');


//========================= GET users
router.get('/', function (req, res) {
  let response = [];

  User.find({})
    .then(data => {
      response = data.map(item => {
        return {
          _id: item._id,
          email: item.email,
          password: item.password,
          token: item.token
        }
      })
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        response
      });
    })
})


//====================== register
router.post('/register', function (req, res, next) {
  let { 
    email,
    password,
    retypepassword
  } = req.body;

  let response = {
    message: "",
    data: {},
    token: ""
  }
  if (password != retypepassword) return res.status(500).json({
    error: true,
    message: "password doesn't match"
  })
  User.findOne({
      email
    })
    .then(result => {
      if (result) {
        response.message = 'email already exist';
        console.log('email ditemukan', result);
        return res.status(200).json(response)
      } else {
        var token = jwt.sign({email: email}, secret);
        let user = new User({
          email: email,
          password: password,
          token: token
        })
        user.save()
          .then(data => {
            response.message = "register success"
            response.data.email = email
            response.token = token
            res.status(201).json(response)
            console.log(data);
          })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        message: 'error users findOne'
      })
    })
});

module.exports = router;
