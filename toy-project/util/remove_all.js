const {URI} = require('./_config.js');
const util = require('./mongodbutil0.js')

// Check that we have enough inputs.
if(args.length < 2){
    // we don't have the appropriate inputs
    console.log("ERROR: This action requires the user to include more information. Format is: node upload_json.js 'databaseName' 'collectionName'. Please retry.");
  }else{
  
    // continue checking inputs  
    async() => {
        try {
            util.removeAllDocuments(URI, DATABASE, COLLECTION);
        } catch (error) {
            console.error(error);
        } 
    }
}