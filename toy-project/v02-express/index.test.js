const http = require('http');
const request = require('supertest');
const express = require('express');

const main = require('./index');
const app = express();

// callback functions
app.listen(5500, function() {
 // console.log('listening on 5500')
});

// Specify the URL of the web server
const url = 'http://localhost:5500/';
const baseURL = 'http://localhost:5500';

// mocked up following this tutorial: https://dev.to/hayatscodes/api-testing-101-a-beginners-guide-to-testing-nodejs-apis-with-jest-and-supertest-2e4#what-is-api-testing
describe("Index.js Test", () => {
    let postID;

    afterAll((done) => {
        // do nothing, should be handled in index.js
        app.close(done);
      });
    
      it('should create a new post', async () => {
        const res = await request(app)
          .post('/add')
          .send({
            title: 'Test Post',
            date: 'Test Date',
          });
    
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Test Poste');
        expect(res.body.date).toEqual('Test Date');
        postID = res.body._id;
      });
    
      it('should get json file', async () => {
        const res = await request(app).get('/test');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
      });
    
      it('should get ID given from test2/ID', async () => {
        const res = await request(app).get(`/test2/${postID}`);
        expect(res.statusCode).toEqual(200);
        expect(res.params.id).toEqual(4);
      });
    
      it('should take to form', async () => {
        const res = await request(app)
          .get(`/`);
        expect(res.statusCode).toEqual(200);
      });
    });
