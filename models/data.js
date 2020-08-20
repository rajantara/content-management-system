const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    letter: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('datas', dataSchema);