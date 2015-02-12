var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema ({
	name: {type: String, required: true},
	age: {type: Number},
	email: {type: String, required: true, uniqueness:true},
	addresses: [{
		address: {type: String, requied: true, uppercase: true},
		city: {type: String, required: true},
		state: {type: String, required: true},
		zip: {type: String, required: true},
		kind: {type: String, enum: ['Billing', 'Shipping', 'Both'],
				default: 'Both'}
	}]
})

module.exports = mongoose.model('User', schema)