const mongoose = require('mongoose');
const {Schema}= mongoose;

/* TODO: add upVotes and downVotes */

const wishSchema = new Schema({
    name: String,
    date: Date,
    type: String,
    creatorId: String
});

module.exports = mongoose.model('Wish', wishSchema);