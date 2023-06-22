const mongoose = require('mongoose');

const opportunityScore = new mongoose.Schema({
	TargetCrypto: {
		type: Schema.Types.ObjectId,
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