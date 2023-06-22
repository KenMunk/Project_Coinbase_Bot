const mongoose = require('mongoose');

const priceDensityLog = new mongoose.Schema({
	TargetCrypto: {
		type: Schema.Types.ObjectId,
		required: true
	},
	dataScore: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('PriceDensityLog', priceDensityLog);