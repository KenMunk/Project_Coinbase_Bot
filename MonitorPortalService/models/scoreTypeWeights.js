const mongoose = require('mongoose');

const scoreTypeWeight = new mongoose.Schema({
	
	scoreType: {
		type: String,
		required: true
	},
	scoreMin: {
		type: Number,
		required: true
	},
	scoreMax: {
		type: Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
	}
	
});

module.exports = mongoose.model("ScoreTypeWeight", scoreTypeWeight)