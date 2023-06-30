const CronJob = require("node-cron");
const SMALog = require('../../models/smaLog');
const PriceLog = require('../../models/pricelog');
const TrackerLog = require('../../models/trackerLog');

async function merge(originalJSON, target, cryptoType, currencyType, timeOfNow, timeBack, smaType){
	
	var currentDataScore = Object.assign(originalJSON);
	
	const history = await TrackerLog.find({timestamp: {$gte: timeOfNow-timeBack}, TargetCrypto: target});
	
	//console.log("History  for " + cryptoType + "\n" + history);
	
	if(history.length > 0){
		
		currentDataScore[smaType] = 0;
		//*
		history.forEach((currentValue, index) => {
			currentDataScore[smaType] += currentValue.sell;
			
		});
		
		currentDataScore[smaType] /= history.length;
		
		//console.log(currentDataScore);
		
	}
	
	return(currentDataScore);
	
}

exports.merge = merge;

exports.update = (target, cryptoType, currencyType, timeOfNow, timeBack, smaType) => {
	
	const currentDataScore = {
		TargetCrypto: target,
		timestamp: timeOfNow,
		smaRange: timeBack,
		smaType: cryptoType + "-" + currencyType + "-" + smaType,
		value: 0,
		[cryptoType + "-" + currencyType + "-" + smaType]: 0
		
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
				currentDataScore[cryptoType + "-" + currencyType + "-" + smaType] += currentDataScore.value;
				
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
