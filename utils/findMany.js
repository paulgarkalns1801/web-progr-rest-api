const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config.js');
const uri = config.database_link;
const client = new MongoClient(uri);

module.exports = async function findMany(database, collection) {
    let docs
    let docsArr = []
    try {
        await client.connect();
        const query = {};
        const options = {
            sort: {_id: -1},
        };
        docs = await collection.find(query, options);
        docsArr = await docs.toArray()
        // print a message if no documents were found
        if ((await docs.count()) === 0) {
            console.log("No documents found in collection " + collection.collectionName + "!");
        }
        // replace console.dir with your callback to access individual elements
        // await docs.forEach(console.dir);
    } finally {
        // console.log("Docs count: " + await docs.count());
        await client.close();
    }

    return docsArr
}