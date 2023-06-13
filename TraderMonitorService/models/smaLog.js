const mongoose = require('mongoose');

const smaLog = new mongoose.Schema({
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
	smaRange: {
		type: Number,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	smaType: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('SMA', smaLog);