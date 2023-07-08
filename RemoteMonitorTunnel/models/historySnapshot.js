const mongoose = require('mongoose');

const historySnapshot = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	snapshot: [{}]
},{
    strict: false
});

module.exports = mongoose.model('historySnapshot', historySnapshot);