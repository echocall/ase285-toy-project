const {URI} = require('./_config.js');
const util = require('./mongodbutil0.js')

// Call the function to remove all documents
async function removeAll(URI, DATABASE, COLLECTION) {
    let client;
    try {
        util.removeAllDocuments(URI, DATABASE, COLLECTION);
        util.removeAllDocuments(URI, DATABASE, COLLECTION);
    } catch (error) {
        console.error(error);
      } 
}

module.exports.removeAll = removeAll;