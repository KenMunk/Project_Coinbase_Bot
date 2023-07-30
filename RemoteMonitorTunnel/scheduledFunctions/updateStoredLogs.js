const CronJob = require("node-cron");

const historySnapshot = require('../models/historySnapshot');

async function update(cryptoType, currencyType){
	
	const timeOfNow = (Date.now().valueOf());
	
	//http://localhost:4000/log/getHistory/ETH/USD/12
	var historyPath = process.env.PeerService+"log/getHistory/"+cryptoType+"/"+currencyType+"/12/2";
	
	try{
		
		var history = (await fetch(historyPath));
		
		if(history.status != 200){
			history = {};
		}
		else{
			history = await history.json();
		}
		
		console.log("History length: " + history.data.length)
		
		/*
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
		//*/
		
		var existingHistory = await historySnapshot.find({
			crypto: cryptoType,
			currency: currencyType
		});
		
		var updateSnapshot = {
			crypto: cryptoType,
			currency: currencyType,
			snapshot: history,
			lastEntry: history.data.pop(),
			updateTime: timeOfNow
		};
		
		if(existingHistory.length == 0){
			await new historySnapshot(updateSnapshot).save();
		}
		else{
			await historySnapshot.updateOne(
				{
					crypto: cryptoType,
					currency: currencyType
				},
				{
					$set: updateSnapshot
				}
			);
		}
		
		var updatedHistory = await historySnapshot.find({
			crypto: cryptoType,
			currency: currencyType
		});
		
		//console.log(JSON.stringify(updatedHistory));
	} catch (error) {
		
		console.log("An error was encountered when getting update for " + cryptoType + "-" + currencyType+"\n"+error);
		
	}
	
}

exports.initScheduledJobs = (cryptoType, currencyType) => {
	const scheduledJobFunction = CronJob.schedule("*/30 * * * * *", () => {
		try{
			var result = update(
				cryptoType,
				currencyType
			);
		}
		catch(error){
			console.log(error);
		}
		
		
	});
	
	scheduledJobFunction.start();
}