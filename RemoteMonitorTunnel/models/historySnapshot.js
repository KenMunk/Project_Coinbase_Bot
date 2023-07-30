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
	updateTime: {
		type: Number,
		required: false
	},
	lastEntry: {
		type: Schema.Types.Mixed,
		required: false
	},
	snapshot: {
		type: Schema.Types.Mixed,
		required: true
	}
},{
    strict: true
});

module.exports = mongoose.model('historySnapshot', historySnapshot);