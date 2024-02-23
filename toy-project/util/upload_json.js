const {URI} = require('./_config.js');
const util = require('./mongodbutil0.js')

const { argv } = require('node:process');

// pars argv into useable form, slice off first two values as unneeded.
var args =  process.argv.slice(2);
DATABASE = args[0];
COLLECTION = args[1];
FILEPATH = args[2];

if(args.length < 3){
  // we don't have the appropriate inputs
  console.log("ERROR: This action requires the user to include more information. Format is: node upload_json.js 'databaseName' 'collectionName' 'filepath'. Please retry.");
}else{

  // continue checking inputs  
  async() => {
    try {
      let res = util.readJSON(FILEPATH);
      console.log(res);
      res = await util.uploadJSON(URI, DATABASE, COLLECTION, FILEPATH);
      console.log(res);
    } catch (error) {
        console.error(error);
      } 
  }
}
