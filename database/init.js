// Creates the references for the external modules;
var mongoose = require('mongoose');

module.exports = {
  // MongoDB Connection function;
  dbInit: function(dbUrl) {
    mongoose.connect(dbUrl,  { useMongoClient: true }, function(err){ // Database connection string;
      if (err) { // Database connection error handling;
        console.log('Could not connect to MongoDB: ' + err);
      } else {
        console.log('Successfully connected to MongoDB');
      }
    });
  }
}
