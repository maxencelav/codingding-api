const mongoose = require('mongoose');
const {Schema}= mongoose;

const storySchema = new Schema({
    name: String,
    key: String,
    type: String,
    storyPts: Number,
    description: String,
    priority: String,
    date: Date,
    boardId: String,
    creatorId: String,
    status: String
});

module.exports = mongoose.model('Story', storySchema);