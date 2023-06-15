const CronJob = require("node-cron");
const SMALog = require('../models/smaLog');

exports.initScheduledJobs = (cryptoType, currencyType, updateInterval, timeBack, smaType, smaRefData, smaRefField) => {	
  const scheduledJobFunction = CronJob.schedule(""+updateInterval, () => {
	
	
	const DataLog = require('../models/'+smaRefData);
	
	const timeOfNow = (Date.now().valueOf())
	
	const currentDataScore = {
		crypto: cryptoType,
		currency: currencyType,
		timestamp: timeOfNow,
		smaRange: timeBack,
		smaType: smaType
		
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		//*
		
		const history = DataLog.find({timestamp: {$gte: timeOfNow-timeBack}, crypto: cryptoType,
		currency: currencyType}).then(function(doc){
			//console.log("History is "+doc.length+ " entries");
			
			const dataDensity = new PriceDensityLog
			
			if(doc.length > 0){
				
				//*
				doc.forEach((currentValue, index) => {
					currentDataScore.value += currentValue;
				});
				
				currentDataScore.value /= doc.length;
				
				const newSMA = new SMALog(currentDataScore);
			}
			
			
		});
		//*/
		
	} catch (error){
			console.log("Failed to create " + smaType + " mongo data for " + smaRefData + " due to error:\n"+error)
	}
		
}, []);
	
  

  scheduledJobFunction.start();
}