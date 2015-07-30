var restful = require('node-restful');
var mongoose = restful.mongoose;

//schema
var orderSchema = new mongoose.Schema({
	itemName: String,
    quantity: String,
    price: String,
    subTotal: String,
    tax: String,
    tip: String,
    total: String
});

//return model
module.exports = restful.model('Orders', orderSchema);