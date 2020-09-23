const fs = require('fs');
const path = require('path');
const datadate = require('../models/datadate')
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/mycms', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), "utf-8")
);

datadate.insertMany(data, (err, result) => {
    if (err) throw err;
    console.log(`${result.length} data has been imported`)
})