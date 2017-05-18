console.log('mongo connection, mongoose setup');
// require mongoose
var mongoose = require('mongoose');
// require the fs module for loading model files
var fs = require('fs');
// require path for getting the models path
var path = require('path');
// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');

var reg           = new RegExp( ".js$", "i" )


var dbURI         = 'mongodb://localhost/ypc_users';

mongoose.Promise = global.Promise;
mongoose.createConnection( dbURI );
/*
*  CONNECTION EVENTS
*  When successfully connected
*/
mongoose.connection.on( 'connected', function () {
 console.log( `Mongoose default connection open to ${ dbURI }` );
});
/*
*  If the connection throws an error
*/
mongoose.connection.on( 'error', function ( err ) {
 console.error( `Mongoose default connection error: ${ err }` );
});
/*
*  When the connection is disconnected
*/
mongoose.connection.on( 'disconnected', function () {
 console.log( 'Mongoose default connection disconnected' );
});
/*
*  If the Node process ends, close the Mongoose connection
*/
process.on( 'SIGINT', function() {
 mongoose.connection.close( function () {
   console.log( 'Mongoose default connection disconnected through app termination' );
   process.exit( 0 );
 });
});


// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
 if(file.indexOf('.js') >= 0) {
   // require the file (this runs the model file which registers the schema)
   require(models_path + '/' + file);
 }
});
