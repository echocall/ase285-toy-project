const {URI} = require('./_config.js');
const util = require('../util/mongodbutil0.js')

databaseName = 'asecourses';
collectionName = 'courses';

/*
Functions to Test:
module.exports.connect = connect;
module.exports.create = create;
module.exports.read = read;
module.exports.update = update;
module.exports.readJSON = readJSON;
module.exports.uploadJSON = uploadJSON;
module.exports.removeAllDocuments = removeAllDocuments;
*/

test('Checking URI from Connect: ', async ()=>{
  client = await util.connect(URI);
  expect(client.s.url).toBe('mongodb+srv://pamelalynnpepper:Wtp1DCzbCYExYUnC@cluster0.rggiqms.mongodb.net/?retryWrites=true&w=majority');
  await client.close();
});

// Testing Create.
test('Checking util.create: ', async()=>{
  const client = await util.connect(URI);
  const res = await util.create(client, databaseName, collectionName, {name: "Test Data", professor: "Tester Test", department: "Problem Shoot"})
  expect(res.insertedId).toBeTruthy;
  await client.close();
});

test('Checking util.read: ', async()=>{
  const client = await util.connect(URI);
  res = await util.read(client, databaseName, collectionName, {name: "Test Data"}, 'Read OK');
  expect(res[0].name).toBe('Test Data'); 
  await client.close();
});

test('Testing util.update: ', async()=>{
  const client = await util.connect(URI);
  res = await util.update(client, databaseName, collectionName, {name: 'Test Data'}, {$set: {professor: 'Prof Graham'}}, 'Update OK');
  expect(res.modifiedCount).toBe(1);
  await client.close();
});

test('Testing util.readJSON: ', async()=>{
  const data = util.readJSON('./ase_courses.json');
  expect(data.courses[0].name).toBe('Unix Systems');
})

test('Testing util.uploadJSON: ', async()=>{
  res = await util.uploadJSON(URI, databaseName, collectionName, './ase_courses.json');
  console.log(res);
  //expect(res.modifiedCount).toBe(1);
});


test('Testing util.removeAllDocuments: ', async()=>{
  const client = await util.connect(URI);
  res = await util.removeAllDocuments(URI, databaseName, collectionName);
  expect(res.acknowledged).toBe(true); 
  await client.close();
});

/*
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