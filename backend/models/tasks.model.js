const mongoose = require('mongoose');
const {Schema}= mongoose;

const taskSchema = new Schema({
    name: String,
    key: String,
    type: String,
    storyPts: Number,
    description: String,
    priority: String,
    date: Date,
    boardId: String,
    creatorId: String,
});

module.exports = mongoose.model('Task', taskSchema);