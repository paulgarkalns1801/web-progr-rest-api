'use strict';

const mongoose = require('mongoose');
const result = require("js-yaml");
const MongoClient = require('mongodb').MongoClient;
const SensorValueInput = require('../models/SensorValueInput');
let url = "mongodb://mongo:27017/";

const uri = "mongodb://mongo:27017/";
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
exports.getSensors = function () {
    return new Promise(async function (resolve, reject) {
        // let docs =  await findOne().catch(console.dir);
        let docs = await findMany().catch(console.dir);
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


/**
 * Add sensor value to database
 * Create or Update Sensor
 *
 * body SensorValueInput
 * no response value expected for this operation
 **/
exports.sensorsPOST = function (body) {
    console.log(body.dateTime)

    const newSensorValue = new SensorValueInput({
        value: body.value,
        sensorId: body.sensorId,
        dateTime: new Date(body.dateTime)
    })

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
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

    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "sensorType": "temperatureSensor",
            "id": "d290f1ee-6c54-4b01-090e-d701748f0851"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

async function findOne() {
    let docs
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const movies = database.collection("roomsAndSensors");
        // Query for a movie that has the title 'The Room'
        const query = {roomName: "POIC_1"};
        const options = {
            // sort matched documents in descending order by rating
            sort: {_id: -1},
            // Include only the `title` and `imdb` fields in the returned document
            projection: {_id: 1, roomName: 1, sensors: 1},
        };
        docs = await movies.findOne(query, options);
        // since this method returns the matched document, not a cursor, print it directly
        console.log(docs);
    } finally {
        await client.close();
    }
    return docs
}

async function findMany() {
    let docs
    let docsArr = []
    try {
        await client.connect();
        const database = client.db("roomsAndSensors");
        const movies = database.collection("roomsAndSensors");
        // query for movies that have a runtime less than 15 minutes
        const query = {};
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: {_id: -1},
            // Include only the `title` and `imdb` fields in each returned document
            projection: {_id: 1, roomName: 1, sensors: 1},
        };
        docs = await movies.find(query, options);
        docsArr = await docs.toArray()
        // print a message if no documents were found
        if ((await docs.count()) === 0) {
            console.log("No documents found!");
        }
        // replace console.dir with your callback to access individual elements
        // await docs.forEach(console.dir);
    } finally {
        // console.log("Docs count: " + await docs.count());
        await client.close();
    }

    return docsArr
}