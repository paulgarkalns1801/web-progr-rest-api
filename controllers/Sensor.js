'use strict';

var utils = require('../utils/writer.js');
var Sensor = require('../service/SensorService');

module.exports.getSensors = function getSensors (req, res, next) {
  Sensor.getSensors(req)
    .then(function (response) {
        console.log("Response: "+response)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getWarnings = function getWarnings (req, res, next) {
    Sensor.getWarnings(req)
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

module.exports.sensorsWarningsPUT = function sensorsWarningsPUT (req, res, next, body) {
    Sensor.sensorsWarningsPUT(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.sensorsDelete = function sensorsDelete (req, res, next, body) {
    Sensor.sensorsDelete(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
