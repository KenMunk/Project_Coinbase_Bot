const CronJob = require("node-cron");
const DiffLog = require('../../models/differentialLog');
const PriceLog = require('../../models/pricelog');
const TrackerLog = require('../../models/trackerLog');

async function merge(originalJSON, target, cryptoType, currencyType, timeOfNow, timeBack, diffType, diffField = ["sell","buy"]){
	
	var currentDataScore = Object.assign(originalJSON);
	
	const history = await TrackerLog.find({timestamp: {$gte: timeOfNow-timeBack}, TargetCrypto: target});
	
	if(history.length > 0){
		
		for(oldestIndex in history){
			if(diffField[1] in history[oldestIndex]){
				if(!isNaN(history[oldestIndex][diffField[1]]) && history[oldestIndex][diffField[1]] != null){
					currentDataScore[diffType] = (currentDataScore[diffField[0]] - history[oldestIndex][diffField[1]])/history[oldestIndex][diffField[1]];
					break;
				}
			}
		}
		
	}
	
	
	return(currentDataScore);
}

exports.merge = merge;
