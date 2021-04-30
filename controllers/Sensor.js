'use strict';

var utils = require('../utils/writer.js');
var Sensor = require('../service/SensorService');

module.exports.getSensorById = function getSensorById (req, res, next, id) {
  Sensor.getSensorById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSensorValuesInRange = function getSensorValuesInRange (req, res, next, id, dateTime) {
  Sensor.getSensorValuesInRange(id, dateTime)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSensors = function getSensors (req, res, next) {
  Sensor.getSensors()
    .then(function (response) {
        console.log("Response: "+response)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSensorValues = function getSensors (req, res, next) {
    Sensor.getSensorValues(req)
        .then(function (response) {
            console.log("Response: "+response)
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.sensorsPOST = function sensorsPOST (req, res, next, body) {
  Sensor.sensorsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sensorsPUT = function sensorsPUT (req, res, next, body) {
  Sensor.sensorsPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
