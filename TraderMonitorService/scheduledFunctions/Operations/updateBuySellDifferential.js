const CronJob = require("node-cron");
const DiffLog = require('../../models/differentialLog');
const PriceLog = require('../../models/pricelog');
const TrackerLog = require('../../models/trackerLog');

async function merge(originalJSON, target, cryptoType, currencyType, timeOfNow, timeBack, diffType, diffField = ["sell","buy"]){
	
	var currentDataScore = Object.assign(originalJSON);
	
	const history = await TrackerLog.find({timestamp: {$gte: timeOfNow-timeBack}, TargetCrypto: target});
	
	if(history.length > 0){
		
		currentDataScore[diffType] = (currentDataScore[diffField[0]] - history[0][diffField[1]])/history[history.length -1][diffField[1]];
		
	}
	
	
	return(currentDataScore);
}

exports.merge = merge;
