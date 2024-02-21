const {URI} = require('./_config.js');
const util = require('../util/mongodbutil.js')

const DATABASE = 'todoapp'; 
const COLLECTION = 'posts'; 

// Testing Run. 
// util.run(URI, DATABASE, {ping: 1}, 'Run Ping OK'); // Don't forget the ';' when we use (async() ...) function.

// Testing everything one at a time in async function to avoid issues with queue.
(async () => {
    let res;
    let client;

    // Testing for connect.
    client = await util.connect(URI);
    console.assert(client.s.url === 'mongodb+srv://pamelalynnpepper:Wtp1DCzbCYExYUnC@cluster0.rggiqms.mongodb.net/?retryWrites=true&w=majority', 'Connect failed.');
    await client.close();

    // Testing Create.
    res = await util.create(URI, DATABASE, COLLECTION, {name: 'Test', age: 25}, 'Create OK'); 
    console.assert(res.acknowledged === true, 'Create failed');

    // Testing Read.
    res = await util.read(URI, DATABASE, COLLECTION, {}, 'Read OK');
    console.assert(res.length > 0, 'Read failed.');

    // Testing Update
    res = await util.update(URI, DATABASE, COLLECTION, {name: 'Test'}, {$set: {age: 26}}, 'Update OK');
    console.assert(res.modifiedCount === 1, 'Update failed');

    // Testing Delete.
    res = await util.delete_document(URI, DATABASE, COLLECTION, {name: 'Test'}, 'Delete OK');
    console.assert(res.acknowledged === true, 'Delete failed'); 
})();