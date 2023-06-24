const CronJob = require("node-cron");
const DiffLog = require('../../models/differentialLog');
const PriceLog = require('../../models/pricelog');

exports.update = (target, cryptoType, currencyType, timeOfNow, timeBack, diffType) => {
	
	const currentDataScore = {
		TargetCrypto: target,
		timestamp: timeOfNow,
		differentialSize: timeBack,
		diffType: cryptoType + "-" + currencyType + "-" + diffType,
		value: 0
		
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		//*
		
		const history = PriceLog.find({timestamp: {$gte: timeOfNow-timeBack}, TargetCrypto: target}).then(function(doc){
			//console.log("History is "+doc.length+ " entries");
			//console.log("History is: \n" + doc);
			//console.log("First in history is:\n" +doc[0]);
			//console.log("Last in history is:\n" +doc[doc.length -1]);
			
			if(doc.length > 0){
				
				//*
				currentDataScore.value = (doc[0].sell - doc[doc.length -1].buy)/doc[doc.length -1].buy;
				
				console.log(currentDataScore);
				
				const newDiff = new DiffLog(currentDataScore);
				newDiff.save();
			}
			
			
		});
		//*/
		
	} catch (error){
			console.log("Failed to create " + diffType + " mongo data for " + smaRefData + " due to error:\n"+error)
	}
}
