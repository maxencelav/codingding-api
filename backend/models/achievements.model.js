const mongoose = require('mongoose');
const {Schema}= mongoose;

const achievementSchema = new Schema({
    name: String,
    message: String,
    creatorId: String,
});

module.exports = mongoose.model('Achievement', achievementSchema);