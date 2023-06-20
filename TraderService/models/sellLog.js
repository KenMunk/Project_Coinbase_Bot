const mongoose = require('mongoose');

const sellLog = new mongoose.Schema({
	
	buyRef: {
		type: mongoose.ObjectId,
		required: true
	}
	timestamp: {
		type: Number,
		required: true
	},
	soldAt: {
		type: Number,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	percentage: {
		type: Number,
		required: true
	},
	transactionScore: {
		type: Number,
		required: true
	}
	
});

module.exports = mongoose.model('sellLog', sellLog);