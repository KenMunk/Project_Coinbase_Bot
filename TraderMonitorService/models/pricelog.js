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
	},
	sma5: {
		type: Number,
		required: false
	},
	sma10: {
		type: Number,
		required: false
	},
	sma30: {
		type: Number,
		required: false
	},
	sma60: {
		type: Number,
		required: false
	},
	sma90: {
		type: Number,
		required: false
	},
	opportunity: {
		type: Number,
		required: false
	},
	
	datasufficient: {
		type: Number,
		required: false
	}
});

module.exports = mongoose.model('PriceLog', pricelog);