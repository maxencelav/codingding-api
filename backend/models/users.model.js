const mongoose = require('mongoose');
const {Schema}= mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    profilePic: String,
    classYear: Number,
    classStatus: String,
    classLocation: String,
    googleId: String,
    gitHubLinks: Array
});

module.exports = mongoose.model('Users', userSchema);