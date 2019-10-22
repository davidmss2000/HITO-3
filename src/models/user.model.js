const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phoneNumber: Number,
    registerDate: Date
});

module.exports = mongoose.model('User', UserSchema);