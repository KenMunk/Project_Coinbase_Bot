const converter = require('json-2-csv');
const express = require('express');

const TargetCrypto = require('../models/TargetCrypto');
const SMALog = require('../models/smaLog');
const DiffLog = require('../models/differentialLog');
const PriceLog = require('../models/pricelog');
const density = require("../models/PriceDensityLog");

const router = express.Router();

const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

async function aggregateHistoryRows(startTime, targetID){
	const priceHistory = await PriceLog.find({
		timestamp: {$gte: startTime},
		TargetCrypto: targetID
	});
	
	var resultArray = [];
	
	console.log("Price history found:\n" + priceHistory);
	
	if(priceHistory.length>0){
		for(priceEntry in priceHistory){
			//First Get the timestamp
			
			const priceTime = priceHistory[priceEntry].timestamp;
			
			var targetEntry = {
				timestamp: priceTime,
				buy: priceHistory[priceEntry].buy,
				sell: priceHistory[priceEntry].sell,
			};
			
			//Do all of the individual tasks
			var smaEntries = await SMALog.find({
				timestamp: priceTime,
				TargetCrypto: targetID
			});
			
			if(smaEntries.length > 0){
				
				for(smaEntry in smaEntries){
					
					targetEntry = Object.assign(targetEntry, {[(smaEntries[smaEntry].smaType)]: smaEntries[smaEntry].value});
					
				}
				
			}
			
			var diffEntries = await DiffLog.find({
				timestamp: priceTime,
				TargetCrypto: targetID
			});
			
			if(diffEntries.length > 0){
				for(diffEntry in diffEntries){
					targetEntry = Object.assign(targetEntry, {[(diffEntries[diffEntry].diffType)]: diffEntries[diffEntry].value});
				}
			}
			
			var densityEntries = await density.find({
				timestamp: priceTime,
				TargetCrypto: targetID
			});
			
			if(densityEntries.length > 0){
				for(densityEntry in densityEntries){
					targetEntry = Object.assign(targetEntry, {densityScore: densityEntries[densityEntry].dataScore})
				}
			}
			
			resultArray.push(targetEntry)
			
			console.log("Updating entry with sma entries:\n"+JSON.stringify(resultArray[resultArray.length -1]))
			
		}
		
		
		//console.log("Price history with analytics:\n" + resultArray);
		
	}
	else{
		console.log("Error no history found")
	}
	
	return(resultArray);
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
			
			aggregateHistoryRows(timeOfNow-timeBack, targetID).then(resultHistory => {
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