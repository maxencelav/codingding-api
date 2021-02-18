const mongoose = require('mongoose');
const {Schema}= mongoose;

const achievementSchema = new Schema({
    name: String,
    message: String,
    creatorId: String,
    likes: Array,
    date: Date
});

module.exports = mongoose.model('Achievement', achievementSchema);