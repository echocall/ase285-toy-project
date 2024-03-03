const http = require('http');
// this is not a jest test. run node index.js first.

// Specify the URL of the web server
const url = 'http://localhost:5500/test';

// Make a GET request to the server
const req = http.get(url, (res) => {
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

    // When response is complete, log the content
  res.on('end', () => {
    console.log('Testing /test: ')
    console.log('Check the results');
    let responseObject = JSON.parse(responseData);
    console.log(responseObject.a == 1);
  });
});

// Testing for '/'
const url2 = 'http://localhost:5500/test2/004'
// Make a GET request to the server
const req2 = http.get(url2, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });
  
      // When response is complete, log the content
    res.on('end', () => {
      console.log('Testing /test2/:ID');
      console.log(responseData == '004');
    });
  });

// Testing for '/'
const url3 = 'http://localhost:5500/'
// Make a GET request to the server
const req3 = http.get(url3, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });
  
      // When response is complete, log the content
    res.on('end', () => {
      console.log('Testing /');
      console.log(res.statusCode == 200);
    });
  });

  const url4 = 'http://localhost:5500/add'
  //
  const req4 = http.get(url4, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('testing /add');
        console.log(res.statusCode);
    });
  });

// Handle errors
req.on('error', (error) => {
  console.error(`Error fetching data from server: ${error.message}`);
});