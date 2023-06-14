const mongoose = require('mongoose');

const opportunityScore = new mongoose.Schema({
	crypto: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	scoreType: {
		type: String,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	},
	timeRange: {
		type: Number,
		required: true
	},
	scoreValue: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('OpportunityScore', opportunityScore);