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

router.post('/login', async (req, res, next) => {

  let response = { data: {}, token: null, message: "" }
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      response.message = 'Email or password wrong!'
      return res.status(200).json(response)
    }

    const check = await bcrypt.compare(password, user.password)

    if (check) {

      if (user.token) {
        response.data.email = email
        response.message = "login success"
        response.token = user.token
        res.status(201).json(response)
      } else {

        const newToken = jwt.sign({ email }, secret)
        const updateUser = await User.updateOne({ email: user.email }, { token: newToken })
        response.data.email = email
        response.message = "login success"
        response.token = newToken
        res.status(201).json(response)

        if (!updateUser) {
          response.message = "update token failed"
          return res.status(500).json(response)
        }

      }

    } else {
      response.message = 'Email or password wrong!'
      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error)
    response.message = "Email or password wrong"
    res.status(500).json(response)
  }

});



//====================== check db

router.post('/check', async (req, res, next) => {

  const token = req.header("Authorization")

  let response = {
    valid: false
  };

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(200).json(response)

    const user = await User.findOne({ email: decoded.email })
    if (!user) return res.status(200).json(response)

    response.valid = true
    res.status(200).json(response)

  } catch (error) {
    console.log(error);
    res.status(500).json(response)
  }

});


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
