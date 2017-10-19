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
var passport = require('passport');

// Cria as referências para os 'modules' internos da aplicação;
var init = require('./server/database/init');

// Middlewares;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
require('./server/config/passport');
app.use(passport.initialize());
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

// General use functions ;
testDate = function(str) {
  var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if(t === null)
    return false;
  var d = +t[1], m = +t[2], y = +t[3];
  if(m >= 1 && m <= 12 && d >= 1 && d <= 31) {
    // Se nos meses com 31 dias a data tiver 31 dias ou menos OU // Se nos meses com 30 dias a data tiver 30 dias ou menos OU // Se no mes de fevereiro a data tiver 28 dias ou menos OU // Se nos anos bicestos a data tiver 29 dias ou menos.
    if (((m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12) && d<=31) || ((m==4 || m==6 || m==9 || m==11) && d<=30) || ((m==2 && d<=28)) || (m==2 && (y%4 == 0) && d<=29)) {
      return true;
  } else {
      return false;
    }
  }
  return false;
}
strToDate = function(dateString) {
  var dateParts = dateString.split("/");
  var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // month is 0-based
  dateObject = Date.parse(dateObject);
  return (dateObject)
}
dateToStrDate = function(date) {
    console.log(date)
    dformat = ((date.getDate()) + "/" + (date.getMonth()+1) + "/" + (date.getFullYear()))
    // dformat = [ (date.getMonth()+1).padLeft(), date.getDate().padLeft(), date.getFullYear()].join('/');
    console.log(dformat)
};
dateToStrTime = function(date) {
    console.log(date)
    dformat = ((date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()))
    console.log(dformat)
};
