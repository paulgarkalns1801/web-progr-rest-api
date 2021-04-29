const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorValueInputSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    sensorId: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = SensorValueInput = mongoose.model('SensorValueInput', SensorValueInputSchema);