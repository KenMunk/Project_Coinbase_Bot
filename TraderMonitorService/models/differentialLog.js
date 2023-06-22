const mongoose = require('mongoose');

const differentialLog = new mongoose.Schema({
	TargetCrypto: {
		type: Schema.Types.ObjectId,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	},
	differentialSize: {
		type: Number,
		required: true
	},
	diffType: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('DifferentialLog', differentialLog);