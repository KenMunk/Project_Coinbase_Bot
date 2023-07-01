const mongoose = require('mongoose');

const TargetCrypto = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	lastUpdated: {
		type: Number,
		requird: false
	}
},{
    strict: false
});

module.exports = mongoose.model('TargetCrypto', TargetCrypto);