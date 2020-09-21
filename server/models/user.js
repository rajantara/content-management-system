const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err)
            console.log(err);
        else {
            this.password = hash;
            next();
        }
    })
});

module.exports = mongoose.model('users', userSchema);