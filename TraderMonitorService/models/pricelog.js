const mongoose = require('mongoose');

const pricelog = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	},
	buy: {
		type: Number,
		required: true
	},
	sell: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('PriceLog', pricelog);