var express = require('express');
var router = express.Router();
var phonebook = require('../models/phonebook');

/* GET users listing. */
router.get('/', function (req, res, next) {
  phonebook.find({}).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({ err });
  })

});


router.post('/', function (req, res, next) {
  phonebook.create({
    name: req.body.name, 
    phone: req.body.phone
  }).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({ err });
  })

});

module.exports = router;
