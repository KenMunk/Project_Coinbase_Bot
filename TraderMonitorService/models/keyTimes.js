const mongoose = require('mongoose');

const keyTime = new mongoose.Schema({
	
	hour: {
		type: Number,
		required: true
	},
	moveScore: {
		type: Number,
		required: true
	}
	
});

module.exports = mongoose.model('KeyTime', keyTime);