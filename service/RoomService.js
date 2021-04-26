'use strict';


/**
 * Get room by name
 * Returns a room instance by name
 *
 * name String Room name
 * returns Room
 **/
exports.getRoomByName = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "temperatureSensors" : [ {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  }, {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  } ],
  "carbonDioxideSensors" : [ null, null ],
  "name" : "POS_1",
  "humiditySensors" : [ null, null ],
  "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get list of rooms
 * Returns a list of available rooms
 *
 * returns List
 **/
exports.getRooms = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "temperatureSensors" : [ {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  }, {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  } ],
  "carbonDioxideSensors" : [ null, null ],
  "name" : "POS_1",
  "humiditySensors" : [ null, null ],
  "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
}, {
  "temperatureSensors" : [ {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  }, {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  } ],
  "carbonDioxideSensors" : [ null, null ],
  "name" : "POS_1",
  "humiditySensors" : [ null, null ],
  "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create/Update Room
 * Create or Update Room
 *
 * body RoomInput 
 * returns Room
 **/
exports.roomsPUT = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "temperatureSensors" : [ {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  }, {
    "records" : [ {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    }, {
      "dateTime" : 1461110400000,
      "id" : "d290f1ee-6c54-4b01-090e-d701748f0851",
      "value" : "37"
    } ],
    "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
  } ],
  "carbonDioxideSensors" : [ null, null ],
  "name" : "POS_1",
  "humiditySensors" : [ null, null ],
  "id" : "d290f1ee-6c54-4b01-090e-d701748f0851"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

