const mongoose = require('mongoose');

const buyLog = new mongoose.Schema({
	
	balanceType: {
		type: String,
		required: true
	},
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
	boughtAt: {
		type: Number,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	opportunityRef: {
		type: mongoose.ObjectId,
		required: true
	}
});

module.exports = mongoose.model('buyLog', buyLog);