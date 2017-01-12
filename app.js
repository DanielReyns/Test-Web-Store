var express = require('express');
var path = require('path');
var portnumber = process.env.PORT || 8080;
var routes = require('./routes');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Routes

// home
app.get('/', routes.home);

// Card Single
app.get('/card/:card_id?', routes.cardsingle);

// Call Checkout with specific URL
app.get('/finalize/:url?', routes.checkout);

// notFound
app.get('*', routes.notfound);

app.listen(portnumber, function(){
	console.log("The application is running on port " + portnumber)
});
