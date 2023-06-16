const CronJob = require("node-cron");
const SMALog = require('../models/smaLog');
const DiffLog = require('../models/differentialLog');
const PriceLog = require('../models/pricelog');

exports.initScheduledJobs = (cryptoType, currencyType, updateInterval, timeBack, smaType, diffType) => {	
  const scheduledJobFunction = CronJob.schedule(""+updateInterval, () => {
	
	const timeOfNow = (Date.now().valueOf())
	
	const currentDataScore = {
		crypto: cryptoType,
		currency: currencyType,
		timestamp: timeOfNow,
		smaRange: timeBack,
		smaType: smaType,
		value: 0
		
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		//*
		
		const history = DiffLog.find({timestamp: {$gte: timeOfNow-timeBack}, crypto: cryptoType,
		currency: currencyType, smaType: diffType}).then(function(doc){
			//console.log("History is "+doc.length+ " entries");
			
			
			if(doc.length > 0){
				
				//*
				doc.forEach((currentValue, index) => {
					currentDataScore.value += currentValue.value;
				});
				
				currentDataScore.value /= doc.length;
				
				console.log(currentDataScore);
				
				const newDiff = new DiffLog(currentDataScore);
				newDiff.save();
			}
			
			
		});
		//*/
		
	} catch (error){
			console.log("Failed to create " + smaType + " mongo data for " + smaRefData + " due to error:\n"+error)
	}
		
}, []);
	
  

  scheduledJobFunction.start();
}