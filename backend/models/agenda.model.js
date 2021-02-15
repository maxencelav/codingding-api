const mongoose = require('mongoose');
const {Schema}= mongoose;

const weekSchema = new Schema({
    weekNumber: Number,
    classL1TP: String,
    profL1TP: String,
    classL1ALT: String,
    profL1ALT: String,
    classL2: String,
    profL2: String,
    classL3: String,
    profL3: String,
});

module.exports = mongoose.model('Agenda', weekSchema);