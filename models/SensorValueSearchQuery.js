const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorValueSearchQuerySchema = new Schema({
    sensorId: {
        type: String,
    },
    roomId: {
        type: String,
    },
    sensorType: {
        type: String,
    },
    dateTimeFrom: {
        type: Date
    },
    dateTimeTo: {
        type: Date
    },
    detail:{
        type: String
    }
})

module.exports = SensorValueSearchQuery = mongoose.model('SensorValueSearchQuery', SensorValueSearchQuerySchema);