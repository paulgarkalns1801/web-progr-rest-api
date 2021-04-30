const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarningSchema = new Schema({
    threshold: {
        type: String,
        required: true
    },
    warningText: {
        type: String,
        required: true
    }
})

module.exports = Warning = mongoose.model('WarningSchema', WarningSchema);
