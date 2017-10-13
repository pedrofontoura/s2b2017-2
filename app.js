// Cria as referências para os 'modules' externos da aplicação;
var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser')
var router = express.Router();
var appRoutes = require('./server/routes/index')(router);
var path = require('path');

// Cria as referências para os 'modules' internos da aplicação;
var init = require('./server/database/init');

// Middlewares;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use('/api', appRoutes);

// App config
const port = process.env.PORT || 8080; // Defines the port we're using to access the application;
const dbUrl = 'mongodb://localhost:27017/s2bDb'; // Defines the url we're using to connect to the database;

// Database setup
init.dbInit(dbUrl);

// Indica a view index.html como padrão para conexão via localhost;
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'))
  console.log('Accessed by the root path')
});

// Redireciona páginas
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'))
  console.log('Redirected based on unmatched request')
});

//Server port setup;
app.listen(port, function() {
  console.log('Running the server on port ' + port);
});
