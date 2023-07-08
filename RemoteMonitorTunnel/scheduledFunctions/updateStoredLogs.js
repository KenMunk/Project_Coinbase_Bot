const CronJob = require("node-cron");

const historySnapshot = require('../models/historySnapshot');

async function update(cryptoType, currencyType){
	
	//http://localhost:4000/log/getHistory/ETH/USD/12
	var historyPath = process.env.PeerService+"log/getHistory/"+cryptoType+"/"+currencyType+"/12";
	
	var history = (await fetch(historyPath)).json();
	
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
		snapshot: await history
	};
	
	if(existingHistory.length == 0){
		await new historySnapshot(updateSnapshot).save();
	}
	else{
		historySnapshot.updateOne(
			{
				crypto: cryptoType,
				currency: currencyType
			},
			{
				$set: updateSnapshot
			},
			{
				upsert: true
			}
		);
	}
	
	
	console.log(JSON.stringify(updateSnapshot));
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