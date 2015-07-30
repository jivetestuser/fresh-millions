var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// mongo db
mongoose.connect('mongodb://localhost/orders_test');

//express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//routes
app.use('/api', require('./routes/api'));


//start server
app.listen(3000);
console.log('API is running on port 3000');
