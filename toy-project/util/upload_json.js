const {URI} = require('./_config.js');
const util = require('./mongodbutil0.js')

const { argv } = require('node:process');

console.log(argv);
// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// Call function to upload a JSON file.

// assume argv[2] and on are Database, Collection, and filePath
async function uploadJSON(URI, DATABASE, COLLECTION, FILE) {
  try {
    let res = util.readJSON(FILE);
    console.log(res);
    res = await util.uploadJSON(URI, DATABASE, COLLECTION, FILE);
    console.log(res);
  } catch (error) {
      console.error(error);
    } 
}

module.exports.uploadJSON = uploadJSON;