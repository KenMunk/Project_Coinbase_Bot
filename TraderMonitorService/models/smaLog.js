const mongoose = require('mongoose');

const smaLog = new mongoose.Schema({
	TargetCrypto: {
		type: Schema.Types.ObjectId,
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