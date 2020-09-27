var express = require('express');
var router = express.Router();
var Data = require('../models/data');

//======================BROWSE=============
router.post('/search', function (req, res, next) {
    let { letter, frequency } = req.body
    let reg = new RegExp(letter, 'i');
    let response = []
    let filter = {}

    if (letter && frequency) {
        filter.letter = { $regex: reg }
        filter.frequency = frequency
    } else if (letter) {
        filter.letter = { $regex: reg }
    } else if (frequency) {
        filter.frequency = frequency
    }

    Data.find(filter)
        .then(data => {
            response = data.map(item => {
                return {
                    _id: item._id,
                    letter: item.letter,
                    frequency: item.frequency
                }
            })
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(401).json(err)
        })
});



//=============GET READ========
router.get("/", async (req, res, next) => {
    try {
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 0
        let offset = page * limit - limit

        const data = await Data.find()
        const totalData = data.length
        let response = {
            totalData,
            data: []
        }
        const paginatedData = await Data.find().limit(limit).skip(offset)
        paginatedData.forEach(field => {
            const { _id, letter, frequency } = field
            response.data.push({
                _id,
                letter,
                frequency
            })
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json(response)
    }
})




//================POST ADD===============
router.post('/', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {},
    }

    Data.create({
        letter: req.body.letter,
        frequency: req.body.frequency
    }).then(data => {
        response.success = true
        response.message = "data have been added"
        response.data._id = data.id
        response.data.letter = data.letter
        response.data.frequency = data.frequency
        res.status(201).json(response)
    }).catch((err) => {
        res.status(500).json({
            response
        })
    })
});


//================PUT================

router.put('/:id', function (req, res, next) {
    let response = {
        success: false,
        message: "",
        data: {}
    }
    Data.findByIdAndUpdate(req.params.id, {
        letter: req.body.letter,
        frequency: req.body.frequency
    }, {
        new: true
    }).then(data => {
        response.message = "data have been updated"
        response.success = true
        response.data.letter = data.letter
        response.data.frequency = data.frequency
        res.status(201).json(response)
    }).catch((err) => {
        res.status(500).json({
            response
        })
    })
});

//=================DELETE==================
router.delete('/:id', function (req, res, next) {

    let response = {
        success: false,
        message: "",
        data: {},
    }

    Data.findByIdAndRemove(req.params.id)
        .then(data => {
            response.success = true
            response.message = "data have been deleted"
            response.data.id = req.params.id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(201).json(response)
        }).catch((err) => {
            res.json(err)
        })
});


//=======================FIND BY ID=========================
router.get('/:id', function (req, res, next) {

    let response = {
        success: false,
        message: "",
        data: {},
    }

    Data.findById(req.params.id)
        .then(data => {
            response.success = true
            response.message = "data found"
            response.data.id = req.params.id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(201).json(response)
        }).catch((err) => {
            res.json(err)
        })
});



module.exports = router;