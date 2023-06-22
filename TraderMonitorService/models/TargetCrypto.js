const mongoose = require('mongoose');

const TargetCrypto = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('TargetCrypto', TargetCrypto);