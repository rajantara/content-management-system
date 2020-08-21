var express = require('express');
var router = express.Router();
const DataDate = require('../models/datadate');


//========ADD=======
router.post('/', function (req, res, next) {
    const { letter, frequency } = req.body
    let response = {
        success: false,
        message: "",
        data: {}
    }

    const dataDate = new DataDate({
        letter: letter,
        frequency: frequency
    })

    dataDate.save()
        .then(result => {
            response.success = true
            response.message = "data have been added"
            response.data._id = result._id
            response.data.letter = result.letter
            response.data.frequency = result.frequency
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(response)
        })

});

// =======READ=======
router.get('/', function (req, res, next) {
    let response = []

    DataDate.find()
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
            res.status(500).json(err)
        })
});

//====BROWSE====
router.post('/search', function (req, res, next) {
    let { letter, frequency } = req.body
    let reg = new RegExp(letter, 'i');
    let response = []
    let filter = {}

    if (letter && frequency) {
        filter.letter = { $regex: reg };
        filter.frequency = frequency;
    } else if (letter) {
        filter.letter = { $regex: reg };
    } else if (frequency) {
        filter.frequency = frequency;
    }

    DataDate.find(filter)
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

//======EDIT=====
router.put('/:id', function (req, res, next) {
    let id = req.params.id
    let { letter, frequency } = req.body
    let response = {
        success: false,
        message: "",
        data: {}
    }

    DataDate.findByIdAndUpdate(id, { letter, frequency }, { new: true })
        .then(data => {
            response.success = true
            response.message = "data have been updated"
            response.data._id = data._id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(201).json(response)
        })
        .catch(err => {
            response.message = "update failed"
            res.status(500).json(response)
        })
});

//=======DELETE========
router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    let response = {
        success: false,
        message: "",
        data: {}
    }

    DataDate.findByIdAndRemove(id)
        .then(data => {
            response.success = true
            response.message = "data have been deleted"
            response.data._id = data._id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(201).json(response)
        })
        .catch(err => {
            response.message = "delete failed"
            res.status(500).json(response)
        })
});

//==========FIND=========
router.get('/:id', function (req, res, next) {
    let id = req.params.id
    let response = {
        success: false,
        message: "",
        data: {}
    }

    DataDate.findById(id)
        .then(data => {
            response.success = true
            response.message = "data found"
            response.data._id = data._id
            response.data.letter = data.letter
            response.data.frequency = data.frequency
            res.status(200).json(response)
        })
        .catch(err => {
            response.message = "data not found"
            res.status(500).json(response)
        })


});
module.exports = router;