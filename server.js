var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var sendgrid  = require('sendgrid')('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');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://localhost/orders");

var Resource = app.resource = restful.model('order', mongoose.Schema({
	itemName: String,
    quantity: String,
    price: String,
    subTotal: String,
    tax: String,
    tip: String,
    total: String
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.after('get', function(req, res, next) {
	console.log('doing something after GET')
  next(); // Don't forget to call next!
});

Resource.after('post', function(req, res, next){
	console.log('sending email...');
	next();
});

app.post('/orders', function (req, res, next) {
	var emailString = ('customer name:' + req.body.customerName + '\n');
	emailString += ('customer phone:' + req.body.customerPhone + '\n');
	emailString += ('restaurant address:' + req.body.restaurantAddress + '\n');

	var now = new Date();
	var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

	//Pad given value to the left with "0"
	function AddZero(num) {
    	return (num >= 0 && num < 10) ? "0" + num : num + "";
	}
	
	emailString += ('order date:' + now + '\n');
	emailString += ('item:' + req.body.itemName + '\n');
	emailString += ('quantity:' + req.body.quantity + '\n');
	emailString += ('price:' + req.body.price + '\n');
	emailString += ('subTotal:' + req.body.subTotal + '\n');
	emailString += ('tax:' + req.body.tax + '\n');
	emailString += ('tip:' + req.body.tip + '\n');
	emailString += ('total:' + req.body.total);

	console.log(emailString);

    var payload   = {
  		to      : 'sr9278@hotmail.com',
  		from    : 'pgovindaraj99@gmail.com',
  		cc   	: 'pgovindaraj99@gmail.com',
  		subject : 'Order-in',
  		text    : emailString
	}
	sendgrid.send(payload, function(err, json) {
  		if (err) { console.error(err); }
  		console.log(json);
	});
    next();
});

Resource.register(app, '/orders');

app.listen(5000);
console.log('API is running on port 5000');