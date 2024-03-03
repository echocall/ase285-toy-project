// run "npm install . "
const {URI} = require('./_config.js');
const util = require('../util/mongodbutil.js')

const DATABASE = 'todoapp'; 
const COLLECTION = 'posts'

// Install express
const express = require('express');
const e = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 

// callback functions
app.listen(5500, function() {
    console.log('listening on 5500')
});

app.get('/', function(req, resp) { 
    resp.sendFile(__dirname +'/write.html')
    console.log('Get / test.');
    console.log(resp.statusCode === 200);
});

app.get('/test', async function(req, resp) {
    resp.sendFile(__dirname +'/json/test.json')
    console.log('/test test.');
    console.log(resp);
    console.log(resp.statusCode === 200);
    console.log(resp.sendDate === true);
}); 

app.get('/test2/:id', async function(req, resp) {
    let id = req.params.id;
    console.log('/test2/:id test.');
    console.log(resp.statusCode === 200);
    resp.send(`${id}`);
}); 

app.post('/add', async function(req, resp) {
    console.log('/add test.');
    resp.send('Sent');
    const query = { title : req.body.title, date : req.body.date }
    util.create(URI, DATABASE, COLLECTION, query);
    console.log(resp.statusCode === 200);
}); 