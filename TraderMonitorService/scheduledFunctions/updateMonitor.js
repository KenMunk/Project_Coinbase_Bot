const price = require("./Operations/checkPrices");
const sellSMA = require("./Operations/updateSellSMA");
const BSDiff = require("./Operations/updateBuySellDifferential");

const CronJob = require("node-cron");
const TargetCrypto = require('../models/TargetCrypto');

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
						
						price.updatePrice(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow
						);
						
						sellSMA.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							5*5*60000,
							"25MinSellSMA"
						);
						
						sellSMA.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							10*5*60000,
							10*5+"MinSellSMA"
						);
						sellSMA.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							30*5*60000,
							30*5+"MinSellSMA"
						);
						
						sellSMA.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							60*5*60000,
							60*5+"MinSellSMA"
						);
						
						sellSMA.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							90*5*60000,
							90*5+"MinSellSMA"
						);
						
						BSDiff.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							5*5*60000,
							5*5+"MinBSDiff"
						);
						
						BSDiff.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							10*5*60000,
							10*5+"MinBSDiff"
						);
						
						BSDiff.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							30*5*60000,
							30*5+"MinBSDiff"
						);
						
						BSDiff.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							60*5*60000,
							60*5+"MinBSDiff"
						);
						
						BSDiff.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							90*5*60000,
							90*5+"MinBSDiff"
						);
						
						BSDiff.update(
							doc[currencyCombo]._id,
							doc[currencyCombo].crypto,
							doc[currencyCombo].currency,
							timeOfNow,
							6*60*60000,
							6*60+"MinBSDiff"
						);
						//console.log("Combo ID is: " + comboID);
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