const converter = require('json-2-csv');
const express = require('express');

const TargetCrypto = require('../models/TargetCrypto');
const TrackerLog = require('../models/trackerLog');

const scheduledAnalysis = require('../scheduledFunctions/analyzeLastUpdate');

const router = express.Router();

const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

async function aggregateHistoryRows(startTime, targetID, lastUpdate, cryptoTarget, currencyTarget){
	
	await scheduledAnalysis.update(
		targetID,
		cryptoTarget,
		currencyTarget,
		lastUpdate,
		10
	);
	
	const priceHistory = await TrackerLog.find({
		timestamp: {$gte: startTime},
		TargetCrypto: targetID
	});
	
	
	return(priceHistory);
}

router.all('/getHistory/:crypto/:currency/:hoursBack', (req, res) => {
	
	//First we get the target crypto id
	
	const cryptoString = req.params.crypto+"";
	const currencyString = req.params.currency+"";
	const timeBack = req.params.hoursBack*60*60000;
	
	const timeOfNow = (Date.now().valueOf())
		
	TargetCrypto.find({
		crypto: cryptoString, 
		currency: currencyString
	}).then(function(result){
		if(result.length > 0){
			
			const targetID = result[0]._id;
			const lastUpdate = result[0].lastUpdated;
			
			aggregateHistoryRows(timeOfNow-timeBack, targetID, lastUpdate).then(resultHistory => {
				const jsonCSV = converter.json2csv(resultHistory).then(resultCSV =>
				{
					if(resultHistory.length>0){
						
						return res.status(200).json({
							message: "Data available for combo: " + cryptoString + "-"+currencyString+ " when searching with id " + targetID,
							csvData: resultCSV,
							data: resultHistory
						});
					}
					else{
						
						return res.status(200).json({message: "No data available for combo: " + cryptoString + "-"+currencyString+ " when searching with id " + targetID});
					}
				});
				
			});
			
		}
		else{
			
			return res.status(200).json({message: "No data available, save this combo into tracking"});
			
		}
	});
	
	//Then we get the price log for the 
	
});

module.exports = router;