const price = require("./Operations/checkPrices");
const sellSMA = require("./Operations/updateSellSMA");
const BSDiff = require("./Operations/updateBuySellDifferential");
const density = require("./Operations/checkDataDensity");

const CronJob = require("node-cron");
const TargetCrypto = require('../models/TargetCrypto');
const TrackerLog = require('../models/trackerLog');

async function update( targetID, targetCrypto, targetCurrency, timestamp){
	
	//[Pivot 6-27] -- First we initialize an empty json object that'll get passed around
	var trackerEntry = {};
	
	trackerEntry = await price.update(
		trackerEntry,
		targetID,
		targetCrypto,
		targetCurrency,
		timestamp
	);
	
	
	if(trackerEntry != {}){
		
		trackerEntry = await density.merge(
			trackerEntry,
			targetID,
			targetCrypto,
			targetCurrency,
			timestamp,
			120*6,
			7
		);
		
		var intervals = [1,5,10,30,60,90];
		
		
		for(index in intervals){
			trackerEntry = await sellSMA.merge(
				trackerEntry,
				targetID,
				targetCrypto,
				targetCurrency,
				timestamp,
				(intervals[index]*5)*60000,
				(intervals[index]*5)+"MinSellSMA"
			);
		}
		
		trackerEntry = await BSDiff.merge(
			trackerEntry,
			targetID,
			targetCrypto,
			targetCurrency,
			timestamp,
			(1)*60000,
			(1)+"MinBSDiff",
			["sell","buy"]
		);
		
		trackerEntry = await BSDiff.merge(
			trackerEntry,
			targetID,
			targetCrypto,
			targetCurrency,
			timestamp,
			(1)*60000,
			(1)+"MinSDiff",
			["sell","sell"]
		);
		
		try{
			const newEntry = await new TrackerLog(await trackerEntry).save();
			await TargetCrypto.updateOne(
				{
					crypto: targetCrypto, 
					currency: targetCurrency
				}, 
				{
					$set: {
						lastUpdated: timestamp
					}
				},
				{
					upsert: true
				}
			);
			console.log("async update successful for " + targetCrypto + " \n" + JSON.stringify(trackerEntry));
			
		}
		catch(error){
			console.log("async update successful for " + targetCrypto + " \n" + JSON.stringify(trackerEntry));
		}
	}
	
	
	if(trackerEntry != {}){
	}
	else{
		//Announce error and do nothing
	}
	//Then the price update will return price update data which will get merged into the 
}



exports.initScheduledJobs = (updateInterval) => {
	const scheduledJobFunction = CronJob.schedule(""+updateInterval,() => {
		
		const timeOfNow = (Date.now().valueOf())
		
		try{
			
			
			TargetCrypto.find().then(function(doc){
				
				if(doc.length == 0){
					
					
					console.error("Scheduled job UpdateMonitor failed at " + timeOfNow.toString() + " because nothing is being tracked");
					
				}
				else{
					
					//console.log(doc);
					
					for( currencyCombo in doc){
						
						console.log("Updating monitor data for:\n" + JSON.stringify(doc[currencyCombo]) + " for " + timeOfNow.toString());
						
						let comboID = doc[currencyCombo]._id
						
						update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow
						);
						
					}
					
				}
				
			}).catch((error) => function(error){
				
				
				console.error("Scheduled job UpdateMonitor failed at " + timeOfNow.toString() + " when getting tracked currencies for error: \n"+error);
				
			});
			
		}catch(error){
			
			console.error("Scheduled job UpdateMonitor failed at " + timeOfNow.toString() + " for error: \n"+error);
			
		}
		
	}, []);
	
	scheduledJobFunction.start();
}