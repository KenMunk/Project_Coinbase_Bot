const mongoose = require('mongoose');

const assetSnap = new mongoose.Schema({
	
	currency: {
		type: String,
		required: true
	},
	balance: {
		type: Number,
		required: true
	},
	balanceType: {
		type: String,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	}
	
});

module.exports = mongoose.model('AssetSnap', assetSnap);