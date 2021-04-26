'use strict';

var utils = require('../utils/writer.js');
var Room = require('../service/RoomService');

module.exports.getRoomByName = function getRoomByName (req, res, next, name) {
  Room.getRoomByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRooms = function getRooms (req, res, next) {
  Room.getRooms()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.roomsPUT = function roomsPUT (req, res, next, body) {
  Room.roomsPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
