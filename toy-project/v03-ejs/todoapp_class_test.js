const {URI} = require('./_config.js');
const { TodoApp } = require('../util/utility.js');

const DATABASE = 'todoapp'; 
const POSTS = 'posts';
const COUNTER = 'counter';

const postapp = new TodoApp(URI, DATABASE, POSTS, COUNTER);

// Install express
const express = require('express');
const app = express();


app.listen(5500, function() {
    console.log('listening on 5500')
});

console.log(postapp);

app.get('/', function(req, resp) { 
    try {
      resp.render('write.ejs')
    } catch (e) {
      console.error(e);
    } 
  });
  
  app.post('/add', function(req, resp) {
    postapp.runAddPost(req, resp);
    console.log('/add response:');
    console.log(resp.statusCode);
  });
  
  app.get('/list', function(req, resp){
    postapp.runListGet(req, resp);
    console.log('/list response:');
    console.log(resp.statusCode);
  });

