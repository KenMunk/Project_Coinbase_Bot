const mongoose = require('mongoose');

const pricelog = new mongoose.Schema({
	TargetCrypto: {
		type: Schema.Types.ObjectId,
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