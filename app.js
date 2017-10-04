// Creates the references for the external modules;
var mongoose = require('mongoose');
var express = require('express');
var app = express(); // Creates a reference variable to the express package;
var morgan = require('morgan');
var bodyParser = require('body-parser')
var path = require('path')

// Creates the references for the application modules;
var routes = require('./api/routes/index');
var init = require('./database/init');

// Middlewares;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api', routes);
app.use(express.static(__dirname + '/public'))

// App config
const port = process.env.PORT || 8080; // Defines the port we're using to access the application;
const dbUrl = 'mongodb://localhost:27017/usersDb'; // Defines the url we're using to connect to the database;

//Server port setup;
app.listen(port, function() {
  console.log('running the server on port ' + port);
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'))
});

//Database setup
init.dbInit(dbUrl);
