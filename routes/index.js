var connectSdk = require('connect-sdk-nodejs');
var hostname = 'api-sandbox.globalcollect.com';
var portnumber = process.env.PORT || 8080;
var subdomain = 'https://payment.';

connectSdk.init({
  host: hostname,
  scheme: 'https',
  enableLogging: true, // defaults to false
  apiKeyId: 'f76d4db20b15c030',
  secretApiKey: 'B5rSIQn/rdpwYy8QmVTZ3d78rFq0Hecbnrc/DkwaUXE='
});


var cardsJSON = require('../cards.json');

// home
exports.home = function(req, res) {

	var cards = cardsJSON.cards;

	res.render('home', {
		title : "Magic Shop",
		cards : cards
	});
};

// Card Single
exports.cardsingle = function(req, res) {
	var card_id = req.params.card_id;
	var cards = cardsJSON.cards;
	
	var body = {
  			"hostedCheckoutSpecificInput": {"locale": "en_GB","variant": "101"}, 
			"order": {"amountOfMoney": {"currencyCode": "EUR", "amount": cards[card_id -1].Price * 100}, 
    		        "customer": {"billingAddress": {"countryCode": "BE"}
    		}
  		}
	};
	connectSdk.hostedcheckouts.create("2508", body, null, function (error, sdkResponse) {
		var response = JSON.stringify(sdkResponse.body);
		var bodyOBJ = JSON.parse(response);
		var rawredirectURL = JSON.stringify(bodyOBJ.partialRedirectUrl);
		var redirectURL = rawredirectURL.substr(1,rawredirectURL.length-2);
		res.redirect(subdomain + redirectURL);
	});
	
};

// finalize transaction
exports.checkout = function(req, res) {
	var redirectURL = req.params.url;
	res.redirect(subdomain + redirectURL);
};

// notFound
exports.notfound = function(req, res) {
	res.send("This is unknown magic");
};
