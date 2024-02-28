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
    expect(res.insertedId).toBeTruthy;
});

test('Checking util.read: ', async()=>{
    res = await util.read(URI, DATABASE, COLLECTION, {name: 'Test'}, 'Read OK');
    expect(res[0].name).toBe('Test'); 
});

test('Testing util.update: ', async()=>{
    res = await util.update(URI, DATABASE, COLLECTION, {name: 'Test'}, {$set: {age: 26}}, 'Update OK');
    expect(res.modifiedCount).toBe(1);
});

test('Testing util.delete: ', async()=>{
    res = await util.delete_document(URI, DATABASE, COLLECTION, {name: 'Test'}, 'Delete OK');
    expect(res.deletedCount).toBe(1); 
});
