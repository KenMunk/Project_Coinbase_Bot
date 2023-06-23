const CronJob = require("node-cron");
const SMALog = require('../../models/smaLog');
const PriceLog = require('../../models/pricelog');

exports.update = (target, cryptoType, currencyType, timeOfNow, timeBack, smaType) => {
	
	const currentDataScore = {
		TargetCrypto: target,
		timestamp: timeOfNow,
		smaRange: timeBack,
		smaType: cryptoType + "-" + currencyType + "-" + smaType,
		value: 0
		
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		//*
		
		const history = PriceLog.find({timestamp: {$gte: timeOfNow-timeBack}, TargetCrypto: target}).then(function(doc){
			//console.log("History is "+doc.length+ " entries");
			
			
			if(doc.length > 0){
				
				//*
				doc.forEach((currentValue, index) => {
					currentDataScore.value += currentValue.sell;
				});
				
				currentDataScore.value /= doc.length;
				
				console.log(currentDataScore);
				
				const newSMA = new SMALog(currentDataScore);
				newSMA.save();
			}
			
			
		});
		//*/
		
	} catch (error){
			console.log("Failed to create " + smaType + " mongo data for " + smaRefData + " due to error:\n"+error)
	}
}
