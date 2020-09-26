'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const secret = 'secret';
const {
  response
} = require('express');


//====================== GET users
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
        var token = jwt.sign({ email: email }, secret);
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



//====================== login

router.post('/login', function (req, res, next) {
  let {
    email,
    password

  } = req.body;
  let response = {
    message: "",
    data: {},
    token: ""
  }

  User.findOne({ email })
    .then(data => {

      console.log('data1', data);

      bcrypt.compare(password, data.password)
        .then(isPasswordTrue => {
          if (isPasswordTrue) {
            if (data.token) {
              response.token = data.token;
              response.data.email = email;
              response.data.message = 'login succes dude';
              res.status(201).json(response)
            }

          } else {
            response.message = " authentication failed";
            res.status(200).json(response);
          }
        })
        .catch(err => {
          response.message = "Authentication failed dude";
          res.status(500).json(response);
        })
    })
    .catch(err => {
      response.message = "email doesn't match dude";
      res.status(200).json(response);
    })
});




//====================== check db

router.post('/check', function (req, res, next) {
  let token = req.header('token')
  let response = {
    valid: false
  }
  console.log(token)

  if (!token) {
    res.status(500).json(response)
  } else {
    const decode = jwt.verify(token, secret);
    console.log(decode)
    User.find({ email: decode.email})
    .then(result => {
      response.valid = true
      res.status(200).json(response)

    })
    .catch(err => {
      res.status(500).json({ response})
    })
  }
})


//====================== logout

router.get('/destroy', async (req, res, next) => {
  const token = req.header("Authorization")

  let response = {
    logout: false
  };
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      if (!decoded) return res.status(500).json(response)

      const user = await User.findOneAndUpdate({ email: decoded.email }, { token: undefined })
      if (!user) return res.status(500).json(response)

      response.logout = true
      res.status(200).json(response)

    } catch (error) {
      console.log(error)
      res.status(200).json(response)
    }
  } else {
    res.status(500).json(response)
  }
});





module.exports = router;
