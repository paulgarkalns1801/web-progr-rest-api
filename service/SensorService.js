'use strict';
var mongo = require('mongodb');
const mongoose = require('mongoose');
const result = require("js-yaml");
const MongoClient = require('mongodb').MongoClient;
const SensorValueInput = require('../models/SensorValueInput');
const config = require('../config/config.js');
let url = config.database_link;
const uri = config.database_link;
const client = new MongoClient(uri);


/**
 * Get Sensor by id
 * Returns a sensor found by unique id
 *
 * id String Sensor id
 * returns Sensor
 **/
exports.getSensorById = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "records": [{
                "dateTime": 1461110400000,
                "id": "d290f1ee-6c54-4b01-090e-d701748f0851",
                "value": "37"
            }, {
                "dateTime": 1461110400000,
                "id": "d290f1ee-6c54-4b01-090e-d701748f0851",
                "value": "37"
            }],
            "id": "d290f1ee-6c54-4b01-090e-d701748f0851"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Get room by name
 * Returns a room instance by name
 *
 * id String Sensor id
 * dateTime String Zulu date and time
 * returns Sensor
 **/
exports.getSensorValuesInRange = function (id, dateTime) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "records": [{
                "dateTime": 1461110400000,
                "id": "d290f1ee-6c54-4b01-090e-d701748f0851",
                "value": "37"
            }, {
                "dateTime": 1461110400000,
                "id": "d290f1ee-6c54-4b01-090e-d701748f0851",
                "value": "37"
            }],
            "id": "d290f1ee-6c54-4b01-090e-d701748f0851"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Get list of sensors
 * Returns a list of available sensors
 *
 * returns List
 **/
