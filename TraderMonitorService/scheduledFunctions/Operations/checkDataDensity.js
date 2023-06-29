const CronJob = require("node-cron");
const PriceDensityLog = require('../../models/PriceDensityLog');
const PriceLog = require('../../models/pricelog');

async function merge(originalJSON, target, cryptoType, currencyType, timeOfNow, expectedCount, hoursBack){
	
}

exports.merge = merge;

exports.update = (target, cryptoType, currencyType, timeOfNow, expectedCount, hoursBack) => {
	
	const currentDataScore = {
		TargetCrypto: target,
		timestamp: timeOfNow,
		dataScore: 0
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		console.log("Getting data score for " + cryptoType);
		
		const history = PriceLog.find({timestamp: {$gte: timeOfNow-hoursBack*60*60000}, TargetCrypto: target}).then(function(doc){
			//console.log("History is "+doc90.length+ " entries");
			
			currentDataScore.dataScore = doc.length/expectedCount;
			console.log(currentDataScore);
			
			const newDensity = new PriceDensityLog(currentDataScore).save();
			
		});
		
	} catch (error){
			console.log("Failed to get mongo data due to error:\n"+error)
	}
}
