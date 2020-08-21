const mongoose = require('mongoose');

const mapsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    }
});

module.exports = mongoose.model('maps', mapsSchema);