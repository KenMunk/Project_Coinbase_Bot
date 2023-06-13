const CronJob = require("node-cron");
const PriceDensityLog = require('../models/PriceDensityLog');
const PriceLog = require('../models/pricelog');

exports.initScheduledJobs = (cryptoType, currencyType, updateInterval, timeBack, smaType) => {
  const scheduledJobFunction = CronJob.schedule(""+updateInterval, () => {
	
	const timeOfNow = (Date.now().valueOf())
	
	const currentDataScore = {
		crypto: cryptoType,
		currency: currencyType,
		dataScore: 0
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		//*
		
		const history = PriceLog.find({timestamp: {$gte: timeOfNow-timeBack}, crypto: cryptoType,
		currency: currencyType}).then(function(doc90){
			//console.log("History is "+doc90.length+ " entries");
			
			if(doc90.length > 0){
				
				currentPriceSnap.datasufficient = doc90.length;
				
				//*
				doc90.forEach((currentValue, index) => {
					currentPriceSnap.sma90 +=currentValue.sell;
				});
				
				currentPriceSnap.sma90 /= doc90.length;
				
			}
			else{
				currentPriceSnap.sma90 = currentPriceSnap.sell;
				currentPriceSnap.sma30 = currentPriceSnap.sell;
				currentPriceSnap.sma10 = currentPriceSnap.sell;
				currentPriceSnap.sma5 = currentPriceSnap.sell;
				currentPriceSnap.sma60 = currentPriceSnap.sell;
				console.log(currentPriceSnap);
				const newEntry = new PriceLog(currentPriceSnap);
				newEntry.save();
			}
			
			
		});
		//*/
		
	} catch (error){
			console.log("Failed to get mongo data due to error:\n"+error)
	}
		
}, []);
	
  

  scheduledJobFunction.start();
}