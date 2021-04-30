const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sensor = require('../models/Sensor');
const RoomsAndSensorsInputSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    // roomId: {
    //     type: String,
    // },
    sensors: [{
        sensorType: String,
        sensorId: String
    }]
})

module.exports = RoomsAndSensorsInput = mongoose.model('RoomsAndSensorsInput', RoomsAndSensorsInputSchema);
