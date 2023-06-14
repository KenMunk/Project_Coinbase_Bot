const mongoose = require('mongoose');

const differentialLog = new mongoose.Schema({
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
	differentialSize: {
		type: Number,
		required: true
	},
	value: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('DifferentialLog', differentialLog);