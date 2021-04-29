const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
    sensorType: {
        type: String,
        required: true
    },
    sensorId: {
        type: String,
        required: true
    }
})

module.exports = Sensor = mongoose.model('SensorSchema', SensorSchema);
