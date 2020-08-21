var express = require('express');
var router = express.Router();
var Maps = require('../models/maps');

//==============ADD==================
router.post('/', function (req, res, next) {
    let response = {
        success: false,
        massage: "",
        data: {}
    }

    Maps.create({
        title: req.body.title,
        lat: req.body.lat,
        lng: req.body.lng
    }).then(data =>{
       response.success = true
       response.massage = "data have been added dude"
       response.data._id = data.id
       response.data.title = data.title
       response.data.lat = data.lat
       response.data.lng = data.lng
       res.status(201).json(response)
    }).catch(err =>{
        res.status(500).json({
            response
        })
    })
})

module.exports = router;