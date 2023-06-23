const CronJob = require("node-cron");
const PriceDensityLog = require('../models/PriceDensityLog');
const PriceLog = require('../models/pricelog');

exports.update = (target, cryptoType, currencyType, expectedCount, hoursBack) => {
	
}

exports.initScheduledJobs = (cryptoType, currencyType, updateInterval, expectedCount, hoursBack) => {
  const scheduledJobFunction = CronJob.schedule(""+updateInterval, () => {
	
	const timeOfNow = (Date.now().valueOf())
	
	const currentDataScore = {
		TargetCrypto: target,
		timestamp: timeOfNow,
		dataScore: 0
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		console.log("Getting data score for " + cryptoType);
		
		const history = PriceLog.find({timestamp: {$gte: timeOfNow-hoursBack*60*60000}, crypto: cryptoType, currency: currencyType}).then(function(doc){
			//console.log("History is "+doc90.length+ " entries");
			
			currentDataScore.dataScore = doc.length/expectedCount;
			console.log(currentDataScore);
			
			PriceDensityLog.findOne({
				crypto: cryptoType,
				currency: currencyType
			}).then(function(result){
				
				if(result != null){
					PriceDensityLog.updateOne({
						crypto: cryptoType,
						currency: currencyType
					},currentDataScore,{upsert: true});
				}
				else{
					const newDensity = new PriceDensityLog(currentDataScore).save();
				}
				
			}).catch(function(error){console.log("Something went wrong with the data density for " + cryptoType + ":\n"+error);});
			
			
		});
		
	} catch (error){
			console.log("Failed to get mongo data due to error:\n"+error)
	}
		
}, []);
	
  

  scheduledJobFunction.start();
}