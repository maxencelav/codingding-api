const mongoose = require('mongoose');
const {Schema}= mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    profilePic: String,
    googleId: String
});

module.exports = mongoose.model('Users', userSchema);