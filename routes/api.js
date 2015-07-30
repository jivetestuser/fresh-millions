var express = require('express');
var router = express.Router();

//models
var Orders = require('../models/order');

//routes
Orders.methods(['get','post']);
Orders.register(router, '/orders');

//send mail

Orders.before('get', send_mail);

function send_mail(req, res, next) {
	console.log(req.body);
    // console.log(req.body.quantity);
    // console.log(req.body.price);
    // console.log(req.body.subTotal);
    // console.log(req.body.tax);
    // console.log(req.body.tip);
    // console.log(req.body.total);
  next();
}


//return router
module.exports = router;