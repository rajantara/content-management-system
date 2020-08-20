'use strict'



var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({ err });
  })

});


router.post('/', function (req, res, next) {
  User.create({
    name: req.body.name, 
    phone: req.body.phone
  }).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({ err });
  })

});

module.exports = router;
