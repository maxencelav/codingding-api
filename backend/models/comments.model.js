const mongoose = require('mongoose');
const {Schema}= mongoose;

const commentSchema = new Schema({
    text: String,
    date: Date,
    wishId: String,
    creatorId: String
});

module.exports = mongoose.model('Comment', commentSchema);