exports.getSensors = function (req) {
    return new Promise(async function (resolve, reject) {
        let queryParams = req.query
        let query = {}
        let examples = {};
        if (queryParams.roomId !== undefined) {
            let roomIdMongoObj = new mongo.ObjectID(queryParams.roomId);
            query = {_id: roomIdMongoObj};

            const options = {
                // sort returned documents in ascending order by title (A->Z)
                sort: {_id: -1},
                // Include only the `title` and `imdb` fields in each returned document
                projection: {_id: 1, roomName: 1, sensors: 1},
            };
            let docs = await findOne("roomsAndSensors", query, options).catch(console.dir);
            // let docArr = docs.toArray();
            // await docs.forEach(doc => docArr.push(doc));
            examples['application/json'] = docs;
        } else {
            const options = {
                sort: {_id: -1},
                projection: {_id: 1, roomName: 1, sensors: 1},
            };

            let docs = await findMany(query, options, "roomsAndSensors").catch(console.dir);
            examples['application/json'] = docs;
        }
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

exports.getSensorValues = function (req) {
    return new Promise(async function (resolve, reject) {
        let docs
        let queryParams = req.query
        let sensorsInRoom = []
        let sensorIdCustom
        let sensorIdString
        let sensorIds = []
        let query
        if (queryParams.roomId !== undefined && queryParams.sensorId !== undefined && queryParams.dateTimeFrom !== undefined && queryParams.dateTimeTo !== undefined) {
            sensorsInRoom = await getSensorsInRoom(queryParams.roomId)

            for (let sensorObj of sensorsInRoom) {
                let a = ""
                sensorIdString = sensorObj._id.toString()
                if (queryParams.sensorId === sensorIdString) {
                    sensorIdCustom = sensorObj.sensorId
                }
            }
            query = {
                dateTime: {
                    $gte: new Date(queryParams.dateTimeFrom),
                    $lte: new Date(queryParams.dateTimeTo)
                },
                sensorId: sensorIdCustom

            }
            docs = await findMany(query, {}, "sensorValueEntries").catch(console.dir);
        }

        if (queryParams.roomId !== undefined && queryParams.sensorType !== undefined && queryParams.dateTimeFrom !== undefined && queryParams.dateTimeTo !== undefined) {
            sensorsInRoom = await getSensorsInRoom(queryParams.roomId)

            for (let sensorObj of sensorsInRoom) {
                let a = ""
                let sensorType = sensorObj.sensorType
                if (queryParams.sensorType === sensorType) {
                    let foundSensorId = sensorObj.sensorId
                    sensorIds = sensorIds.concat(foundSensorId)
                }
            }
            query = {
                dateTime: {
                    $gte: new Date(queryParams.dateTimeFrom),
                    $lte: new Date(queryParams.dateTimeTo)
                },
                sensorId: {
                    $in: sensorIds
                }

            }
            docs = await findMany(query, {}, "sensorValueEntries").catch(console.dir);
        }


        // let docs =  await findOne().catch(console.dir);

        // let docArr = docs.toArray();
        // await docs.forEach(doc => docArr.push(doc));
        var examples = {};
        examples['application/json'] = docs;
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

exports.getWarnings = function (req) {
    return new Promise(async function (resolve, reject) {
        let doc
        let docs
        let queryParams = req.query
        let sensorsInRoom = []
        let sensorIdCustom
        let sensorIdString
        let sensorIds = []
        let examples = {}
        let query = {}
        let err = false
        let subQuery
        let sensorsWithWarnings = []
        let sensorValuesWithWarnings = []
        let subDocs
        // query = {
        //     dateTime: {
        //         $gte: new Date(queryParams.dateTimeFrom),
        //         $lte: new Date(queryParams.dateTimeTo)
        //     },
        if (queryParams.dateTimeFrom !== undefined || queryParams.dateTimeTo !== undefined) {
            query.dateTime = {}
        }
        if (queryParams.dateTimeFrom !== undefined) {
            query.dateTime.$gte = new Date(queryParams.dateTimeFrom)
        }
        if (queryParams.dateTimeTo !== undefined) {
            query.dateTime.$lte = new Date(queryParams.dateTimeTo)
        }

        if (queryParams.sensorId !== undefined && queryParams.roomId === undefined) {
            let sensorIdMongoObj = new mongo.ObjectID(queryParams.sensorId);

            subQuery = {"sensors._id": sensorIdMongoObj}
            doc = await findOne("roomsAndSensors", subQuery, {})
            if (doc !== null) {
                let sensorId
                for (let sensor of doc.sensors) {
                    sensorIdString = sensor._id.toString()
                    if (sensorIdString === queryParams.sensorId) {
                        sensorId = sensor.sensorId
                    }
                }
                sensorIds = sensorIds.concat(sensorId)
            } else {
                examples['application/json'] = {"err": "sensor not found"};
                resolve(examples[Object.keys(examples)[0]])
                err = true
            }

            query.sensorId = {}
            query.sensorId.$in = sensorIds
            // query.sensorId = {}
            // query.sensorId.$in = sensorIds
        }
        if (queryParams.sensorId === undefined && queryParams.roomId !== undefined) {
            let roomIdMongoObj = new mongo.ObjectID(queryParams.roomId);

            subQuery = {_id: roomIdMongoObj}
            doc = await findOne("roomsAndSensors", subQuery, {})
            if (doc !== null) {
                let sensorId
                for (let sensor of doc.sensors) {
                    sensorIds = sensorIds.concat(sensor.sensorId)
                }

            } else {
                examples['application/json'] = {"err": "sensor not found"};
                resolve(examples[Object.keys(examples)[0]])
                err = true
            }

            query.sensorId = {}
            query.sensorId.$in = sensorIds
            // query.sensorId = {}
            // query.sensorId.$in = sensorIds
        }

        docs = await findMany(query, {}, "sensorValueEntries").catch(console.dir);

        if (doc !== null && doc !== undefined) {
            for (let sensor of doc.sensors) {
                if (sensor.warnings !== null && sensor.warnings !== undefined) {
                    if (sensor.warnings.length > 0) {
                        sensorsWithWarnings = sensorsWithWarnings.concat(sensor)
                    }
                }
            }
        } else {
            subDocs = await findMany({}, {}, "roomsAndSensors").catch(console.dir);
            if (subDocs !== null && subDocs !== undefined) {
                for (let doc of subDocs) {
                    for (let sensor of doc.sensors) {
                        if (sensor.warnings !== null && sensor.warnings !== undefined) {
                            if (sensor.warnings.length > 0) {
                                sensorsWithWarnings = sensorsWithWarnings.concat(sensor)
                            }
                        }
                    }
                }
            }
        }

        if (docs !== null && docs !== undefined && sensorsWithWarnings.length > 0) {
            for (let sensor of sensorsWithWarnings) {
                for (let sensorWarning of sensor.warnings) {
                    let threshold = sensorWarning.threshold.split(" ")
                    let sensorValueValue
                    let thresholdValue
                    if (threshold[0] === ">") {
                        for (let sensorValue of docs) {
                            if (sensorValue.sensorId === sensor.sensorId) {
                                sensorValueValue = parseFloat(sensorValue.value)
                                thresholdValue = parseFloat(threshold[1])


                                if (sensorValueValue > thresholdValue) {
                                    sensorValuesWithWarnings = sensorValuesWithWarnings.concat({
                                        sensorValue,
                                        sensorWarning
                                    })
                                }
                            }
                        }
                    }
                    if (threshold[0] === "<") {
                        for (let sensorValue of docs) {
                            if (sensorValue.sensorId === sensor.sensorId) {
                                sensorValueValue = parseFloat(sensorValue.value)
                                thresholdValue = parseFloat(threshold[1])
                                if (sensorValueValue < thresholdValue) {
                                    sensorValuesWithWarnings = sensorValuesWithWarnings.concat({
                                        sensorValue,
                                        sensorWarning
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!err) {
            examples['application/json'] = sensorValuesWithWarnings;
        }

        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

/**
 * Add sensor value to database
 * Create or Update Sensor
 *
 * body SensorValueInput
 * no response value expected for this operation
 **/

async function getSensorsInRoom(roomId) {

    let collection = "roomsAndSensors"
    let roomIdMongoObj = new mongo.ObjectID(roomId);
    const query = {_id: roomIdMongoObj};
    const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: {_id: -1},
        // Include only the `title` and `imdb` fields in each returned document
        projection: {_id: 1, roomName: 1, sensors: 1},
    }

    let doc = await findOne(collection, query, options)
    return doc.sensors
}

exports.sensorsPOST = function (body) {
    console.log(body.dateTime)

    const newSensorValue = new SensorValueInput({
        value: body.value,
        sensorId: body.sensorId,
        dateTime: new Date(body.dateTime)
    })

    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err) throw err;
        let dbo = db.db("roomsAndSensors");
        dbo.collection("sensorValueEntries").insertOne(newSensorValue,
            function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
    });
    return new Promise(function (resolve, reject) {
        resolve();
    });
}

/**
 * Create/Update Sensor
 * Create or Update Sensor
 *
 * body SensorInput
 * returns SensorInfo
 **/
exports.sensorsPUT = function (body) {
    return new Promise(async function (resolve, reject) {
        let doc
        let query = {}
        let options = {}
        let examples = {};
        let exists = false
        let update = {}
        const RoomsAndSensorsInput = require('../models/RoomsAndSensorsInput.js');
        const Sensor = require('../models/Sensor.js');
        if (body.roomId === undefined) {
            if (body.roomName !== undefined) {
                query = {roomName: body.roomName}
                doc = await findOne("roomsAndSensors", query, options)
                if (doc !== null) {
                    exists = true
                    examples['application/json'] = {"err": "Room already exists"}
                    resolve(examples[Object.keys(examples)[0]])
                }

                for (let sensor of body.sensors) {
                    let a = ""
                    query = {"sensors.sensorId": sensor.sensorId}
                    doc = await findOne("roomsAndSensors", query, options)
                    if (doc !== null) {
                        exists = true
                        examples['application/json'] = {"err": "Sensor " + sensor.sensorId + " already exists"}
                        resolve(examples[Object.keys(examples)[0]])
                    }
                }
                if (!exists) {
                    let newRoomAndSensorValue = new RoomsAndSensorsInput({
                        roomName: body.roomName,
                        sensors: body.sensors
                    })
                    doc = await insertOne("roomsAndSensors", newRoomAndSensorValue)
                    examples['application/json'] = {"data": doc}
                }
            }
        }
        if (body.roomId !== undefined) {
            let roomIdMongoObj = new mongo.ObjectID(body.roomId);
            query = {_id: roomIdMongoObj}
            doc = await findOne("roomsAndSensors", query, options)
            if (doc === null) {
                examples['application/json'] = {"err": "Room not found"}
                resolve(examples[Object.keys(examples)[0]])
            }
            if (doc !== null) {
                let newRoomAndSensorValue = new RoomsAndSensorsInput({
                    roomName: body.roomName,
                    sensors: body.sensors
                })
                let sensorArr = []
                // let newSensor = new Sensor

                for (let sensor of body.sensors) {
                    let newSensor = new Sensor({
                        sensorType: sensor.sensorType,
                        sensorId: sensor.sensorId
                    })
                    sensorArr = sensorArr.concat(newSensor)
                }

                query = {_id: roomIdMongoObj}
                update = {
                    $set: {
                        roomName: body.roomName,
                        sensors: sensorArr
                    }
                }
                doc = await updateOne("roomsAndSensors", query, update)
                examples['application/json'] = {"data": doc}
            }
        }
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            examples['application/json'] = {"err": "Check request data"}
            resolve();
        }
    });
}

exports.sensorsWarningsPUT = function (body) {
    return new Promise(async function (resolve, reject) {
        let doc
        let query = {}
        let options = {}
        let examples = {};
        let exists = false
        let update = {}
        const RoomsAndSensorsInput = require('../models/RoomsAndSensorsInput.js');
        const Sensor = require('../models/Sensor.js');
        const Warning = require('../models/Warning.js');

        if (body.roomId !== undefined && body.sensorId !== undefined) {
            let roomIdMongoObj = new mongo.ObjectID(body.roomId);
            let sensorIdMongoObj = new mongo.ObjectID(body.sensorId);
            query = {
                _id: roomIdMongoObj,
                "sensors._id": sensorIdMongoObj
            }
            doc = await findOne("roomsAndSensors", query, options)
            if (doc === null) {
                examples['application/json'] = {"err": "Room or sensor not found"}
                resolve(examples[Object.keys(examples)[0]])
            }

            if (doc !== null) {
                let warningArr = []
                for (let warning of body.warnings) {
                    let newWarning = new Warning({
                        warningText: warning.warningText,
                        threshold: warning.threshold
                    })
                    warningArr = warningArr.concat(newWarning)
                }
                query = {
                    "sensors._id": sensorIdMongoObj
                }
                update = {
                    $set: {
                        "sensors.$.warnings": warningArr
                    }
                }
                doc = await updateOne("roomsAndSensors", query, update)
                examples['application/json'] = {"data": doc}
            }
        }
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            examples['application/json'] = {"err": "Check request data"}
            resolve();
        }
    });
}

exports.sensorsDelete = async function (body) {
    return new Promise(async function (resolve, reject) {
        let query = {}
        let update = {}
        let doc
        let examples = {};
        let exists = false
        let rid = body.roomId
        let sid = body.sensorId
        if (body.roomId !== undefined && body.sensorId !== undefined) {
            let roomIdMongoObj = new mongo.ObjectID(body.roomId);
            query = {_id: roomIdMongoObj}
            doc = await findOne("roomsAndSensors", query, {})
            if (doc !== null) {
                for (let sensor of doc.sensors) {
                    let sensorMongoIdStr = sensor._id.toString()
                    if (sensorMongoIdStr === body.sensorId) {
                        exists = true
                    }
                }
                if (exists) {
                    let sensorIdMongoObj = new mongo.ObjectID(body.sensorId);
                    update = {
                        $pull: {
                            sensors: {_id: sensorIdMongoObj}
                        }
                    }
                    doc = await updateOne("roomsAndSensors", query, update)
                    examples['application/json'] = doc
                } else {
                    examples['application/json'] = {"err": "No such sensor in room"}
                    resolve(examples[Object.keys(examples)[0]]);
                }
            } else {
                examples['application/json'] = {"err": "No such room"}
            }

        }
        if (body.roomId !== undefined && body.sensorId === undefined) {
            let roomIdMongoObj = new mongo.ObjectID(body.roomId);
            query = {_id: roomIdMongoObj}
            doc = await findOne("roomsAndSensors", query, {})
            if (doc !== null) {
                doc = await deleteOne("roomsAndSensors", query)
                examples['application/json'] = doc
            } else {
                examples['application/json'] = {"err": "No such room"}
            }
        }
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            examples['application/json'] = {"err": "Check request data"}
            resolve(examples[Object.keys(examples)[0]]);
        }
    });
}

async function findOne(coll, q, opts) {
    let docs
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const movies = database.collection(coll);

        const query = q;
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: {_id: -1},
            // Include only the `title` and `imdb` fields in each returned document
            projection: {_id: 1, roomName: 1, sensors: 1},
        };


        // Query for a movie that has the title 'The Room'
        docs = await movies.findOne(query, options);
        // since this method returns the matched document, not a cursor, print it directly
        console.log(docs);
        // await client.close();
    } finally {

    }
    return docs
}

async function insertOne(coll, q) {
    let docs
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const collection = database.collection(coll);

        const query = q;
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: {_id: -1},
            // Include only the `title` and `imdb` fields in each returned document
            projection: {_id: 1, roomName: 1, sensors: 1},
        };

        // Query for a movie that has the title 'The Room'
        docs = await collection.insertOne(query);
        // since this method returns the matched document, not a cursor, print it directly
        console.log(docs);
        // await client.close();
    } finally {

    }
    return docs
}

async function deleteOne(coll, q) {
    let docs
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const collection = database.collection(coll);

        const query = q;
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: {_id: -1},
            // Include only the `title` and `imdb` fields in each returned document
            projection: {_id: 1, roomName: 1, sensors: 1},
        };

        // Query for a movie that has the title 'The Room'
        docs = await collection.deleteOne(query);
        // since this method returns the matched document, not a cursor, print it directly
        console.log(docs);
        // await client.close();
    } finally {

    }
    return docs
}

async function updateOne(coll, q, upd) {
    let docs
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const collection = database.collection(coll);

        const query = q;
        const update = upd;
        const options = {
            sort: {_id: -1},
            projection: {_id: 1, roomName: 1, sensors: 1},
        };
        docs = await collection.updateOne(query, update);
        console.log(docs);
    } finally {

    }
    return docs
}

async function findMany(query, options, collName) {
    let docs
    let docsArr = []
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const collection = database.collection(collName);
        docs = await collection.find(query, options);
        docsArr = await docs.toArray()
        // print a message if no documents were found
        if ((await docs.count()) === 0) {
            console.log("No documents found!");
        }
    } finally {
    }

    return docsArr
}