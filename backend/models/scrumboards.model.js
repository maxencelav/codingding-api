const mongoose = require('mongoose');
const {Schema}= mongoose;

const scrumboardSchema = new Schema({
    name: String,
    key: String,
    type: String,
    description: String,
    date: Date,
    members: Array,
    creatorId: String
});

module.exports = mongoose.model('Scrumboard', scrumboardSchema);