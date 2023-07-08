const mongoose = require('mongoose');

const {Schema}  = mongoose;

const historySnapshot = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	snapshot: []
},{
    strict: true
});

module.exports = mongoose.model('historySnapshot', historySnapshot);