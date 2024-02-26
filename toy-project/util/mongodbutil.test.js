const {URI} = require('../v01-mongodb/_config.js');
const util = require('./mongodbutil.js')

const DATABASE = 'todoapp'; 
const COLLECTION = 'posts'; 

// Testing Run. 
// util.run(URI, DATABASE, {ping: 1}, 'Run Ping OK'); // Don't forget the ';' when we use (async() ...) function.

// Testing for connect.
test('Checking URI from Connect: ', async ()=>{
    client = await util.connect(URI);
    expect(client.s.url).toBe('mongodb+srv://pamelalynnpepper:Wtp1DCzbCYExYUnC@cluster0.rggiqms.mongodb.net/?retryWrites=true&w=majority');
    await client.close();
});

// Testing Create.
test('Checking util.create: ', async()=>{
    const res = await util.create(URI, DATABASE, COLLECTION, {name: 'Test', age: 25}, 'Create OK');
    expect(res.acknowledged).toBe(true);
});

test('Checking util.read: ', async()=>{
    res = await util.read(URI, DATABASE, COLLECTION, {}, 'Read OK');
    console.log(res);
    expect(res.acknowledged).toBe(true); 
});

test('Testing util.update: ', async()=>{
    res = await util.update(URI, DATABASE, COLLECTION, {name: 'Test'}, {$set: {age: 26}}, 'Update OK');
    expect(res.modifiedCount).toBe(1);
});

test('Testing util.delete: ', async()=>{
    res = await util.delete_document(URI, DATABASE, COLLECTION, {name: 'Test'}, 'Delete OK');
    expect(res.acknowledged).toBe(true); 
});

/*
// Testing everything one at a time in async function to avoid issues with queue.
(async () => {
    let res;
    let result;
    // test Connect
    const client = await util.connect(URI);
    console.assert(client.s.url === 'mongodb+srv://pamelalynnpepper:Wtp1DCzbCYExYUnC@cluster0.rggiqms.mongodb.net/?retryWrites=true&w=majority', 'Connect failed.');
    
    // Test Create
    res = await util.create(client, databaseName, collectionName, {name: "Test Data", professor: "Tester Test", department: "Problem Shoot"})
    console.assert(res.acknowledged === true, 'Create failed');

    // Test Read
    res = await util.read(client, databaseName, collectionName, {"professor":"Tester Test"});
    console.assert(res.length > 0, 'Read failed.');

    // Test Update
    res = await util.update(client, databaseName, collectionName, {"professor":"Tester Test"}, {$set: {"professor":"Professor Z"}});
    console.assert(res.modifiedCount === 1, 'Update failed');

    // Test Delete
    res = await util.removeAllDocuments(URI, databaseName, collectionName);
    console.assert(res.acknowledged === true, 'Delete failed'); 
    
    // Test Upload
    //upload(client, databaseName, collectionName, filePath);

    await client.close();
  })();
*/