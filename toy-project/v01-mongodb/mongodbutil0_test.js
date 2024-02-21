const {URI} = require('./_config.js');
const util = require('../util/mongodbutil0.js')

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

databaseName = 'todoapp';
collectionName = 'posts';

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
