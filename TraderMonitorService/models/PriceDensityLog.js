const mongoose = require('mongoose');

const priceDensityLog = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	dataScore: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('PriceDensityLog', priceDensityLog);