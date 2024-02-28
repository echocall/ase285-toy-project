const http = require('http');
const request = require('supertest');
const express = require('express');
const app = express();

// Specify the URL of the web server
const url = 'http://localhost:5500/';

// Make a GET request to the server
const req = http.get(url, (res) => {
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

    // When response is complete, log the content
  res.on('end', () => {
    console.log('Check the results');
    console.log(responseData);
    console.log(responseData == '/write.html');
  });

});

// Handle errors
req.on('error', (error) => {
  console.error(`Error fetching data from server: ${error.message}`);
});
