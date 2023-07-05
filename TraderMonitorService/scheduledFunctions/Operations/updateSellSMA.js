const CronJob = require("node-cron");
const SMALog = require('../../models/smaLog');
const PriceLog = require('../../models/pricelog');
const TrackerLog = require('../../models/trackerLog');

async function merge(originalJSON, target, cryptoType, currencyType, timeOfNow, timeBack, smaType, smaField="sell"){
	
	var currentDataScore = Object.assign(originalJSON);
	
	var history = await TrackerLog.find({timestamp: {$gte: timeOfNow-timeBack}, TargetCrypto: target});
	
	//console.log("History  for " + cryptoType + "\n" + history);
	
	var totalLength = history.length;
	
	if(history.length > 0){
		
		currentDataScore[smaType] = 0;
		//*
		history.forEach((currentValue, index) => {
			if(smaField in currentValue){
				if(!isNaN(currentValue[smaField]) && currentValue[smaField] != null){
					currentDataScore[smaType] += currentValue[smaField];
				}
				else{
					totalLength--;
				}
			}
			else{
				totalLength--;
			}
			
		});
		
		//console.log(currentDataScore);
		
		currentDataScore[smaType] /= history.length;
		
		//console.log(currentDataScore);
		
	}
	
	return(currentDataScore);
	
}

exports.merge = merge;
