'use strict';
const MongoClient = require('mongodb').MongoClient;
const mongodbUtils = require('./utils/findMany.js');
const config = require('./config/config.js');
var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    initializeMongodb()
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
})

async function initializeRoomsAndSensorsCollection(db, dbo) {
    const fs = require('fs');
    const RoomsAndSensorsInput = require('./models/RoomsAndSensorsInput.js');

    let rawData = fs.readFileSync('resources/roomsAndSensors.json');
    let roomsAndSensors = JSON.parse(rawData);

    for (let room of roomsAndSensors) {
        let newRoomAndSensorValue = new RoomsAndSensorsInput({
            roomName: room.roomName,
            sensors: room.sensors
        })

        await dbo.collection("roomsAndSensors").insertOne(newRoomAndSensorValue,
            function (err, res) {
                if (err) throw "2" + err;
                console.log("1 roomsAndSensors document inserted");
                // db.close();
            });
    }
}

async function initializeMongodb() {
    let url = config.database_link;
    MongoClient.connect(url, { useUnifiedTopology: true },async function (err, db) {
        if (err) throw "1 \n" + err;
        console.log("Database connection created!");
        let dbo = db.db("roomsAndSensors");
        const collections = await dbo.listCollections().toArray();

        let roomsAndSensorsCreated = false
        let sensorValueEntriesCreated = false
        for (let i = 0; i < collections.length; i++) {
            if (collections[i].name === "sensorValueEntries")
                console.log("Collection sensorValueEntries exists!");
            sensorValueEntriesCreated = true
            if (collections[i].name === "roomsAndSensors")
                console.log("Collection roomsAndSensors exists!");
            roomsAndSensorsCreated = true
        }

        if (!roomsAndSensorsCreated) {
            await dbo.createCollection("roomsAndSensors", function (err, res) {
                if (err) throw "Collection roomsAndSensors creation: \n"+err ;
                console.log("Collection roomsAndSensors created!");
                // db.close();
            });
        }
        if (!sensorValueEntriesCreated) {
            await dbo.createCollection("sensorValueEntries", function (err, res) {
                if (err) throw "Collection sensorValueEntries creation: \n" + err;
                console.log("Collection sensorValueEntries created!");
                // db.close();
            });
        }
        const collection = dbo.collection("roomsAndSensors");

        let docsArr = await mongodbUtils(dbo, collection)
        if (docsArr.length === 0) await initializeRoomsAndSensorsCollection(db, dbo)
        else {console.log("Collection roomsAndSensors is already initialized!")}
        // await db.close();
    })
}