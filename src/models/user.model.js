const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    phoneNumber: Number,
    registerDate: Date
});

module.exports = mongoose.model('User', UserSchema);