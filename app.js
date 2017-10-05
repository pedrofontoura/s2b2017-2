// Creates the references for the external modules;
var express = require('express');
var app = express(); // Creates a reference variable to the express package;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var router = express.Router();
var appRoutes = require('./api/routes/index')(router);
var path = require('path');

// Creates the references for the application modules;
var init = require('./database/init');

// Middlewares;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use('/api', appRoutes);

// App config
const port = process.env.PORT || 8080; // Defines the port we're using to access the application;
const dbUrl = 'mongodb://localhost:27017/usersDb'; // Defines the url we're using to connect to the database;

//Database setup
init.dbInit(dbUrl);

// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname + '/public/index.html'))
// })

//Server port setup;
app.listen(port, function() {
  console.log('running the server on port ' + port);
});
