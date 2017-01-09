var express = require('express');
var path = require('path');
var connectSdk = require('connect-sdk-nodejs');

var hostname = 'damp-brushlands-82490.herokuapp.com'
var portnumber = process.env.PORT || 8080;

var app = express();
app.set('view engine', 'ejs');

var routes = require('./routes');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

connectSdk.init({
  host: hostname,
  scheme: 'https',
  port: portnumber,
  enableLogging: true, // defaults to false
  //logger: logger, // if undefined console.log will be used
  apiKeyId: 'f76d4db20b15c030',
  secretApiKey: 'B5rSIQn/rdpwYy8QmVTZ3d78rFq0Hecbnrc/DkwaUXE='
});

//Routes

// home
app.get('/', routes.home);

// Card Single
app.get('/card/:card_id?', routes.cardsingle);

// notFound
app.get('*', routes.notfound);

app.listen(portnumber, function(){
	console.log("The application is running on port " + portnumber)
});
