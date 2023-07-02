const price = require("./Operations/checkPrices");
const sellSMA = require("./Operations/updateSellSMA");
const BSDiff = require("./Operations/updateBuySellDifferential");
const density = require("./Operations/checkDataDensity");

const CronJob = require("node-cron");
const TargetCrypto = require('../models/TargetCrypto');
const TrackerLog = require('../models/trackerLog');

async function update( targetID, crypto, currency, updateTime, interval){
	
	//[Pivot 6-27] -- First we initialize an empty json object that'll get passed around
	var trackerEntry = {};
	
	//sleep(4000);
	//await new Promise(r => setTimeout(r, 4000));
	
	var analysisSpan = 4;
	
	var analysisField = (analysisSpan*5)+"Min_"+(interval*5)+"MinBSDiff"+"_SMA";
	
	console.log("Computing " + analysisField + " for " + targetID + " for timestamp " + updateTime);
	
	trackerEntry = await sellSMA.merge(
		trackerEntry,
		targetID,
		crypto,
		currency,
		updateTime,
		(analysisSpan*5)*60000,
		analysisField,
		(interval*5)+"MinBSDiff"
	);
	
	try{
		await TrackerLog.updateOne(
			{
				TargetCrypto: targetID,
				timestamp: updateTime
			},
			{
				$set: trackerEntry
			},
			{
				upsert: true
			}
		);
		console.log("async update successful\n" + JSON.stringify(trackerEntry));
	}
	catch(error){
		console.log("async update failed\n" + error)
	}
	
}

exports.update = update;

exports.initScheduledJobs = (updateInterval, interval) => {
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
							doc[currencyCombo].lastUpdated,
							interval
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